exports.run = async (client, message, args, level) => {
  const Discord = require("discord.js");
  const embed = new Discord.RichEmbed()
  .addField('Tuwaspeak', 'oho\no\noof\nyus\nnoice\nye\nmhm\nmhh\nkk\nmmm\nya\ndunno')
  .setFooter(`requested by: ${message.author.tag}`)
  .setColor('RANDOM');
message.channel.send({embed})
.catch(e => logger.error(e))
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "tuwaspeak",
  category: "Nationstates",
  description: "tuwaspeak dictionary.",
  usage: "tuwaspeak"
};
