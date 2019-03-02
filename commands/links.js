const Discord = require("discord.js");
let links =  new Discord.RichEmbed()

module.exports.run = async (cobalt, message, args) => {
    links.setTitle("Links")
        .addField('Nationstates', '[here](https://www.nationstates.net/region=cobalt_network)', true)
        .addField('Github link', '[here](https://github.com/JuanPablo2655/Cobalt)', true)
        .setFooter(`Requested by: ${message.author.tag}`)
        .setColor('RANDOM');
    message.channel.send(links)
}

exports.conf = {
    aliases: ['links', 'link']
}

exports.help = {
    name: "links",
    description: "Give you links",
    usage: "links"
}