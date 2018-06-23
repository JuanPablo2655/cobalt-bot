exports.run = async (client, message, args, level) => {
  const Discord = require("discord.js");
  const embed = new Discord.RichEmbed()

  embed.setTitle('Order of the Cobaltian People')
    .addField('First Appeared', 'December 10, 2017')
    .addField('Instituted', '- December 10, 2017 (formerly)\n- March 14, 2018 (currently)')
    .setImage('https://cdn.discordapp.com/attachments/349728237729087498/447914682297090059/CobaltThingsv2.png')
    .addField('Holders', 'soon'),
message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "user"
};

exports.help = {
  name: "people",
  category: "NationStates",
  description: "Order of the Cobaltian People",
  usage: "people"
};
