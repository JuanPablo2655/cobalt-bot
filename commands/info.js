exports.run = async (client, message, args, level) => {
const Discord = require("discord.js");
const embed = new Discord.RichEmbed()
      .setThumbnail(client.user.displayAvatarURL)
      .setFooter(`requested by: ${message.author.tag}`)
      .setColor('RANDOM')
      .addField('Cobalt Network', 'Made by <@288703114473635841>')
      //.addField('About', 'Hi, Im Shadow Guard or known as Juan. I created this bot a sole purpose which is to provide information to the fellow citizen of Cobaltia with ease. With that being said, I do intend to provide more features to the memeber in the improvemnt of my coding knowledge (I suck at coding, almost everyting I do I look up how to do it, then I do it. smh).')
      .addField('__Prefix__', 'cn!')
      .addField('Bot Version: ', '1.9.5');
        message.channel.send({embed})
       .catch(e => logger.error(e));
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "info",
  category: "System",
  description: "Shows info of the bot.",
  usage: "info"
};
