const { Collection, Intents, WebhookClient } = require('discord.js');
const cobaltClass = require('./utils/cobaltClient');
const cobalt = new cobaltClass({ws: { intents: Intents.ALL }, partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER']});
// const mongoose = require('./utils/mongoose.js');
const fs = require("fs");
const path = require('path');

const secrets = require("./secrets.json");

cobalt.commands = new Collection();
cobalt.aliases = new Collection();
cobalt.cooldowns = new Collection();
cobalt.sniper = new Map();

const categories = fs.readdirSync('./commands/').filter(file => fs.statSync(path.join('./commands/', file)).isDirectory());

categories.forEach(c => {
    fs.readdir(`./commands/${c}/`, async (err, files) => {
        if (err) throw err;
        console.log(`[Commands]\tLoaded ${files.length} commands of category ${c}`);
        files.forEach(f => {
            const props = require(`./commands/${c}/${f}`);
            cobalt.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                cobalt.aliases.set(alias, props.help.name);
            });
        });
    });
});

fs.readdir('./events/', async (err, files) => {
    if (err) return console.error;
    console.log(`[Events]\tLoaded a total amount ${files.length} Events`)
    files.forEach(file => {
        if (!file.endsWith('.js'))
            return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        cobalt.on(evtName, evt.bind(null, cobalt));
    });
});

// cobalt.on("warn", info => console.log(info))
// cobalt.on("error", console.error)

// process.on('uncaughtException', error => {
//     const errorMsg = error.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
//     console.error(`Uncaught Exception: ${errorMsg}`)
//     console.error(error)
//     process.exit(1)
// })

// process.on('unhandledRejection', error => {
//     console.error(`Unhandled rejection: ${error}`)
//     console.error(error);
// })

const { inspect } = require("util")
process.on('unhandledRejection', (reason, promise) => {
    cobalt.channels.cache.get('823301224798617680').send(`UnhandledRejection\nReason:\n\`\`\`\n${inspect(reason, { depth: 0 })}\n\`\`\` Promise:\n\`\`\`\n${inspect(promise, { depth: 0 })}\n\`\`\``)
    console.error(reason, promise)
});

process.on('uncaughtException', async (err, origin) => {
    await cobalt.channels.cache.get('823301224798617680').send(`UncaughtException\nError:\n\`\`\`\n${inspect(err, { depth: 0 })}\n\`\`\`\nType: ${inspect(origin, { depth: 0 })}`)
    await console.error(err, origin)
    process.exit(1)
});

process.on('warning', (warn) => {
    cobalt.channels.cache.get('823301224798617680').send(`Warning\nWarn:\n\`\`\`\n${warn.name}\n${warn.message}\n\n${warn.stack}\n\`\`\``)
});

// mongoose.init();
cobalt.login(secrets.token);

webhook = new WebhookClient(secrets.webhookID, secrets.webhookToken)

cobalt.on("disconnect", () => webhook.send("Bot is disconnecting..."))
	.on("reconnecting", () => webhook.send("Bot reconnecting..."))
	.on("error", (e) => webhook.send(e))
	.on("warn", (info) => webhook.send(info));

// exports.config = config;
exports.cobalt = cobalt;