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
        if (text.startsWith('TOADAYS MATCHES')) {
            let msg = await bot.api.sendMessage(me, text)
            return msg.message_id
        } else {
            let msg = await bot.api.sendAnimation(me, 'https://cdn.dribbble.com/users/936002/screenshots/2807776/1.gif', { caption: text })
            return msg.message_id
        }


    },
    editMessage: async (text, msg_id) => {
        try {
            let msg = await bot.api.editMessageCaption(me, msg_id, { caption: text })
            return msg.message_id
        } catch (error) {
            bot.api.sendMessage(me, error.message)
        }
    },
    sendError:(err_msg)=>{
        await bot.api.sendMessage(me,err_msg)
    }
}

bot.on('message', async (ctx) => {
    if (!fs.existsSync('./users/' + ctx.chat.id)) {
        fs.mkdirSync('./users/' + ctx.chat.id)
        await bot.api.sendMessage(ctx.chat.id, 'Thanks for subscribing the bot')
    }
})
bot.catch((err) => {
    console.log(err);
})
