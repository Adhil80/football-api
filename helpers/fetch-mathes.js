let puppeteer = require('puppeteer')
let fs = require('fs')
const { getMonthNumberFromName, convertTime12to24 } = require('./time-utils')
const bot = require('../bot/bot')
module.exports = {
    fetchMatches: () => {
        return new Promise((resolve, reject) => {

            console.log('||||||||||||||||||||||||||||||||||||||||||||||||Updating matches||||||||||||||||||||||||||||||||||||||||||||||||');

            let leagues = ['ISL', 'Premier League', 'La Liga', 'UEFA Champions League','Seria A','League 1','BundesLiga']
            let position = 0
            let ongogingMatches = []

            async function startFetching() {
                let match = leagues[position]
                let browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] })
                let page = await browser.newPage()
                console.log('||||||||||||||||||||||||||||||||||||||||||||||||Updating ' + leagues[position] + '||||||||||||||||||||||||||||||||||||||||||||||||');
                await page.setViewport({ height: 0, width: 0 })
                await page.goto('https://www.google.com/?gl=in&hl=en&pws=0&gws_rd=cr')
                let searchBox = await page.waitForXPath('//input[@class="gLFyf gsfi"]')
                await searchBox.type(match + '\n')
                await (await page.waitForXPath('//div[@class="SwsxUd"]')).click()
                setTimeout(async () => {
                    let matches = await page.$$('.KAIX8d')
                    let i = 0
                    async function fetchDetails() {
                        let match = matches[i]
                        let teams = await match.$$('.imspo_mt__tt-w')
                        if (teams.length == 2) {
                            let teamA = await page.evaluate(el => el.textContent, teams[0])
                            let teamB = await page.evaluate(el => el.textContent, teams[1])
                            let date = await page.evaluate(el => el.textContent, (await match.$('.imspo_mt__date')))
                            let time = await page.evaluate(el => el.textContent, (await match.$('.imspo_mt__ndl-p')))
                            if (date.includes('Today') | date.includes('Tomorrow')) {
                                let foundMatch = ongogingMatches.filter(obj => {
                                    return obj.key === teamA + teamB + date + time
                                })
                                if (foundMatch.length == 0) {
                                    console.log({ teamA, teamB, date, time, key: teamA + teamB + date + time });
                                    ongogingMatches.push({ teamA, teamB, date, time, key: teamA + teamB + date + time,league:leagues[position] })
                                    onDetailsFetched(browser)
                                } else {
                                    onDetailsFetched(browser)
                                }
                            } else {
                                onDetailsFetched(browser)
                            }
                        } else {
                            onDetailsFetched(browser)
                        }
                    }


                    async function onDetailsFetched(browser) {
                        i = i + 1
                        if (matches[i] != null) {
                            fetchDetails()
                        } else {
                            onMatchFetched(browser)
                        }
                    }

                    async function onMatchFetched(browser) {
                        await browser.close()
                        position = position + 1
                        console.log(leagues.length - 1, position);
                        if (leagues[position] != null) {
                            startFetching()
                        } else {
                            ongogingMatches.forEach((match, i) => {
                                ongogingMatches[i].time24 = convertTime12to24(match.time)
                            })
                            ongogingMatches.sort(function (a, b) {
                                let aDate = new Date()
                                let bDate = new Date()
                                if (a.date == 'Tomorrow') {
                                    aDate.setUTCDate(aDate.getUTCDate() + 1)
                                }
                                if (b.date == 'Tomorrow') {
                                    bDate.setUTCDate(bDate.getUTCDate() + 1)
                                }
                                aDate.setHours(a.time24.split(':')[0])
                                aDate.setMinutes(a.time24.split(':')[1]+2)

                                bDate.setHours(b.time24.split(':')[0])
                                bDate.setMinutes(b.time24.split(':')[1]+2)

                                a.dobj = aDate
                                b.dobj = bDate

                                return aDate - bDate;
                            });
                            fs.writeFileSync(__dirname + '/database/matches.json', JSON.stringify(ongogingMatches))
                            console.log('Updattion compleated');

                            let msg = `TOADAYS MATCHES\n🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩`
                            ongogingMatches.forEach(match => {
                                msg+=`\n👉 ${match.teamA} vs ${match.teamB} (${match.league})`
                            });
                            await bot.sendMessage(msg)

                            resolve()
                        }
                    }

                    fetchDetails()

                }, 5000)


            }
            setTimeout(() => {
                startFetching()
            }, 1000)

        })
    }
}