exports.run = async (client, message, args, level) => {
  const Discord = require("discord.js");
  const embed = new Discord.RichEmbed()

  var request = require('superagent');
  var parseString = require('xml2js').parseString;
  var xml2js = require('xml2js');

  const result = request.get(`https://nationstates.net/cgi-bin/api.cgi?q=numregions+numnations+featuredregion`);
  result.then((res) => {
    parseString(res.text, (err, obj) => {
      embed.setColor('RANDOM')
        .setAuthor('World Statistics', client.user.displayAvatarURL)
        .setTitle('NationStates.net')

        .setThumbnail(client.user.displayAvatarURL)
        .addField('Number of Regions', obj.WORLD.NUMREGIONS, true)
        .addField('Number of Nations', obj.WORLD.NUMNATIONS, true)
        .addField('Today\'s Featured Region', obj.WORLD.FEATUREDREGION)
        .setFooter(`requested by: ${message.author.tag}`)
      message.channel.send({embed});
    })
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "world",
  category: "NationStates",
  description: "Gets info about NationStates",
  usage: "world"
};
