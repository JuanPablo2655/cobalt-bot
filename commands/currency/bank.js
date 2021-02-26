const Discord = require("discord.js");
let currency = require('../../models/currency');

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        return
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: false,
    ownerOnly: false,
    cooldown: 1,
    aliases: []
}

exports.help = {
    name: "bank",
    description: "withdraw or deposit on the bank",
    usage: "bank [deposit|withdraw] [amount]"
}