const Discord = require("discord.js");
let nations = require('../../models/nationstates.js');

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let [...nationName] = args;
        if (!nationName || !args[0]) {
            message.channel.send("I need a nation name")
        } else {
            nations.findOne({
                userID: message.author.id,
            }, (err, res) => {
                if (err) console.log(err)
                if (!res) {
                    const newNation = new nations({
                        username: message.author.username,
                        userID: message.author.id,
                        nation: nationName.join("_")
                    })
                    newNation.save().catch(e => cb(e))
                    message.channel.send("Your nation " + nationName.join(" ") + " is now linked up with your discord account.")
                } else {
                    res.nation = nationName.join("_")
                    res.username = message.author.username
                    res.save().catch(e => cb(e))
                    message.channel.send("Your discord account is now linked up with " + nationName.join(" "))
                }
            })
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
    name: "connect",
    description: "connect discord to nationstates",
    usage: "connect [nation]"
}