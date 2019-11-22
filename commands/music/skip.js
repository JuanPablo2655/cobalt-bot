const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        const serverQueue = message.cobalt.queue.get(message.guild.id)
    
        if (!message.member.voice.channel) return message.reply("You need to join a voice channel first!").catch(err => cb(err))
        if (!serverQueue) return message.channel.send("There is nothing playing that I could skip for you.").catch(err => cb(err))
    
        serverQueue.connection.dispatcher.end()
        serverQueue.textChannel.send(`${message.author} ⏭ skipped the song`).catch(err => cb(err))
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    aliases: []
}

exports.help = {
    name: "skip",
    description: "Skip the currently playing song",
    usage: "skip"
}