exports.run = async (client, message, args, level) => {
  const Discord = require("discord.js");
  const embed = new Discord.RichEmbed()

  embed.setTitle('Cobalt Star')
    .addField('First Appeared', 'March 12, 2018')
    .addField('First Instituted', 'March 12, 2018')
    .setImage('https://cdn.discordapp.com/attachments/349728237729087498/447913912877449216/CobaltCross.png')
    .addField('Holders', "soon"),
  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "user"
};

exports.help = {
  name: "star",
  category: "NationStates",
  description: "Cobalt Star",
  usage: "star"
};
