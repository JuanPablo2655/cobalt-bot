const ascii = `
#####                                       ######               
#     #  ####  #####    ##   #      #####    #     #  ####  ##### 
#       #    # #    #  #  #  #        #      #     # #    #   #   
#       #    # #####  #    # #        #      ######  #    #   #   
#       #    # #    # ###### #        #      #     # #    #   #   
#     # #    # #    # #    # #        #      #     # #    #   #   
 #####   ####  #####  #    # ######   #      ######   ####    #   
			`;

const Discord = require("discord.js");
const cobalt = new Discord.Client();
const fs = require("fs");

const config = require("./config.json");
const secrets = require("./secrets.json");
cobalt.config = config;

cobalt.commands = new Discord.Collection();
cobalt.aliases = new Discord.Collection();
const mongoose = require('./utils/mongoose.js');

fs.readdir('./commands/', (err, files) => {
    if (err)
        console.error(err);
    let jsfiles = files.filter(f => f.split('.')
        .pop() === 'js');
    if (jsfiles.length <= 0) {
        console.log('No commands to load!');
        return;
    }
    console.log(`[Commands]\tLoaded a total amount ${files.length} Commands`);
    jsfiles.forEach(f => {
        let props = require(`./commands/${f}`);
        props.fileName = f;
        cobalt.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            cobalt.aliases.set(alias, props.help.name);
        });
    });
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Loaded event '${evtName}'`);
        cobalt.on(evtName, evt.bind(null, cobalt));
    });
});


cobalt.buildHelpMenu = function (commands) {
    let helpMenu = new Discord.RichEmbed().setTitle('Help Menu').setColor('RANDOM');
    for (let i = 0; i < commands.keyArray().length; i++) {
        let cmd = commands.keyArray()[i];
        let info = commands.get(cmd).help;
        helpMenu.addField(cmd, info["description"], true)
    }
    return helpMenu;
}

cobalt.advancedHelp = function (command) {
    if (!command) return "That command doesn't exist.";
    let helpMenu = new Discord.RichEmbed()
        .setTitle('Help Menu')
        .setColor('RANDOM')
        .addField('Description', command.help["description"])
        .addField("Usage", command.help["usage"])
        .addField("Aliases", command.conf["aliases"].join(", ") || "no Aliases");
    return helpMenu;
}

mongoose.init();
cobalt.login(secrets.token);

exports.config = config;
exports.cobalt = cobalt;