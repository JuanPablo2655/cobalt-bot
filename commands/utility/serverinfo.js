const Discord = require('discord.js');
const { DateTime } = require('luxon');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        addCD();
        let server = message.guild;
        let created = DateTime.fromISO(server.createdAt.toISOString())
            .setZone('America/New_York')
            .toLocaleString(DateTime.DATETIME_MED);
        let online = message.guild.members.cache.filter(m => m.user.presence.status == 'online').size;
        let offline = message.guild.members.cache.filter(m => m.user.presence.status == 'offline').size;
        let idle = message.guild.members.cache.filter(m => m.user.presence.status == 'idle').size;
        let dnd = message.guild.members.cache.filter(m => m.user.presence.status == 'dnd').size;

        let serverinfo = new Discord.MessageEmbed()
            .setAuthor({ name: `${server.name}`, iconURL: server.iconURL({ format: 'png' }) })
            .setTitle('ServerInfo')
            .addField('Owner', `${server.owner}`, true)
            .setThumbnail(`${server.iconURL({ format: 'png' })}`)
            .addField('Region', `${server.region}`, true)
            .addField('Created at', `${created}`, true)
            .addField('Member count', `${server.memberCount}`, true)
            .addField('Online', online, true)
            .addField('Offline', offline, true)
            .addField('Idle', idle, true)
            .addField('DND', dnd, true)
            .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: server.iconURL({ format: 'png' }) })
            .setTimestamp()
            .setColor('RANDOM');
        message.channel.send({ embeds: [serverinfo] });
    } catch (e) {
        cb(e);
    }
};

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 1,
    aliases: [],
};

exports.help = {
    name: 'serverinfo',
    description: 'get the serverinfo',
    usage: 'serverinfo',
};
