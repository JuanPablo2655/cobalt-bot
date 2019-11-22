const Discord = require("discord.js");
const moment = require('moment');

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let server = message.guild;
        let created = moment(server.createdAt).format('MMMM Do YYYY, h:mm:ss a');
        let online = message.guild.members.filter(m => m.user.presence.status == "online").size
        let offline = message.guild.members.filter(m => m.user.presence.status == "offline").size
        let idle = message.guild.members.filter(m => m.user.presence.status == "idle").size
        let dnd = message.guild.members.filter(m => m.user.presence.status == "dnd").size

        let serverinfo = new Discord.RichEmbed()
            .setAuthor(`${server.name}`, `${server.iconURL}`)
            .setTitle('ServerInfo')
            .addField('Owner', `${server.owner}`, true)
            .setThumbnail(`${server.iconURL}`)
            .addField('Region', `${server.region}`, true)
            .addField('Created at', `${created}`, true)
            .addField('Member count', `${server.memberCount}`, true)
            .addField('Online', online, true)
            .addField('Offline', offline, true)
            .addField('Idle', idle, true)
            .addField('DND', dnd, true)
            .setFooter(`Requested by ${message.author.tag}`, `${server.iconURL}`)
            .setTimestamp()
            .setColor('RANDOM');
        message.channel.send(serverinfo);
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    aliases: []
}

exports.help = {
    name: "serverinfo",
    description: "get the serverinfo",
    usage: "serverinfo"
}