const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        if (!message.member.voice.channel) return message.reply("You need to join a voice channel first!").catch(err => cb(err));

        const serverQueue = message.client.queue.get(message.guild.id)
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false
            serverQueue.connection.dispatcher.pause()
            return serverQueue.textChannel.send(`${message.author} ⏸ paused the music.`).catch(err => cb(err));
        }
        return message.reply("There is nothing playing.").catch(err => cb(err));
    } catch (e) {

    }
}

exports.conf = {
    enabled: true,
    aliases: []
}

exports.help = {
    name: "pause",
    description: "Pause the currently playing music",
    usage: "pause"
}