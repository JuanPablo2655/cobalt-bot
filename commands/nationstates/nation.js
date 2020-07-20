const Discord = require("discord.js");
let nations = require('../../models/nationstates.js');

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        const fetch = require('node-fetch');
        const parseString = require('xml2js').parseString;
        let [...name] = args;
        let nationEmbed = new Discord.RichEmbed();

        const nationInfo = async (nation) => {
            const request = await fetch(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${nation}&q=name+gdp+population+category+currency+region+wa+flag+fullname+motto+influence+founded+lastactivity+demonym`)
            const textToParse = await request.text();
            console.log(textToParse)
            return new Promise((resolve, reject) => {
                parseString(textToParse, (err, obj) => {
                    if (err) return reject(err)
                    nationEmbed.setColor('RANDOM')
                        .setAuthor(`${obj.NATION.NAME}`, `${obj.NATION.FLAG}`)
                        .setTitle(`Nation Info for ${obj.NATION.FULLNAME}`)
                        .setDescription(`${obj.NATION.CATEGORY}`)
                        .setThumbnail(`${obj.NATION.FLAG}`)
                        .addField('Region', obj.NATION.REGION, true)
                        .addField('Last Active', obj.NATION.LASTACTIVITY, true)
                        .addField('Founded', obj.NATION.FOUNDED, true)
                        .addField('Motto', obj.NATION.MOTTO, true)
                        .addField('Influence', obj.NATION.INFLUENCE, true)
                        .addField('Population', `${obj.NATION.POPULATION} ${obj.NATION.DEMONYM}`, true)
                        .addField('Economy', `$${obj.NATION.GDP} ${obj.NATION.CURRENCY}`, true)
                        .addField('WA Status', obj.NATION.UNSTATUS, true)
                        .addField('Link', `http://www.nationstates.net/nation=${nation}`, true)
                        .setFooter(`requested by: ${message.author.tag}`);
                    resolve(nationEmbed)
                })
            })
        }

        if (!args[0]) {
            nations.findOne({
                userID: message.author.id,
            }, async (err, res) => {
                if (err) cb(err)
                if (!res) {
                    message.channel.send("Please connect nationstates or define the nation");
                } else {
                    var nationName = res.nation.toLowerCase();
                    return message.channel.send(await nationInfo(nationName));
                }
            })
        } else {
            var nationName = name.join("_").toLowerCase();
            return message.channel.send(await nationInfo(nationName));
        }
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
    name: "nation",
    description: "search nations in nationstates",
    usage: "nation [name]"
}