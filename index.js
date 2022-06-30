const {
    Telegraf,
    Markup
} = require('telegraf')

const commandsList = require('./const')

require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)

//bot.start((ctx) => ctx.reply(`Добро пожаловать, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!`))

bot.command('start', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Добро пожаловать в главное меню!</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Ввести артикул товараwa', 'button_article')]
            ]
        ))
    } catch (e) {
        console.error(e)
    }
})

bot.help((ctx) => ctx.reply(commandsList.commands))

function botActions(button_id, file_src, msg_text) {
    bot.action(button_id, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if(file_src !== false) {
                await ctx.replyWithPhoto({
                    source: file_src
                })
            }
            await ctx.replyWithHTML(msg_text, {
                disable_web_page_preview: true
            })
        } catch (e) {
            console.error(e)
        }
    })
}

botActions('button_article', false, commandsList.textForArticle)

bot.launch()

// Enable graceful stop it
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))