const Discord = require("discord.js");
const superagent = require("superagent")

module.exports.run = async (cobalt, message, args) => {
    let msg = await message.channel.send("Generating...")
    let {body} = await superagent
    .get(`https://dog.ceo/api/breeds/image/random`)
    if(!{body}) return message.channel.send("I broke! Try again.")

    let memeEmbed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor("cute doggos", message.guild.iconURL)
        .setImage(body.message)
        .setTimestamp()
        .setFooter('I don\'t known what to put here', cobalt.user.displayAvatarURL);
    message.channel.send(memeEmbed);
    msg.delete();
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "dog",
    description: "cute dogs",
    usage: "dog"
}