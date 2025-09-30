// Health check endpoint to monitor the system status
// Access via: https://stonscenter.netlify.app/.netlify/functions/health-check

const admin = require('firebase-admin');

// Initialize Firebase Admin (only once)
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
  } catch (error) {
    console.error('Firebase Admin initialization failed:', error);
  }
}

exports.handler = async (event, context) => {
  const startTime = Date.now();
  const checks = {
    timestamp: new Date().toISOString(),
    environment: 'production',
    checks: {}
  };

  try {
    // Check 1: Environment Variables
    checks.checks.environment_variables = {
      status: 'checking',
      details: {}
    };

    const requiredEnvVars = [
      'FIREBASE_SERVICE_ACCOUNT',
      'FIREBASE_DATABASE_URL',
      'BALL_DONT_LIE_KEY',
      'BING_SEARCH_V7_ENDPOINT',
      'BING_SEARCH_V7_API_KEY'
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length === 0) {
      checks.checks.environment_variables.status = 'healthy';
      checks.checks.environment_variables.details = { message: 'All required environment variables are present' };
    } else {
      checks.checks.environment_variables.status = 'unhealthy';
      checks.checks.environment_variables.details = { 
        missing_variables: missingVars,
        message: `Missing ${missingVars.length} required environment variables`
      };
    }

    // Check 2: Firebase Connection
    checks.checks.firebase_connection = {
      status: 'checking'
    };

    try {
      const db = admin.database();
      const testRef = db.ref('.info/connected');
      const snapshot = await testRef.once('value');
      
      checks.checks.firebase_connection.status = 'healthy';
      checks.checks.firebase_connection.details = {
        connected: snapshot.val(),
        database_url: process.env.FIREBASE_DATABASE_URL
      };
    } catch (error) {
      checks.checks.firebase_connection.status = 'unhealthy';
      checks.checks.firebase_connection.details = {
        error: error.message
      };
    }

    // Check 3: Last Update Status
    checks.checks.last_update = {
      status: 'checking'
    };

    try {
      const db = admin.database();
      const lastUpdateRef = db.ref('system/last_update');
      const snapshot = await lastUpdateRef.once('value');
      const lastUpdate = snapshot.val();

      if (lastUpdate && lastUpdate.timestamp) {
        const lastUpdateTime = new Date(lastUpdate.timestamp);
        const now = new Date();
        const hoursSinceUpdate = (now - lastUpdateTime) / (1000 * 60 * 60);

        if (hoursSinceUpdate < 2) {
          checks.checks.last_update.status = 'healthy';
        } else if (hoursSinceUpdate < 6) {
          checks.checks.last_update.status = 'warning';
        } else {
          checks.checks.last_update.status = 'unhealthy';
        }

        checks.checks.last_update.details = {
          last_update: lastUpdate.timestamp,
          hours_since_update: Math.round(hoursSinceUpdate * 100) / 100,
          status: lastUpdate.status
        };
      } else {
        checks.checks.last_update.status = 'unknown';
        checks.checks.last_update.details = {
          message: 'No update history found'
        };
      }
    } catch (error) {
      checks.checks.last_update.status = 'error';
      checks.checks.last_update.details = {
        error: error.message
      };
    }

    // Check 4: Data Freshness
    checks.checks.data_freshness = {
      status: 'checking'
    };

    try {
      const db = admin.database();
      const rosterRef = db.ref('roster/players');
      const newsRef = db.ref('news/articles');
      
      const [rosterSnapshot, newsSnapshot] = await Promise.all([
        rosterRef.once('value'),
        newsRef.once('value')
      ]);

      const rosterData = rosterSnapshot.val();
      const newsData = newsSnapshot.val();

      checks.checks.data_freshness.details = {
        roster_players: rosterData ? Object.keys(rosterData).length : 0,
        news_articles: newsData ? (newsData.webPages ? newsData.webPages.value.length : 0) : 0,
        roster_exists: !!rosterData,
        news_exists: !!newsData
      };

      if (rosterData && newsData) {
        checks.checks.data_freshness.status = 'healthy';
      } else if (rosterData || newsData) {
        checks.checks.data_freshness.status = 'warning';
        checks.checks.data_freshness.details.message = 'Some data missing';
      } else {
        checks.checks.data_freshness.status = 'unhealthy';
        checks.checks.data_freshness.details.message = 'No data found';
      }
    } catch (error) {
      checks.checks.data_freshness.status = 'error';
      checks.checks.data_freshness.details = {
        error: error.message
      };
    }

    // Overall Health Status
    const statuses = Object.values(checks.checks).map(check => check.status);
    const hasUnhealthy = statuses.includes('unhealthy');
    const hasError = statuses.includes('error');
    const hasWarning = statuses.includes('warning');

    let overallStatus = 'healthy';
    if (hasUnhealthy || hasError) {
      overallStatus = 'unhealthy';
    } else if (hasWarning) {
      overallStatus = 'warning';
    }

    const responseTime = Date.now() - startTime;

    return {
      statusCode: overallStatus === 'unhealthy' ? 503 : 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      },
      body: JSON.stringify({
        overall_status: overallStatus,
        response_time_ms: responseTime,
        ...checks
      }, null, 2)
    };

  } catch (error) {
    console.error('Health check error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        overall_status: 'error',
        timestamp: new Date().toISOString(),
        error: error.message,
        response_time_ms: Date.now() - startTime
      }, null, 2)
    };
  }
};