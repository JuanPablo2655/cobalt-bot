exports.run = async (client, message, args, level) => {
  const Discord = require("discord.js");
  const embed = new Discord.RichEmbed()

  var request = require('superagent');
  var parseString = require('xml2js').parseString;
  var xml2js = require('xml2js');

  let [...name] = args;

  const result = request.get(`https://nationstates.net/cgi-bin/api.cgi?region=${name.join("_")}&q=founder+name+numnations+power+tags+flag+delegate`);
  result.then((res) => {
    parseString(res.text, (err, obj) => {
      embed.setColor('RANDOM')
        .setAuthor(obj.REGION.NAME, `${obj.REGION.FLAG}`)
        .setTitle(`Region Info for ${obj.REGION.NAME}`)

        .setThumbnail(`${obj.REGION.FLAG}`)
        .addField(`Founder`, obj.REGION.FOUNDER, true)
        .addField(`Number of Nations`, obj.REGION.NUMNATIONS, true)
        .addField(`Power`, obj.REGION.POWER, true)
        .addField(`WA Delegate`, obj.REGION.DELEGATE, true)
        .addField(`Link`, `https://www.nationstates.net/region=${name.join("_")}`)
        .setFooter(`Tags: ${obj.REGION.TAGS[0].TAG}`)

      message.channel.send({embed});
    });
  })
    .catch((err) => {
      if (err) {
        message.channel.send("\:x: " +  "`" + "Error: Invalid Region" + "`"); //checks to see if the nation exists
      }
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "region",
  category: "NationStates",
  description: "search regions in nationStates",
  usage: "region [name]"
};
