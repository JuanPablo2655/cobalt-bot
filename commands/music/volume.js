const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        const serverQueue = message.cobalt.queue.get(message.guild.id)

        if (!message.member.voice.channel) return message.reply("You need to join a voice channel first!").catch(err => cb(err))
        if (!serverQueue) return message.reply("There is nothing playing.").catch(err => cb(err))

        if (!args[0]) return message.reply(`🔊 The current volume is: **${serverQueue.volume}%**`).catch(err => cb(err))
        if (isNaN(args[0])) return message.reply("Please use a number to set volume.").catch(err => cb(err))
        if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0) return message.reply("Please use a number between 0 - 100.").catch(err => cb(err))

        serverQueue.volume = args[0]
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100)

        return serverQueue.textChannel.send(`Volume set to: **${args[0]}%**`).catch(err => cb(err))
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    aliases: []
}

exports.help = {
    name: "volume",
    description: "Change volume of currentply playing voiceConnection",
    usage: "volume [NUM 0-100]"
}