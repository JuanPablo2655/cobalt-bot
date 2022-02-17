const Discord = require('discord.js');
const { DateTime } = require('luxon');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        addCD();
        let userboi = cobalt.users.cache.get(args[0]) || message.mentions.users.last();
        if (!userboi) {
            userboi = message.author;
        }
        let memberboi = await message.guild.members.fetch(userboi);
        let created = DateTime.fromISO(userboi.createdAt.toISOString())
            .setZone('America/New_York')
            .toLocaleString(DateTime.DATETIME_MED);
        let joined = DateTime.fromISO(memberboi.joinedAt.toISOString())
            .setZone('America/New_York')
            .toLocaleString(DateTime.DATETIME_MED);
        let game = memberboi.presence?.game ? userboi.presence.game.name : 'None';
        let nickname = !memberboi.nickname ? 'None' : memberboi.nickname;
        let avatar = userboi.displayAvatarURL({ format: 'png' });
        let userid = userboi.id;
        let tag = userboi.tag;
        let isBot = userboi.bot ? 'Yes' : 'No';
        let status = '';
        if (memberboi.presence?.status === 'online') {
            status = 'Online';
        } else if (memberboi.presence?.status === 'offline') {
            status = 'Offline';
        } else if (memberboi.presence?.status === 'idle') {
            status = 'Idle';
        } else if (memberboi.presence?.status === 'dnd') {
            status = 'Do not disturb';
        }
        let server = message.guild;
        let userinfo = new Discord.MessageEmbed()
            .setTitle('Userinfo | ' + userboi.username)
            .setAuthor({ name: `${server.name}`, iconURL: server.iconURL({ format: 'png', dynamic: true }) })
            .setThumbnail(avatar)
            .setDescription(`[Click Avatar Link](${avatar})`)
            .addField('ID', `${userid}`, true)
            .addField('Tag', `${tag}`, true)
            .addField('status', `${status}`, true)
            .addField('Current game', `${game}`, true)
            .addField('Bot?', `${isBot}`, true)
            .addField('Created at', `${created}`, true)
            .addField('Joined server at', `${joined}`, true)
            .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: avatar })
            .setTimestamp()
            .setColor('RANDOM');
        message.channel.send({ embeds: [userinfo] });
    } catch (e) {
        cb(e);
    }
};

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 2,
    aliases: [],
};

exports.help = {
    name: 'userinfo',
    description: 'Displays info about a user',
    usage: 'userinfo [user]',
};
