const Discord = require("discord.js");
let nations = require('../../models/nationstates.js');

module.exports.run = async (cobalt, message, args) => {
    const fetch = require('node-fetch');
    const parseString = require('xml2js').parseString;
    const xml2js = require('xml2js');
    let [...name] = args;

    const nationInfo = async function(nation) {
        let nationEmbed = new Discord.RichEmbed();
        const request = await fetch(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${nation}&q=name+gdp+population+currency+animal+region+wa+flag+fullname+motto+influence+census;mode=score;scale=66`)
            console.log(request)
            const textToParse = await request.text();
            parseString(textToParse, (err, obj) => {
                if (err) console.log(err)
                nationEmbed.setColor('RANDOM')
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
                .addField('Link', `http://www.nationstates.net/nation=${nation}`)
                .setFooter(`requested by: ${message.author.tag}`);
            return nationEmbed
            })
        }

    if(!name || !args[0]) {
        nations.findOne({
            userID: message.author.id,
        }, (err, res) => {
            if (err) console.log(err)
            if (!res) {
                message.channel.send("Please connect nationstates or define the nation");
            } else {
                var nationName = res.nation.toLowerCase();
                message.channel.send(nationName);
                message.channel.send(nationInfo(nationName));
                console.log("nation Info\n--------\n"+nationInfo(nationName))
            }
        })
    } else {
        var nationName = name.join("_").toLowerCase();
        message.channel.send(nationName);
        message.channel.send(nationInfo(nationName));
        console.log("nation Info\n--------\n"+nationInfo(nationName))
    }
}

exports.conf = {
    enabled: false,
    aliases: []
}

exports.help = {
    name: "nation",
    description: "search nations in nationstates",
    usage: "nation [name]"
}