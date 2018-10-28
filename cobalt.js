const Discord = require("discord.js");
const cobalt = new Discord.Client();
const fs = require("fs");

const config = require("./config.json");
const secrets = require("./secrets.json");
cobalt.config = config;

cobalt.commands = new Discord.Collection();
cobalt.aliases = new Discord.Collection();

cobalt.on('ready', () => {
    console.log("I'm ready.")
    cobalt.user.setActivity("test", {type: 'WATCHING'})
});

cobalt.on('message', (message) =>{
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let cmd;
	if (cobalt.commands.has(command)) {
		cmd = cobalt.commands.get(command);
	} else if (cobalt.aliases.has(command)) {
		cmd = cobalt.commands.get(cobalt.aliases.get(command));
	}
    cmd.run(cobalt, message, args);
});

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

cobalt.buildHelpMenu = function(commands) {
    let helpMenu = new Discord.RichEmbed().setTitle('Help Menu');
    for (let i = 0; i < commands.keyArray().length; i++) {
        let cmd = commands.keyArray()[i];
        let info = commands.get(cmd).help;
        helpMenu.addField(cmd, info["description"], true)
    }
    return helpMenu;
}

cobalt.advancedHelp = function(command) {
    if (!command) return "That command doesn't exist.";
    let helpMenu = new Discord.RichEmbed()
        .setTitle('Help Menu')
        .addField('Description', command.help["description"], true)
        .addField("Usage", command.help["usage"], true)
        .addField("Aliases", command.conf["aliases"].join(", "), true);
    return helpMenu;
}
    
  cobalt.login(secrets.token);