const Discord = require("discord.js");
const moment = require('moment');

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let userboi = cobalt.users.get(args[0]) || message.mentions.users.last();
        if (!userboi) {
            userboi = message.author;
        }
        let memberboi = await message.guild.fetchMember(userboi);
        let created = moment(userboi.createdAt).format('MMMM Do YYYY, h:mm:ss a');
        let joined = moment(memberboi.joinedAt).format('MMMM Do YYYY, h:mm:ss a');
        let game = userboi.presence.game ? userboi.presence.game.name : 'None';
        let nickname = !memberboi.nickname ? 'None' : memberboi.nickname;
        let avatar = userboi.displayAvatarURL;
        let userid = userboi.id;
        let tag = userboi.tag
        let isBot = userboi.bot ? 'Yes' : 'No';
        let status = '';
        if (userboi.presence.status === 'online') {
            status = 'Online';
        } else if (userboi.presence.status === 'offline') {
            status = 'Offline';
        } else if (userboi.presence.status === 'idle') {
            status = 'Idle';
        } else if (userboi.presence.status === 'dnd') {
            status = 'Do not disturb';
        }
        let server = message.guild;
        let userinfo = new Discord.RichEmbed()
            .setTitle('Userinfo | ' + userboi.username)
            .setAuthor(`${server.name}`, `${server.iconURL}`)
            .setThumbnail(avatar)
            .setDescription(`[Click Avatar Link](${avatar})`)
            .addField('ID', `${userid}`, true)
            .addField('Tag', `${tag}`, true)
            .addField('status', `${status}`, true)
            .addField('Current game', `${game}`, true)
            .addField('Bot?', `${isBot}`, true)
            .addField('Created at', `${created}`, true)
            .addField('Joined server at', `${joined}`, true)
            .setFooter(`Requested by ${message.author.tag}`, `${avatar}`)
            .setTimestamp()
            .setColor('RANDOM');
        message.channel.send(userinfo)
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    aliases: []
}

exports.help = {
    name: "userinfo",
    description: "Displays info about a user",
    usage: "userinfo [user]"
}