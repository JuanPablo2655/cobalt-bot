const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        if (!args.length) return message.reply("Usage: cn!remove [Queue Number]")
        const serverQueue = message.cobalt.queue.get(message.guild.id)
        if (!serverQueue) return message.channel.send("There is no queue.").catch(err => cb(err))

        const song = serverQueue.songs.splice((args[0] - 1), 1)
        serverQueue.textChannel.send(`${message.author} ❌ removed **${song[0].title}** from the queue.`)
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    aliases: []
}

exports.help = {
    name: "remove",
    description: "Remove song from the queue",
    usage: "remove [Queue Number]"
}