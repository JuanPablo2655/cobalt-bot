exports.run = async (client, message, args, level) => {
  const Discord = require("discord.js");
  const embed = new Discord.RichEmbed()

  embed.setTitle('Cobaltian Cross')
    .addField('First Appeared', 'December 8, 2017')
    .addField('First Instituted', '- December 8, 2017 (formerly)\n- March 14, 2018 (currently)')
    .setImage('https://cdn.discordapp.com/attachments/349728237729087498/447914525740498965/CobaltianCross.png')
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
  name: "cross",
  category: "NationStates",
  description: "Cobaltian Cross",
  usage: "cross"
};
