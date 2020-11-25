const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let snipe = cobalt.sniper.get(message.channel.id);

        if (snipe == undefined) {
            message.channel.send("There was no message to snipe. Try again when there\'s a message you missed before it go deleted.")
        } else {
            let embed = new Discord.MessageEmbed()
                .setDescription(snipe.message)
                .setAuthor(snipe.author, snipe.avatar)
                .setTimestamp()
                .setColor('RANDOM')
            message.channel.send(embed)

            cobalt.sniper.delete(message.channel.id)
        }
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    ownerOnly: false,
    aliases: []
}

exports.help = {
    name: "snipe",
    description: "Snipes the previous message",
    usage: "snipe"
}