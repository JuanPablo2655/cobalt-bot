const Discord = require('discord.js');
const cobalt = new Discord.Client();
const mongoose = require('./utils/mongoose.js');
const fs = require("fs");
const path = require('path');
const moment = require('moment');

const config = require("./config.json");
cobalt.config = config;
const secrets = require("./secrets.json");

cobalt.commands = new Discord.Collection();
cobalt.aliases = new Discord.Collection();
const categories = fs.readdirSync('./commands/').filter(file => fs.statSync(path.join('./commands/', file)).isDirectory());

categories.forEach(c => {
    fs.readdir(`./commands/${c}/`, async (err, files) => {
        if (err) throw err;
        console.log(`[Commands]\tLoaded ${files.length} commands of category ${c}`);
        await files.forEach(f => {
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
    await files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        cobalt.on(evtName, evt.bind(null, cobalt));
    });
});

cobalt.advancedHelp = function (command) {
    if (!command) return "That command doesn't exist.";
    let helpMenu = new Discord.RichEmbed()
        .setTitle('Help Menu')
        .setColor('RANDOM')
        .addField('Description', command.help["description"])
        .addField("Usage", command.help["usage"])
        .addField("Aliases", command.conf["aliases"].join(", ") || "No Aliases");
    return helpMenu;
}

mongoose.init();
cobalt.login(secrets.token);

exports.config = config;
exports.cobalt = cobalt;