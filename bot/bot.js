const { Bot } = require("grammy");
require("dotenv").config();
const bot = new Bot(process.env.BOT_TOKEN);
let fs= require('fs')
bot.start();
bot.on('message',(ctx)=>{
    console.log(ctx.chat.id);
})
let group = -1001707594800
let me = 890115605

module.exports = {
    sendMessage: async (text) => {
        if (text.startsWith('TOADAYS MATCHES')) {
            let msg = await bot.api.sendMessage(group,text)
            return msg.message_id
        }else{
            let msg = await bot.api.sendAnimation(group,'https://cdn.dribbble.com/users/936002/screenshots/2807776/1.gif',{caption:text})
            return msg.message_id
        }
       
    },
    editMessage: async (text, msg_id) => {
        try {
            let msg = await bot.api.editMessageCaption(group, msg_id, {caption:text})
            return msg.message_id
        } catch (error) {
            bot.api.sendMessage(error.message)
        }

    }
}