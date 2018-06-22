exports.run = async (client, message, args, level) => {
  const Discord = require("discord.js");
  const embed = new Discord.RichEmbed()

  let culture = message.channel.send({
    files: [{
      attachment: 'C:/Users/isidr/Desktop/cobalt/Images/OrderOfCultureWRibbon.png',
      name: 'culture.png'
    }]
})
  let star = message.channel.send({
    files: [{
      attachment: 'C:/Users/isidr/Desktop/cobalt/Images/CobaltCross.png',
      name: 'star.png'
    }]
  })
  let cross = message.channel.send({
    files: [{
      attachment: 'C:/Users/isidr/Desktop/cobalt/Images/CobaltianCross.png',
      name: 'cross.png'
    }]
  })
  let people = message.channel.send({
    files: [{
      attachment: 'C:/Users/isidr/Desktop/cobalt/Images/CobaltThingsv2.png',
      name: 'people.png'
    }]
  })

let [culture, star, cross, people] = args;

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "user"
};

exports.help = {
  name: "medal",
  category: "Cobalt",
  description: "offical cobalt medals.",
  usage: "medal [name]"
};
