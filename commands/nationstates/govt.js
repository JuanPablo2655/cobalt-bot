const Discord = require("discord.js");
let nations = require('../../models/nationstates.js');

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        const fetch = require('node-fetch');
        const parseString = require('xml2js').parseString;
        let [...name] = args;
        let govtEmbed = new Discord.MessageEmbed();

        const govtInfo = async (nation) => {
            const request = await fetch(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${nation}&q=govt+name+flag+fullname`);
            const textToParse = await request.text();
            return new Promise((resolve, reject) => {
                parseString(textToParse, (err, obj) => {
                    if (err) return reject(err)
                    govtEmbed.setColor('RANDOM')
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
                    resolve(govtEmbed);
                });
            });
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
                    return message.channel.send(await govtInfo(nationName));
                }
            })
        } else {
            var nationName = name.join("_").toLowerCase();
            return message.channel.send(await govtInfo(nationName));
        }
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 3,
    aliases: []
}

exports.help = {
    name: "govt",
    description: "get government info",
    usage: "govt [nation]"
}