const axios = require('axios');
const { JSDOM } = require('jsdom');
const admin = require('firebase-admin');

// Initialize Firebase Admin (only once)
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
  } catch (error) {
    console.error('Firebase Admin initialization failed:', error);
  }
}

const ROSTER_URL = 'https://www.espn.com/nba/team/roster/_/name/det/detroit-pistons';

async function scrapeRoster() {
  try {
    const response = await axios.get(ROSTER_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0'
      },
      timeout: 10000
    });

    const dom = new JSDOM(response.data);
    const doc = dom.window.document;

    const playerData = {};
    const rows = Array.from(doc.querySelectorAll('.Table__TBODY .Table__TR'));

    console.log(`Found ${rows.length} player rows`);

    rows.forEach((row, index) => {
      const imgElement = row.querySelector('img');
      if (!imgElement) {
        console.log(`No image element found for row ${index}`);
        return;
      }

      const name = imgElement.getAttribute('title');
      const headshotUrl = imgElement.getAttribute('alt');

      if (name && headshotUrl) {
        console.log(`Processing player: ${name}`);
        const sanitizedKey = name.replace(/[.#$\/\[\]]/g, '');
        playerData[sanitizedKey] = {
          name,
          headshot: headshotUrl
        };
      } else {
        console.log(`Missing name or headshot for row ${index}`);
      }
    });

    const playerCount = Object.keys(playerData).length;
    if (playerCount === 0) {
      console.log('No players found in the roster');
      return null;
    }

    console.log(`Successfully scraped ${playerCount} players`);
    return playerData;
  } catch (error) {
    console.error('Error scraping roster:', error);
    return null;
  }
}

function sanitizeKey(key) {
  return key.replace(/[.#$\/\[\]]/g, '');
}

async function sanitizeNames(rosterObj) {
  const sanitizedRosterObj = {};
  Object.entries(rosterObj).forEach(([key, value]) => {
    const sanitizedName = value?.name.replace(/\s/g, '%20');
    const sanitizedKey = sanitizeKey(key);
    sanitizedRosterObj[sanitizedKey] = { ...value, name: sanitizedName };
  });
  return sanitizedRosterObj;
}

async function getPlayerInfo(rosterObj) {
  const playerNames = Object.keys(rosterObj);
  console.log('Fetching player information...');

  for (let i = 0; i < playerNames.length; i++) {
    const playerName = rosterObj[playerNames[i]].name;
    console.log(`Fetching info for player: ${playerName}`);

    try {
      const searchName = playerName.replace(/%20/g, ' ').split(' ').pop();
      console.log(`Searching for player with name: ${searchName}`);

      const response = await axios.get(
        `https://api.balldontlie.io/v1/players?search=${searchName}`,
        {
          headers: {
            Authorization: process.env.BALL_DONT_LIE_KEY
          },
          timeout: 5000
        }
      );

      const data = response.data;
      console.log(
        `API Response for ${searchName}:`,
        data.data.length ? 'Found matches' : 'No matches'
      );

      if (data.data.length > 0) {
        const playerData = data.data[0];
        rosterObj[playerNames[i]].id = playerData.id;
        rosterObj[playerNames[i]].position = playerData.position || 'N/A';
        rosterObj[playerNames[i]].weight = playerData.weight_pounds || 'N/A';
        rosterObj[playerNames[i]].height = `${playerData.height_feet || ''}${
          playerData.height_inches ? `'${playerData.height_inches}"` : 'N/A'
        }`;
        console.log(`Updated info for ${playerName}`);
      } else {
        console.log(`No data found for ${playerName}`);
      }

      // Add delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(
        `Error fetching player info for ${playerName}:`,
        error.message
      );
      // Set default values if the API call fails
      rosterObj[playerNames[i]].id = 0;
      rosterObj[playerNames[i]].position = 'N/A';
      rosterObj[playerNames[i]].weight = 'N/A';
      rosterObj[playerNames[i]].height = 'N/A';
    }
  }

  console.log('Finished updating player information');
}

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
    const endpoint = process.env.BING_SEARCH_V7_ENDPOINT;
    const query = 'Detroit Pistons';
    const apiKey = process.env.BING_SEARCH_V7_API_KEY;

    if (!endpoint || !apiKey) {
      console.log('Missing Bing Search API configuration');
      return;
    }

    const url = `${endpoint}?q=${encodeURIComponent(
      query
    )}&count=10&freshness=Day&textFormat=Raw`;
    
    console.log('Fetching news...');

    const response = await axios.get(url, {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey
      },
      timeout: 10000
    });

    console.log('Got news from Bing Search API');
    
    const db = admin.database();
    await db.ref('news').set({ articles: response.data });
    console.log('News updated successfully in Firebase');
  } catch (error) {
    console.error('Error fetching/updating news:', error);
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
    
    // Scrape roster data
    console.log('Scraping Roster');
    const scrapedRoster = await scrapeRoster();

    if (!scrapedRoster) {
      console.log('Failed to scrape roster');
      return { success: false, message: 'Failed to scrape roster' };
    }

    // Process player information
    console.log('Processing player data');
    const sanitizedRosterObj = await sanitizeNames(scrapedRoster);
    await getPlayerInfo(sanitizedRosterObj);
    
    // Update Firebase
    console.log('Updating roster in Firebase');
    await updateRoster(sanitizedRosterObj);
    
    // Get latest news
    console.log('Fetching and updating news');
    await getNews();

    console.log('Scheduled update completed successfully');
    await logSystemUpdate('completed', 'Update completed successfully', {
      roster_players: sanitizedRosterObj ? Object.keys(sanitizedRosterObj).length : 0,
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
