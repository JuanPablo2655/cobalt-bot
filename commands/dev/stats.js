const { version } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { Duration } = require('luxon');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        let uptime = Duration.fromMillis(cobalt.uptime).toFormat('dd:hh:mm:ss');
        if (!args[0]) {
            let stats = new MessageEmbed()
                .setTitle('Stats')
                .addField('Mem Usage', (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB')
                .addField('Uptime', uptime)
                .addField('Discord.js', 'v' + version)
                .addField('Node', process.version)
                .addField('Ping', cobalt.ws.ping + 'ms');
            message.channel.send({ embeds: [stats] });
        } else if ((args[0] = uptime)) {
            let ut = new MessageEmbed().setTitle('Stats').addField('Uptime', uptime);
            message.channel.send({ embeds: [ut] });
        }
    } catch (e) {
        cb(e);
    }
};

exports.conf = {
    enabled: true,
    ownerOnly: true,
    cooldown: 1,
    aliases: ['status'],
};

exports.help = {
    name: 'stats',
    description: 'shows stats about the bot',
    usage: 'stats [uptime]',
};
