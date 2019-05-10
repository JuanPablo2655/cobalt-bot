const Discord = require("discord.js");
const world = new Discord.RichEmbed()

module.exports.run = async (cobalt, message, args) => {
    var request = require('superagent');
    var parseString = require('xml2js').parseString;
    var xml2js = require('xml2js');

    const result = request.get(`https://nationstates.net/cgi-bin/api.cgi?q=numregions+numnations+featuredregion`);
    result.then((res) => {
        parseString(res.text, (err, obj) => {
        world.setColor('RANDOM')
            .setAuthor('World Statistics', cobalt.user.displayAvatarURL)
            .setTitle('NationStates.net')
            .setThumbnail(cobalt.user.displayAvatarURL)
            .addField('Number of Regions', obj.WORLD.NUMREGIONS, true)
            .addField('Number of Nations', obj.WORLD.NUMNATIONS, true)
            .addField('Today\'s Featured Region', obj.WORLD.FEATUREDREGION)
            .setFooter(`requested by: ${message.author.tag}`);
        message.channel.send(world);
        });
    });
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "world",
    description: "Gets info about nationstates",
    usage: "world"
}