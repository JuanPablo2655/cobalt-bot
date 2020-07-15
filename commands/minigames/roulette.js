const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let lost = (Math.round(Math.random() * 6)) === 0;

        if (lost) {
            message.channel.send(":boom: :gun:\n`You Lost` :anguished:")
        } else {
            message.channel.send("\*click\* :gun:\n`You survived to the next round`")
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
    name: "roulette",
    description: "play russian roulette",
    usage: "roulette"
}