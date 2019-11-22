const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        const serverQueue = message.cobalt.queue.get(message.guild.id)

        if (!message.member.voice.channel) return message.reply("You need to join a voice channel first!").catch(err => cb(err))

        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true
            serverQueue.connection.dispatcher.resume()
            return serverQueue.textChannel.send(`${message.author} ▶ resumed the music!`).catch(err => cb(err))
        }
        return message.reply("There is nothing playing.").catch(err => cb(err))
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    aliases: []
}

exports.help = {
    name: "resume",
    description: "Resume currently playing music",
    usage: "resume"
}