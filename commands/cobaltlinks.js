exports.run = async (client, message, args, level) => {
  const Discord = require("discord.js");
  const embed = new Discord.RichEmbed()
  .addField('Cobalt Network Region', '[here](https://www.nationstates.net/region=cobalt_network)')
.addField('Constitution', '[Official Constitution of the Cobalt Network](https://www.nationstates.net/page=dispatch/id=918888)')
.addField('Links', '[Roleplay OP Template ](https://docs.google.com/document/d/1CoLJXybpdY2Y_GfUm10JMJDS8NuwRFGn2mw5QJH9QxY/edit)\n[Regional Sign-up](https://forum.nationstates.net/viewtopic.php?f=23&t=426075&p=32700568)\n[Recruitment Hub](https://forum.nationstates.net/viewtopic.php?f=23&t=426075)\n')
.addField('dispatches', '[Roleplay List](https://www.nationstates.net/page=dispatch/id=785058)\n[Important Documents](https://www.nationstates.net/page=dispatch/id=944024)\n')
.setFooter(`requested by: ${message.author.tag}`)
.setColor('RANDOM');
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
  name: "cobaltlinks",
  category: "NationStates",
  description: "directs you to the Cobalt links.",
  usage: "cobaltlinks"
};
