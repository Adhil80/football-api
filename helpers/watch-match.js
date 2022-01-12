let puppeteer = require('puppeteer');
const bot = require('../bot/bot');
const { sendMessage, editMessage } = require('../bot/bot');
module.exports = {
    startwatching: (match) => {
        return new Promise(async (resolve, reject) => {
            async function start() {
                try {
                    console.log(`Started watching match ${match.teamA} vs ${match.teamB}`);
                    browser = await puppeteer.launch({ headless: false })
                    let page = await browser.newPage()
                    await page.goto('https://www.google.com/?gl=in&hl=en&pws=0&gws_rd=cr')
                    let searchBox = await page.waitForXPath('//input[@class="gLFyf gsfi"]')
                    await searchBox.type(`${match.teamA} vs ${match.teamB}\n`)
                    let timeE = await page.waitForXPath('//div[@class="imso_mh__lv-m-stts-cont"]')
                    let teamAGoalE = await page.$('.imso_mh__l-tm-sc')
                    let teamBGoalE = await page.$('.imso_mh__r-tm-sc')

                    let msg_id = null
                    let oldMsg = null
                    let end = false
                    let watching_match = setInterval(async () => {
                        let time = await page.evaluate(el => el.textContent, timeE)
                        let teamAGoal = await page.evaluate(el => el.textContent, teamAGoalE)
                        let teamBGoal = await page.evaluate(el => el.textContent, teamBGoalE)
                        console.log(time, teamAGoal, teamBGoal);
                        if (msg_id == null) {
                            oldMsg = `⚽⚽⚽⚽⚽⚽⚽⚽⚽\n${match.league}\n⛳⛳⛳⛳⛳⛳⛳⛳⛳\n${match.teamA} VS ${match.teamB}\n⛳⛳⛳⛳⛳⛳⛳⛳⛳\nTIME : ${time}\n${match.teamA} : ${teamAGoal}\n${match.teamB} : ${teamBGoal}\n⚽⚽⚽⚽⚽⚽⚽⚽⚽\n📍📍LIVE UPDATION ENABLED📍📍`
                            msg_id = await sendMessage(oldMsg)
                        } else {
                            if (oldMsg == null | oldMsg != `⚽⚽⚽⚽⚽⚽⚽⚽⚽\n${match.league}\n⛳⛳⛳⛳⛳⛳⛳⛳⛳\n${match.teamA} VS ${match.teamB}\n⛳⛳⛳⛳⛳⛳⛳⛳⛳\nTIME : ${time}\n${match.teamA} : ${teamAGoal}\n${match.teamB} : ${teamBGoal}\n⚽⚽⚽⚽⚽⚽⚽⚽⚽\n📍📍LIVE UPDATION ENABLED📍📍`) {
                                oldMsg = `⚽⚽⚽⚽⚽⚽⚽⚽⚽\n${match.league}\n⛳⛳⛳⛳⛳⛳⛳⛳⛳\n${match.teamA} VS ${match.teamB}\n⛳⛳⛳⛳⛳⛳⛳⛳⛳\nTIME : ${time}\n${match.teamA} : ${teamAGoal}\n${match.teamB} : ${teamBGoal}\n⚽⚽⚽⚽⚽⚽⚽⚽⚽\n📍📍LIVE UPDATION ENABLED📍📍`
                                await editMessage(oldMsg, msg_id)
                            }
                        }
                        if(end){
                            clearInterval(watching_match)
                            await browser.close()
                        }
                    }, 1000 * 30)


                    try {
                        let ftElement = await page.waitForSelector('span[class="imso_mh__ft-mtch imso-medium-font imso_mh__ft-mtchc"]', {
                            visible: true,
                            timeout:100
                        })
                        end = true
                    } catch (error) {
                        
                    }
                    resolve()
                } catch (error) {
                    console.log(error);
                    bot.se
                    setTimeout(() => {
                        start()
                    }, 1000 * 60 * 2);
                }
            }
            start()

        })
    },

}