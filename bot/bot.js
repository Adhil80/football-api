const { Bot } = require("grammy");
const bot = new Bot("2070988803:AAHtmFA3xVhQp2BGEHx4nJ-KVICaMnwk1Jg");
bot.start();

module.exports = {
    sendMessage: async (text) => {
        let msg = await bot.api.sendMessage(-1001707594800, text)
        return msg.message_id
    },
    editMessage: async (text, msg_id) => {
        try {
            let msg = await bot.api.editMessageText(-1001707594800, msg_id, text)
            return msg.message_id
        } catch (error) {

        }

    }
}