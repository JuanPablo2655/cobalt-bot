exports.run = async (client, message, args, level) => {
  const Discord = require("discord.js");
  const embed = new Discord.RichEmbed()

  var request = require('superagent');
  var parseString = require('xml2js').parseString;
  var xml2js = require('xml2js');

  let [...name] = args;

  const result = request.get(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${name.join("_")}&q=govt+name+flag+fullname`);

  result.then((res) => {
    parseString(res.text, (err, obj) => {
      console.log(obj);
      embed.setColor('RANDOM')
        .setAuthor(`${obj.NATION.NAME}`, `${obj.NATION.FLAG}`)
        .setTitle(`Government Info for ${obj.NATION.NAME}`)
        .setDescription(obj.NATION.FULLNAME)
        .setThumbnail(`${obj.NATION.FLAG}`)
        .addField('Administration', obj.NATION.GOVT[0].ADMINISTRATION + "%", true)
        .addField('Defense', obj.NATION.GOVT[0].DEFENCE + "%", true)
        .addField('Education', obj.NATION.GOVT[0].EDUCATION + "%", true)
        .addField('Environment', obj.NATION.GOVT[0].ENVIRONMENT + "%", true)
        .addField('Healthcare', obj.NATION.GOVT[0].HEALTHCARE + "%", true)
        .addField('Commerce', obj.NATION.GOVT[0].COMMERCE + "%", true)
        .addField('International Aid', obj.NATION.GOVT[0].INTERNATIONALAID + "%", true)
        .addField('Law and Order', obj.NATION.GOVT[0].LAWANDORDER + "%", true)
        .addField('Public Transport', obj.NATION.GOVT[0].PUBLICTRANSPORT + "%", true)
        .addField('Social Equality', obj.NATION.GOVT[0].SOCIALEQUALITY + "%", true)
        .addField('Spirituality', obj.NATION.GOVT[0].SPIRITUALITY + "%", true)
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
  name: "govt",
  category: "NationStates",
  description: "search for the government in said nation in nationStates",
  usage: "govt [name]"
};
