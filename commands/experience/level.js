const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let xp = require('../../utils/xp.js');
        let user = cobalt.users.get(args[0]) || message.mentions.users.last();
        if (!user){
            user = message.author;
        }
    
        let level = await xp.get(user.id);
    
        let levelEmbed = new Discord.RichEmbed()
            .setAuthor('Cobalt Network', message.guild.iconURL)
            .setTitle(`${user.username}'s level`)
            .setColor('RANDOM')
            if (!level) {
                levelEmbed.addField('level', '0', true)
                levelEmbed.addField('xp', '0/100', true)
            } else {
                levelEmbed.addField('level', level.lvl, true)
                levelEmbed.addField('xp', level.xp+"/"+xp.nextLevel(level.lvl), true)
            }
            levelEmbed.setFooter(`${message.author.username}`, `${message.author.displayAvatarURL}`)
            levelEmbed.setTimestamp()
        message.channel.send(levelEmbed);
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['rank']
}

exports.help = {
    name: "level",
    description: "show's how much xp you have",
    usage: "level [message]"
}