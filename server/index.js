
import fetch from 'node-fetch';
import { scrapeRoster } from './scrape.js';
import { updateRoster, playerData } from './firebase.js';

import schedule from 'node-schedule';

async function runIndex() {
    scrapeRoster();

    const rosterObj = await playerData

    const pushPlayerInfo = async () => {
        const buildRoster = async () => {
            Object.entries(rosterObj).forEach(([key, value]) => {
                const sanitizedName = value?.name.replace(/\s/g, '%20').toLowerCase();
                rosterObj[key].name = sanitizedName;
            });
        }

        await buildRoster();

        const getPlayerIds = async () => {
            const playerNames = Object.keys(rosterObj);
            const playerIds = [];
            for (let i = 0; i < playerNames.length; i++) {
                const response = await fetch(`https://www.balldontlie.io/api/v1/players?search=${playerNames[i]}`);
                const data = await response.json();
                const playerId = data.data[0]?.id;
                const position = data.data[0]?.position;
                const weight = data.data[0]?.weight_pounds;
                const height = `${data.data[0]?.height_feet}'${data.data[0]?.height_inches}`;
                rosterObj[playerNames[i]].id = playerId || 0;
                rosterObj[playerNames[i]].position = position || 'N/A';
                rosterObj[playerNames[i]].weight = weight || 'N/A';
                rosterObj[playerNames[i]].height = height || 'N/A';

                playerId ? playerIds.push(playerId) : null
            }

            //Use array of playerIds to get player stats from balldontlie API
            const idString = playerIds.join("&player_ids[]=", "");
            await fetch(
                `https://www.balldontlie.io/api/v1/season_averages?season=${new Date().getFullYear() - 1
                }&player_ids[]=${idString}`
            )
                .then((res) => res.json())
                .then((data) => {
                    const playerStats = data.data;
                    for (let i = 0; i < playerStats.length; i++) {
                        //find the player in the roster object with the same player_id and add the stats to the object
                        Object.entries(rosterObj).forEach(([key, value]) => {
                            if (value.id === playerStats[i].player_id) {
                                rosterObj[key].stats = playerStats[i];
                            }
                        })
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        }
        await getPlayerIds();
        updateRoster(rosterObj);
    }

    await pushPlayerInfo();


    console.log('The answer to life, the universe, and everything!');
}
runIndex();
