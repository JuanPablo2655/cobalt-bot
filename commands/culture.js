exports.run = async (client, message, args, level) => {
  const Discord = require("discord.js");
  const embed = new Discord.RichEmbed()

embed.setTitle('Order of Culture with Ribbon')
.addField('First Appeared', 'March 13, 2018')
.addField('First Instituted', 'March 13, 2018')
.setImage("https://cdn.discordapp.com/attachments/322507598912028672/458776765012377635/culture.png")
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
  name: "culture",
  category: "Nationstates",
  description: "Order of Culture with Ribbon",
  usage: "culture"
};
