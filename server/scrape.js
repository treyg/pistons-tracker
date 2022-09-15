import Express from 'express';
import cors from 'cors';
import got from 'got';
import jsdom from "jsdom";
import { updateRoster } from './firebase.js';

const { JSDOM } = jsdom;

const app = Express();
app.use(cors());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

const ROSTER_URL = 'https://www.espn.com/nba/team/roster/_/name/det/detroit-pistons';

function scrapeRoster() {
    got(ROSTER_URL).then(response => {
        const dom = new JSDOM(response.body);
        const elm = (selector) => dom.window.document.querySelector(selector);
        const rosterTableBody = elm('.Table__TBODY').children
        const players = []

        for (let i = 0; i < rosterTableBody.length; i++) {
            players.push(rosterTableBody[i].innerHTML)
        }
        const playerNames = []
        const headshots = []

        players.forEach(player => {
            //find player names
            const firstLink = player.match(/<a.*?>(.*?)<\/a>/)[0]
            const name = firstLink.match(/title="(.*?)"/)[1]
            playerNames.push(name)
            //find headshots
            const headshot = player.match(/<img.*?>/)[0]
            const headshotUrl = headshot.match(/alt="(.*?)"/)[1]
            headshots.push(headshotUrl)
        });

        const getObjKeyedByPlayerName = (playerNames, headshots) => {
            const obj = {};
            playerNames.forEach((name, i) => {
                const subObj = {
                    name,
                    headshot: headshots[i],
                };
                obj[name] = subObj;
            });
            updateRoster(obj);
        };
        getObjKeyedByPlayerName(playerNames, headshots);

    }).catch(err => {
        console.log(err);
    });
}

export { scrapeRoster };