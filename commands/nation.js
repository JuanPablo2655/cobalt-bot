exports.run = async (client, message, args, level) => {
  const Discord = require("discord.js");
  const embed = new Discord.RichEmbed()

  var request = require('superagent');
  var parseString = require('xml2js').parseString;
  var xml2js = require('xml2js');

  //var first = args.text.split(" ");
  //const name = join("_");
  let [...name] = args;

  const result = request.get(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${name.join("_")}&q=name+gdp+population+currency+animal+region+wa+flag+fullname+motto+influence+census;mode=score;scale=66`);

  result.then((res) => {
    parseString(res.text, (err, obj) => {
      embed.setColor('RANDOM')
        .setAuthor(`${obj.NATION.NAME}`, `${obj.NATION.FLAG}`)
        .setTitle(`Nation Info for ${obj.NATION.FULLNAME}`)
        .setDescription(`${obj.NATION.MOTTO}`)
        .setThumbnail(`${obj.NATION.FLAG}`)
        .addField('Region', obj.NATION.REGION, true)
        .addField('Influence', obj.NATION.INFLUENCE, true)
        .addField('Population', obj.NATION.POPULATION * 10000000, true)
        .addField('Economy', "$" + obj.NATION.GDP, true)
        .addField('Currency', `${obj.NATION.CURRENCY}`, true)
        .addField('Animal', `${obj.NATION.ANIMAL}`, true)
        .addField('WA Status?', obj.NATION.UNSTATUS, true)
        .addField('Endorsement Count', Math.round(obj.NATION.CENSUS[0].SCALE[0].SCORE), true)
        .addField('Link', `http://www.nationstates.net/nation=${name.join("_")}`)
        .setFooter(`requested by: ${message.author.tag}`)
      message.channel.send({embed});

    });
  })
    .catch((err) => {
      if (err) {
        message.channel.send("\:x: " +  "`" + "Error: Invalid Nation" + "`"); //checks to see if the nation exists
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
  name: "nation",
  category: "NationStates",
  description: "search nations in nationStates",
  usage: "nation [name]"
};
