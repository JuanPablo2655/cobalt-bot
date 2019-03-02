const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args) => {
    const description = args.join(' ');
    if (args == "add") {
        let add = new Discord.RichEmbed()
            .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL}`)
            .setTitle(`${message.author.username} request`)
            .setThumbnail(`${message.author.displayAvatarURL}`)
            .addField('Description', `${description.join(" ")}`)
            .setColor('RANDOM')
            .setFooter('1');
        message.channel.send(add);
    } else if (args == "done") {
        message.channel.send("done test");
    } else if (args == "remove") {
        message.channel.send("remove test");
    } else if (!args[0]) {
        message.channel.send("Error: args missing `add|done|remove`");
    }
}

exports.conf = {
    aliases: ['request']
}

exports.help = {
    name: "request",
    description: "request art from these talented members",
    usage: "New: request [add|done|remove] [description]\nEdit: request [done|remove] [id] [description]"
}