import got from "got";
import jsdom from "jsdom";
import { updateRoster } from "./firebase.js";

const { JSDOM } = jsdom;

const ROSTER_URL =
  "https://www.espn.com/nba/team/roster/_/name/det/detroit-pistons";

function scrapeRoster() {
  got(ROSTER_URL)
    .then((response) => {
      const dom = new JSDOM(response.body);
      const elm = (selector) => dom.window.document.querySelector(selector);
      const rosterTableBody = elm(".Table__TBODY").children;
      const players = [];

      for (let i = 0; i < rosterTableBody.length; i++) {
        players.push(rosterTableBody[i].innerHTML);
      }
      const playerNames = [];
      const headshots = [];

      players.forEach((player) => {
        //find player names
        const firstLink = player.match(/<a.*?>(.*?)<\/a>/)[0];
        const name = firstLink.match(/title="(.*?)"/)[1];
        playerNames.push(name);
        //find headshots
        const headshot = player.match(/<img.*?>/)[0];
        const headshotUrl = headshot.match(/alt="(.*?)"/)[1];
        headshots.push(headshotUrl);
      });

      function sanitizeKey(key) {
        return key.replace(/[.#$\/\[\]]/g, "");
      }

      const getObjKeyedByPlayerName = (playerNames, headshots) => {
        const obj = {};
        playerNames.forEach((name, i) => {
          const sanitizedKey = sanitizeKey(name);
          const subObj = {
            name,
            headshot: headshots[i],
          };
          obj[sanitizedKey] = subObj;
        });
        updateRoster(obj);
      };
      getObjKeyedByPlayerName(playerNames, headshots);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { scrapeRoster };
