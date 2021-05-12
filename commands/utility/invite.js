const { MessageEmbed } = require("discord.js");

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        addCD();
        let link = 'https://discord.com/oauth2/authorize?client_id=359869454257094668&scope=bot&permissions=1007152246'
        let inviteEmbed = new MessageEmbed()
            .setDescription(`Want to invite me to your cobalt sponsored server?\n[Invite me now!](${link})`)
        message.channel.send(inviteEmbed)
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 1,
    aliases: []
}

exports.help = {
    name: "invite",
    description: "invite the bot to your cobalt sponsored server",
    usage: "invite"
}