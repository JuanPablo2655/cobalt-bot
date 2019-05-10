const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args) => {
    var request = require('superagent');
    var parseString = require('xml2js').parseString;
    var xml2js = require('xml2js');

    let [...name] = args;

    const result = request.get(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${name.join("_")}&q=name+zombie+fullname+flag`)
    
    let zombie = new Discord.RichEmbed()

    result.then((res) => {
        parseString(res.text, (err, obj) => {
            zombie.setColor('RANDOM')
            .setAuthor(`${obj.NATION.NAME}`, `${obj.NATION.FLAG}`)
            .setTitle(`Zombie Info for ${obj.NATION.FULLNAME}`)
            .setThumbnail(`${obj.NATION.FLAG}`)
            .addField('Doing', `${obj.NATION.ZOMBIE[0].ZACTION}`)
            .addField('Survivors', `${obj.NATION.ZOMBIE[0].SURVIVORS}`  * 10000000, true)
            .addField('Zombies', `${obj.NATION.ZOMBIE[0].ZOMBIES}`  * 10000000, true)
            .addField('Dead', `${obj.NATION.ZOMBIE[0].DEAD}` * 10000000, true)
            message.channel.send(zombie);
        });
    }).catch((err) => {
        if (err) {
          message.channel.send("\:x: " +  "`" + "Error: Invalid Nation" + "`"); //checks to see if the nation exists
        }
      });
}

exports.conf = {
    aliases: ['zday', 'z-day']
}

exports.help = {
    name: "zombie",
    description: "get the zombie status",
    usage: "zombie [nation]"
}