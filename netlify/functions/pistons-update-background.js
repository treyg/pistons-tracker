const axios = require('axios')
const { JSDOM } = require('jsdom')
const admin = require('firebase-admin')
const Firecrawl = require('@mendable/firecrawl-js').default

// Initialize Firecrawl client
const firecrawl = new Firecrawl({
  apiKey: process.env.FIRECRAWL_API_KEY
})

// Initialize Firebase Admin (only once)
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    })
  } catch (error) {
    console.error('Firebase Admin initialization failed:', error)
  }
}

const NBA_ROSTER_URL = 'https://www.nba.com/pistons/roster';

async function getDetailedStats() {
  try {
    console.log('Fetching detailed stats from ESPN...');
    const url = 'https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/statistics/byathlete?region=us&lang=en&contentorigin=espn&isqualified=true&page=1&limit=400&sort=offensive.avgPoints:desc&season=2025&seasontype=2';
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });
    
    const athletes = response.data?.athletes || [];
    
    // Create a map of player name to stats
    const statsMap = {};
    athletes.forEach(athlete => {
      const name = athlete.athlete?.displayName;
      const categories = athlete.categories || [];
      
      // Find offensive and defensive categories
      const offensive = categories.find(cat => cat.name === 'offensive');
      const defensive = categories.find(cat => cat.name === 'defensive');
      
      if (name && offensive) {
        const offStats = offensive.totals || [];
        const defStats = defensive?.totals || [];
        
        statsMap[name] = {
          pts: parseFloat(offStats[0]) || 0,     // Points per game
          reb: parseFloat(offStats[10]) || 0,    // Rebounds per game
          ast: parseFloat(offStats[11]) || 0,    // Assists per game
          stl: parseFloat(defStats[0]) || 0,     // Steals per game
          blk: parseFloat(defStats[1]) || 0,     // Blocks per game
          fg_pct: parseFloat(offStats[3]) / 100 || 0,   // FG% (convert to decimal)
          fg3_pct: parseFloat(offStats[6]) / 100 || 0,  // 3P% (convert to decimal)
          ft_pct: parseFloat(offStats[9]) / 100 || 0,   // FT% (convert to decimal)
          fg3m: parseFloat(offStats[4]) || 0     // 3-pointers made per game
        };
      }
    });
    
    console.log(`Fetched detailed stats for ${athletes.length} players`);
    return statsMap;
  } catch (error) {
    console.error('Error fetching detailed stats:', error.message);
    return null;
  }
}

async function scrapeNBARoster() {
  try {
    console.log('Fetching roster from NBA.com...');
    const response = await axios.get(NBA_ROSTER_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      },
      timeout: 10000
    });

    const dom = new JSDOM(response.data);
    const doc = dom.window.document;

    // Find the __NEXT_DATA__ script tag
    const nextDataScript = doc.querySelector('script#__NEXT_DATA__');
    if (!nextDataScript) {
      console.error('Could not find __NEXT_DATA__ script tag');
      return null;
    }

    // Parse the JSON data
    const nextData = JSON.parse(nextDataScript.textContent);
    const rosterData = nextData?.props?.pageProps?.rosterData?.roster;

    if (!rosterData || !Array.isArray(rosterData)) {
      console.error('Could not find roster data in __NEXT_DATA__');
      return null;
    }

    console.log(`Found ${rosterData.length} players in roster data`);

    // Get detailed stats from NBA Stats API
    const detailedStats = await getDetailedStats();

    // Transform the data to our format
    const playerData = {};
    
    rosterData.forEach((player) => {
      const sanitizedKey = player.name.replace(/[.#$\/\[\]]/g, '');
      
      // Build headshot URL from NBA CDN (standard pattern)
      const headshot = `https://cdn.nba.com/headshots/nba/latest/1040x760/${player.id}.png`;
      
      // Get detailed stats if available, otherwise use basic stats
      const stats = detailedStats?.[player.name] || {
        pts: player.stats?.season?.ppg || 0,
        reb: player.stats?.season?.rpg || 0,
        ast: player.stats?.season?.apg || 0,
        stl: player.stats?.season?.spg || 0,
        blk: 0,
        ft_pct: 0,
        fg_pct: 0,
        fg3_pct: 0,
        fg3m: 0
      };
      
      playerData[sanitizedKey] = {
        name: player.name,
        number: player.number,
        position: player.position,
        height: player.height,
        weight: player.weight,
        age: player.age,
        experience: player.experience,
        country: player.country,
        headshot: headshot,
        stats: stats
      };
      
      console.log(`Processed: ${player.name} - #${player.number} - ${player.position}`);
    });

    console.log(`Successfully processed ${Object.keys(playerData).length} players`);
    return playerData;
  } catch (error) {
    console.error('Error scraping NBA roster:', error.message);
    return null;
  }
}

