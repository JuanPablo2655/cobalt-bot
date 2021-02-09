const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        const fetch = require('node-fetch');
        const parseString = require('xml2js').parseString;
        let worldEmbed = new Discord.MessageEmbed();
        
        const worldInfo = async () => {
            const request = await fetch(`https://nationstates.net/cgi-bin/api.cgi?q=numregions+numnations+featuredregion`);
            const textToParse = await request.text();
            return new Promise((resolve, reject) => {
                parseString(textToParse, (err, obj) => {
                    if (err) return reject(err)
                    worldEmbed.setColor('RANDOM')
                        .setAuthor('World Statistics', cobalt.user.displayAvatarURL({format: 'png'}))
                        .setTitle('NationStates.net')
                        .setThumbnail(cobalt.user.displayAvatarURL({format: 'png'}))
                        .addField('Number of Regions', obj.WORLD.NUMREGIONS, true)
                        .addField('Number of Nations', obj.WORLD.NUMNATIONS, true)
                        .addField('Today\'s Featured Region', obj.WORLD.FEATUREDREGION)
                        .setFooter(`requested by: ${message.author.tag}`);
                    resolve(worldEmbed);
                });
            });
        }
        message.channel.send(await worldInfo())
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    ownerOnly: false,
    aliases: []
}

exports.help = {
    name: "world",
    description: "gets info about nationstates",
    usage: "world"
}