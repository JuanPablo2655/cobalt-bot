const Discord = require("discord.js");
let nations = require('../model/nations.js');

module.exports.run = async (cobalt, message, args) => {
    let [...nationName] = args;
    if (!nationName || !args[0]) {
        return message.channel.send('Give me your nation name REEEE')
    } else {
        nations.findOne({
            userID: message.author.id,
            nation: nationName.join("_")
        }, (err, res) => {
            if (err) console.log(err);
            if (!res) {
                const newNation = new nations({
                    userID: message.author.id,
                    nation: nationName.join("_")
                })
                newNation.save().catch(err => console.log(err))
                message.channel.send("your discord ID is now connected to " + nationName.join(" "))
            } else {
                res.nation = res.nation.update({
                    nation: nationName.join("_")
                })
                message.channel.send("your discord ID has been updated to " + nationName.join(" "))
            }
        })
    }
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "connect",
    description: "connect your nationstates nation with discord",
    usage: "connect"
}