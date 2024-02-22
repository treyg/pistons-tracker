import fetch from "node-fetch";
import { scrapeRoster } from "./scrape.js";
import { updateRoster, playerData, getNews } from "./firebase.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const app = express();
const fakeport = process.env.PORT || 4000;

app.get("/runIndex", async (req, res) => {
  try {
    await runIndex();
    getNews();
    res.status(200).send("Roster updated successfully");
  } catch (error) {
    res.status(500).send("An error occurred while updating the roster");
  }
});

// Start the Express server
app.listen(fakeport, () => {
  console.log(`Server running on port ${fakeport}`);
});

function sanitizeKey(key) {
  return key.replace(/[.#$\/\[\]]/g, "");
}

async function sanitizeNames(rosterObj) {
  const sanitizedRosterObj = {};
  Object.entries(rosterObj).forEach(([key, value]) => {
    const sanitizedName = value?.name.replace(/\s/g, "%20").toLowerCase();
    const sanitizedKey = sanitizeKey(key);
    sanitizedRosterObj[sanitizedKey] = { ...value, name: sanitizedName };
  });
  return sanitizedRosterObj;
}

async function runIndex() {
  console.log("Scraping Roster");
  scrapeRoster();
  console.log("Updating Roster");
  const rosterObj = await playerData;
  const sanitizedRosterObj = await sanitizeNames(rosterObj);
  await getPlayerIdsAndStats(sanitizedRosterObj);
  updateRoster(sanitizedRosterObj);
}

async function getPlayerIdsAndStats(rosterObj) {
  const playerNames = Object.keys(rosterObj);
  const playerIds = [];
  for (let i = 0; i < playerNames.length; i++) {
    const { playerId, position, weight, height } = await getPlayerInfo(
      playerNames[i]
    );
    rosterObj[playerNames[i]].id = playerId || 0;
    rosterObj[playerNames[i]].position = position || "N/A";
    rosterObj[playerNames[i]].weight = weight || "N/A";
    rosterObj[playerNames[i]].height = height || "N/A";
    playerId ? playerIds.push(playerId) : null;
  }
  await getPlayerStats(rosterObj, playerIds);
}

async function getPlayerInfo(playerName) {
  const response = await fetch(
    `https://api.balldontlie.io/v1/players?search=${playerName}`,
    {
      headers: {
        Authorization: `${process.env.BALL_DONT_LIE_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  const playerId = data.data[0]?.id;
  const position = data.data[0]?.position;
  const weight = data.data[0]?.weight_pounds;
  const height = `${data.data[0]?.height_feet}'${data.data[0]?.height_inches}`;
  return { playerId, position, weight, height };
}

async function getPlayerStats(rosterObj, playerIds) {
  const idString = playerIds.join("&player_ids[]=", "");
  const response = await fetch(
    `https://api.balldontlie.io/v1/season_averages?season=${
      new Date().getFullYear() - 1
    }&player_ids[]=${idString}`,
    {
      headers: {
        Authorization: `${process.env.BALL_DONT_LIE_KEY}`,
      },
    }
  );
  const data = await response.json();
  const playerStats = data.data;
  for (let i = 0; i < playerStats.length; i++) {
    Object.entries(rosterObj).forEach(([key, value]) => {
      if (value.id === playerStats[i].player_id) {
        rosterObj[key].stats = playerStats[i];
      }
    });
  }
}

runIndex();
