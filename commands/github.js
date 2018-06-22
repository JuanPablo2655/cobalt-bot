exports.run = async (client, message, args, level) => {
    const Discord = require("discord.js");
    const embed = new Discord.RichEmbed()
.addField('Github link', '[here](https://github.com/JuanPablo2655/Cobalt)');
message.channel.send({embed})
.catch(e => logger.erroe(e));
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "github",
  category: "Miscelaneous",
  description: "Takes you to the code source.",
  usage: "github"
};
