const Discord = require("discord.js");
const fs = require("fs");
const path = require('path');

module.exports.run = async (cobalt, message, args) => {
    const categories = fs.readdirSync('./commands/').filter(file => fs.statSync(path.join('./commands/', file)).isDirectory());
    let helpEmbed = new Discord.RichEmbed()
    if (args.length == 0) {
        helpEmbed.setAuthor('Cobalt Network', message.guild.iconURL)
    helpEmbed.setTitle('Help Menu')
    for (i = 0; i < categories.length; i++) {
        helpEmbed.addField(categories[i], `\`t!!help ${categories[i]}\``, true)
    }
    helpEmbed.setFooter('h')
    helpEmbed.setTimestamp()
    helpEmbed.setColor('RANDOM')
    
    message.channel.send(helpEmbed)
    } else if (args[0] = categories) {
        message.channel.send('commands').catch(console.error);
    } else if(args[0] !== categories) {
        message.channel.send(cobalt.advancedHelp(cobalt.commands.get(args[0]))).catch(console.error);
    }

}

exports.conf = {
    aliases: ['h']
}

exports.help = {
    name: "help",
    description: "Let the bot say stuff",
    usage: "help"
}