const Discord = require("discord.js");
let links =  new Discord.RichEmbed()

module.exports.run = async (cobalt, message, args) => {
    let myRole = message.guild.roles.get("560956196371169281");
    let directors = myRole
    message.channel.send();
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "staff",
    description: "lists out staff",
    usage: "staff"
}