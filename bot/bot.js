const { Bot } = require("grammy");
let token = process.env.BOT_TOKEN
const bot = new Bot(token);
bot.start();
let fs = require('fs')

let group = -1001707594800
let me = 890115605
let usersPath = './users'

if (!fs.existsSync('users')) {
    fs.mkdirSync('users')
}

module.exports = {
    sendMessage: async (text) => {
        let users = fs.readdirSync(usersPath)
        users.forEach(async (user) => {
            if (text.startsWith('TOADAYS MATCHES')) {
                let msg = await bot.api.sendMessage(user, text)
                return msg.message_id
            } else {
                let msg = await bot.api.sendAnimation(user, 'https://cdn.dribbble.com/users/936002/screenshots/2807776/1.gif', { caption: text })
                return msg.message_id
            }
        })


    },
    editMessage: async (text, msg_id) => {
        let users = fs.readdirSync(usersPath)
        users.forEach(async (user) => {
            try {
                let msg = await bot.api.editMessageCaption(user, msg_id, { caption: text })
                return msg.message_id
            } catch (error) {
                bot.api.sendMessage(me, error.message)
            }
        })
    }
}

bot.on('message', (ctx) => {
    if (!fs.existsSync('./users/' + ctx.chat.id)) {
        fs.mkdirSync('./users/' + ctx.chat.id)
    }
})