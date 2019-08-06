const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args) => {
    let resEmbed = new Discord.RichEmbed()
        .setTitle("RP resources")
        .addField('Map Generator', 'https://azgaar.github.io/Fantasy-Map-Generator/')
        .addField('Name generator', 'https://www.fantasynamegenerators.com/')
        .addField('List of countries by past and future population', 'https://en.wikipedia.org/wiki/List_of_countries_by_past_and_future_population_\(United_Nations\)')
        .addField('TOASTER', 'https://cdn.discordapp.com/attachments/321447823004532736/321799193138298891/TOASTER.png')
        .addField('Empty map', 'https://cdn.discordapp.com/attachments/459906074137460736/535646111751471115/i5eo6hu.png')
        .setColor('RANDOM')
        .setFooter('Send Juan Pablo any resources you want to add to the list')
    message.channel.send(resEmbed)
}

exports.conf = {
    enabled: true,
    aliases: ['r']
}

exports.help = {
    name: "resources",
    description: "RP resources",
    usage: "resources"
}