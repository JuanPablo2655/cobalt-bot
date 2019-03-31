const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args) => {
    message.channel.send("**Map generator**: https://azgaar.github.io/Fantasy-Map-Generator/\n**Name generator**: https://www.fantasynamegenerators.com/\n**List of countries by past and future population**: https://en.wikipedia.org/wiki/List_of_countries_by_past_and_future_population_(United_Nations)\n**TOASTER**: https://cdn.discordapp.com/attachments/321447823004532736/321799193138298891/TOASTER.png\n**Empty map**: https://cdn.discordapp.com/attachments/459906074137460736/535646111751471115/i5eo6hu.png")
}

exports.conf = {
    aliases: ['r']
}

exports.help = {
    name: "resources",
    description: "RP resources",
    usage: "resources"
}