
const { default: axios } = require('axios');
let fs = require('fs');
const bot = require('./bot/bot');
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

        setInterval(()=>{
            axios.get('https://football-bot-api.herokuapp.com/')
        },1000*60*25)

        setInterval(()=>{
            openFetchingMatch()
        },1000*60*60*24)
        openWating()
    },
    fetchMatches:()=>{
       openFetchingMatch()
    }
}

setTimeout(()=>{
    openFetchingMatch()
},1000*60*60*24)