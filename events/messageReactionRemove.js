const Discord = require("discord.js");

module.exports = async (cobalt, data, user) => {
    let message = data.message;
    let emojiID = data.emoji.id
    let emojiName = data.emoji.name
    let emoji = cobalt.emojis.get(emojiID);
    var channel = cobalt.channels.get('405158191324987393');

    if (user.id == cobalt.user.id) return

    if (message.author.id == cobalt.user.id) return

    let reactionEmbed = new Discord.RichEmbed()
        .setColor('#00a1ff')
        .setTimestamp()
        .setAuthor(user.username, user.displayAvatarURL)
        .setTitle('Reaction removed')
        .addField('Message', message)
        .setFooter("Message ID: "+message.id);
    
    if (emoji == undefined) {
        reactionEmbed.addField('Reaction', emojiName)
    } else {
        reactionEmbed.addField('Reaction', emoji)
    }
    channel.send(reactionEmbed)
}