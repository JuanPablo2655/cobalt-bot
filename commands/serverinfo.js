const Discord = require("discord.js");
const moment = require('moment');

module.exports.run = async (cobalt, message, args) => {
    let server = message.guild;
    let created = moment(server.createdAt).format('MMMM Do YYYY, h:mm:ss a');
    let serverinfo = new Discord.RichEmbed()
        .setAuthor(`${server.name}`, `${server.iconURL}`)
        .setTitle('ServerInfo')
        .addField('Owner', `${server.owner}`, true)
        .setThumbnail(`${server.iconURL}`)
        .addField('Region', `${server.region}`, true)
        .addField('Created at', `${created}`, true)
        .addField('Member count', `${server.memberCount}`, true)
        .setFooter(`Requested by ${message.author.tag}`, `${server.iconURL}`)
        .setTimestamp()
        .setColor('RANDOM');
        message.channel.send(serverinfo);
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "serverinfo",
    description: "get the serverinfo",
    usage: "serverinfo"
}