import axios from 'axios'
import jsdom from 'jsdom'

const { JSDOM } = jsdom

async function checkRoster() {
  const response = await axios.get('https://www.nba.com/pistons/roster', {
    timeout: 10000
  })
  
  const dom = new JSDOM(response.data)
  const doc = dom.window.document
  const nextDataScript = doc.querySelector('script#__NEXT_DATA__')
  const nextData = JSON.parse(nextDataScript.textContent)
  const roster = nextData?.props?.pageProps?.rosterData?.roster
  
  console.log('\n=== Current Roster from NBA.com ===\n')
  roster.forEach(p => {
    console.log(`${p.name} - ${p.stats?.season?.ppg || 0} PPG`)
  })
}

checkRoster()
