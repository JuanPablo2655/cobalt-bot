exports.run = async (client, message, args, level) => {
  const Discord = require("discord.js");
  const embed = new Discord.RichEmbed()
  .setTitle('Fourth Cobalt Network Election')
  .addField('President / Vice-President', 'Lan Khao Xang Hom Krung Tai\nNancivania')
  .addField('Minister of Information', 'Greater Redosia\nShadow Guard')
  .addField('Minister of Defense', 'Da Klan')
  .addField('Minister of Internal Affairs', 'Military Lands of the Scottish People')
  .addField('Minister of Foreign Affairs', 'Nations United for Conquest\nRomanussia')
  .setFooter(`requested by: ${message.author.tag}`)
  .setColor('RANDOM');
message.channel.send({embed})
.catch(e => logger.error(e))
};

exports.conf = {
  enabled: false,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "election",
  category: "Nationstates",
  description: "Cobalts elections every 100 days.",
  usage: "election"
};