// No longer needed - all data comes from NBA.com __NEXT_DATA__

async function updateRoster(rosterData) {
  try {
    const db = admin.database();
    await db.ref('roster').set({
      players: rosterData
    });
    console.log('Roster updated successfully in Firebase');
  } catch (error) {
    console.error('Error updating roster in Firebase:', error);
    throw error;
  }
}

async function getNews() {
  try {
    if (!process.env.FIRECRAWL_API_KEY) {
      console.error('Missing Firecrawl API key')
      return
    }

    console.log('Fetching news from DuckDuckGo via Firecrawl...')
    const result = await firecrawl.scrape('https://duckduckgo.com/?origin=funnel_home_website&t=h_&q=detroit%20pistons&ia=news&iar=news', {
      formats: [
        {
          type: 'json',
          prompt:
            'Return an array "articles" with objects {title, url, source, publishedAt, description, image} for each Detroit Pistons news card on the page.'
        }
      ],
      onlyMainContent: false,
      timeout: 20000,
      maxAge: 0
    })

    if (!result?.data?.json?.articles) {
      console.error('Firecrawl response missing structured data')
      return
    }

    const articles = Array.isArray(result.data.json.articles) ? result.data.json.articles : []
    const parsedArticles = articles
      .map(article => ({
        id: article.id || article.url || article.title,
        title: article.title || article.headline || 'Untitled',
        description: article.description || article.summary || '',
        source: article.source || article.publisher || 'Unknown',
        publishedAt: article.publishedAt || article.time || null,
        url: article.url || article.link || null,
        image: article.image || article.imageUrl || null
      }))
      .filter(article => Boolean(article.url))

    const db = admin.database()
    await db.ref('news').set({ articles: parsedArticles, fetchedAt: new Date().toISOString() })
    console.log(`News updated successfully in Firebase (${parsedArticles.length} articles)`)  } catch (error) {
    console.error('Error fetching/updating news:', error)
  }
}

async function logSystemUpdate(status, message, details = {}) {
  try {
    const db = admin.database();
    await db.ref('system/last_update').set({
      timestamp: new Date().toISOString(),
      status: status,
      message: message,
      details: details
    });
  } catch (error) {
    console.error('Failed to log system update:', error);
  }
}

async function runUpdate() {
  const startTime = Date.now();
  try {
    console.log('Starting scheduled pistons data update');
    await logSystemUpdate('running', 'Starting data update process');
    
    // Fetch roster data from NBA.com
    console.log('Fetching roster from NBA.com');
    const rosterData = await scrapeNBARoster();

    if (!rosterData) {
      console.log('Failed to fetch roster from NBA.com');
      return { success: false, message: 'Failed to fetch roster from NBA.com' };
    }
    
    // Update Firebase
    console.log('Updating roster in Firebase');
    await updateRoster(rosterData);
    
    // Get latest news
    console.log('Fetching and updating news');
    await getNews();

    console.log('Scheduled update completed successfully');
    await logSystemUpdate('completed', 'Update completed successfully', {
      roster_players: rosterData ? Object.keys(rosterData).length : 0,
      execution_time_ms: Date.now() - startTime
    });
    return { success: true, message: 'Update completed successfully' };
  } catch (error) {
    console.error('Error in scheduled update:', error);
    await logSystemUpdate('failed', `Update failed: ${error.message}`, {
      error_type: error.name,
      execution_time_ms: Date.now() - startTime
    });
    return { success: false, message: `Update failed: ${error.message}` };
  }
}

// Netlify Background Function handler
exports.handler = async (event, context) => {
  try {
    console.log('Background Pistons update function triggered');
    console.log('Event:', event.httpMethod, event.headers);
    
    // Background functions don't return data to client
    // They run asynchronously and the client gets a 202 response
    const result = await runUpdate();
    
    // Log the result for monitoring
    if (result.success) {
      console.log('Background function completed successfully:', result.message);
    } else {
      console.error('Background function failed:', result.message);
      throw new Error(result.message);
    }
    
    // Background functions don't need to return a response
    // The client automatically gets a 202 Accepted response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Background task started' })
    };
  } catch (error) {
    console.error('Background function execution error:', error);
    // Throwing an error will trigger Netlify's retry mechanism
    throw error;
  }
};
