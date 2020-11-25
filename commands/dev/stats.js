const {
    version
} = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let uptime = moment.duration(cobalt.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        if (!args[0]) {
            let stats = new Discord.MessageEmbed()
                .setTitle("Stats")
                .addField("Mem Usage", ((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)) + "MB")
                .addField("Uptime", uptime)
                .addField("Discord.js", "v" + version)
                .addField("Node", process.version)
                .addField("Ping", cobalt.ws.ping + "ms");
            message.channel.send(stats)
        } else if (args[0] = uptime) {
            let ut = new Discord.MessageEmbed()
                .setTitle('Stats')
                .addField("Uptime", uptime);
            message.channel.send(ut)
        }
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    ownerOnly: true,
    aliases: []
}

exports.help = {
    name: "stats",
    description: "shows stats about the bot",
    usage: "stats"
}