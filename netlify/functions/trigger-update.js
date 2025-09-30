// Manual trigger function to test the background update
// Access via: https://your-site.netlify.app/.netlify/functions/trigger-update

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed. Use POST.' })
    };
  }

  try {
    // Get the site URL from environment or construct it
    const siteUrl = process.env.URL || context.site?.url || 'https://stons-center.netlify.app';
    const backgroundFunctionUrl = `${siteUrl}/.netlify/functions/pistons-update-background`;
    
    console.log('Triggering background function:', backgroundFunctionUrl);

    // Trigger the background function
    const response = await fetch(backgroundFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        source: 'manual-trigger',
        timestamp: new Date().toISOString()
      })
    });

    const responseText = await response.text();
    console.log('Background function response:', response.status, responseText);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'Background update triggered successfully',
        backgroundFunctionStatus: response.status,
        backgroundFunctionResponse: responseText,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('Error triggering background function:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};