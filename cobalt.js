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

cobalt.on('ready', () => {
    console.log('bot ready!', ascii);
    setInterval(function(){
        let l = [
          'Axalis take a shower',
          'John suck big peepee',
          'Alois committing genocide',
          'over the server'
        ]
        cobalt.user.setActivity(l[Math.floor(Math.random()*l.length)], {type: 'WATCHING'});
      }, 3600000);
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
    } if (!cmd) return false;
    if (cmd) {
        console.log(`Cobalt: ${message.author.username}#${message.author.discriminator} used command '${cmd.help["name"]}' on ${message.guild.name}`);
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
    let helpMenu = new Discord.RichEmbed().setTitle('Help Menu').setColor('RANDOM');
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
        .setColor('RANDOM')
        .addField('Description', command.help["description"])
        .addField("Usage", command.help["usage"])
        .addField("Aliases", command.conf["aliases"].join(", "));
    return helpMenu;
}
    
cobalt.login(secrets.token);