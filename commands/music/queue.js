const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        const serverQueue = message.cobalt.queue.get(message.guild.id)
        if (!serverQueue) return message.reply("There is nothing playing.").catch(err => cb(err))
        return message.reply(`📃 **Song queue**
    ${serverQueue.songs.map((song, index) => (index + 1) + ". " + song.title).join('\n')}
    Now playing: **${serverQueue.songs[0].title}**
            `, { split: true }).catch(err => cb(err))
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    aliases: []
}

exports.help = {
    name: "queue",
    description: "Show the music queue and now playing",
    usage: "queue"
}