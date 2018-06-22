exports.run = async (client, message, args, level) => {
  const Discord = require("discord.js");
  const embed = new Discord.RichEmbed()

  var request = require('superagent');
  var parseString = require('xml2js').parseString;
  var xml2js = require('xml2js');

  let [...name] = args;

  const result = request.get(`https://nationstates.net/cgi-bin/api.cgi?nation=${name.join("_")}&q=name+govtpriority+income+lastactivity+leader+tax+capital+category+flag+fullname+majorindustry`);
result.then((res) => {
    parseString(res.text, (err, obj) => {
      embed.setColor('RANDOM')
        .setAuthor(`${obj.NATION.NAME}`, `${obj.NATION.FLAG}`)
        .setTitle('More Nation Stats')
        .setDescription(`${obj.NATION.FULLNAME}`)
        .setThumbnail(`${obj.NATION.FLAG}`)
        .addField('Category', obj.NATION.CATEGORY, true)
        .addField('Government Priority', obj.NATION.GOVTPRIORITY, true)
        .addField('Major Industry', obj.NATION.MAJORINDUSTRY, true)
        .addField('Leader', obj.NATION.LEADER, true)
        .addField('Capital', obj.NATION.CAPITAL, true)
        .addField('Tax', obj.NATION.TAX, true)
        .addField('Average Income', obj.NATION.INCOME, true)
        .addField('Last Activity', obj.NATION.LASTACTIVITY, true)
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
  name: "more",
  category: "NationStates",
  description: "search more in said nation in nationStates",
  usage: "more [name]"
};
