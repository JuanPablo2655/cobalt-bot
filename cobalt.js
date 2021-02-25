const { Collection, Intents } = require('discord.js');
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

cobalt.on("warn", info => console.log(info))
cobalt.on("error", console.error)

process.on('uncaughtException', error => {
    const errorMsg = error.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error(`Uncaught Exception: ${errorMsg}`)
    console.error(error)
    process.exit(1)
})

process.on('unhandledRejection', error => {
    console.error(`Unhandled rejection: ${error}`)
    console.error(error);
})

// mongoose.init();
cobalt.login(secrets.token);

// exports.config = config;
exports.cobalt = cobalt;