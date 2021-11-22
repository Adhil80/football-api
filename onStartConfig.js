
let fs = require('fs');
const fetchMathes = require('./helpers/fetch-mathes');
const matches = require('./helpers/matches');
let stopWating = null

function openWating() {
    let databasePath = __dirname + '/helpers/database'
        if(!fs.existsSync(databasePath)){
            fs.mkdirSync(databasePath)
        }
        function startWaiting() {
            matches.waitForNextMatch(()=>{
                onWatingDone()
            }).then((cancelWaiting)=>{
                stopWating = cancelWaiting
            })
        }
        function onWatingDone() {
            startWaiting()
        }
        startWaiting()
}

function openFetchingMatch(params) {
    if (stopWating!=null) {
        clearTimeout()
    }
    fetchMathes.fetchMatches().then(()=>{
        openWating()
    })
}

module.exports = {
    setUp: () => {
        openWating()
    },
    fetchMatches:()=>{
       openFetchingMatch()
    }
}

setTimeout(()=>{
    openFetchingMatch()
},1000*60*60*24)