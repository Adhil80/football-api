let fs = require('fs')
const { getMonthNumberFromName, msToTime } = require('./time-utils')
const { startwatching } = require('./watch-match')
const watchMatch = require('./watch-match')
module.exports = {
    getMatches: () => {
        return new Promise(async (reslove, resject) => {
            let matches = await fs.readFile(__dirname + '/database/matches.json', 'utf8')
            matches = JSON.parse(matches)
            reslove(matches)
        })
    },
    waitForNextMatch: (callback) => {
        return new Promise((resolve, reject) => {

            async function startWaiting() {
                let matches = JSON.parse(fs.readFileSync(__dirname + '/database/matches.json', 'utf8'))
                let comingMatch = matches[0]
                if (comingMatch != null) {
                    let now = new Date()
                    let timeDiff = new Date(comingMatch.dobj) - now
                    console.log(timeDiff);
                    console.log(msToTime(timeDiff));
                    let startWaiting = setTimeout(() => {
                        startwatching(matches[0]).then(() => {
                            matches.shift()
                            fs.writeFileSync(__dirname + '/database/matches.json', JSON.stringify(matches))
                            callback()
                        })
                    }, timeDiff)

                    resolve(() => {
                        clearTimeout(startWaiting)
                    })
                }
            }
            startWaiting()
        })
    }

}