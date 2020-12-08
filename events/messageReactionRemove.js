const Discord = require("discord.js");

module.exports = async (cobalt, reaction, user) => {
    if(user.partial) await user.fetch();
    if(reaction.partial) await reaction.fetch();
    if(reaction.message.partial) await reaction.message.fetch();
    
    let message = reaction.message;
    let emojiID = reaction.emoji.id
    let emojiName = reaction.emoji.name
    let emoji = cobalt.emojis.cache.get(emojiID);
    var channel = cobalt.channels.cache.get('405158191324987393');

    if (user.id == cobalt.user.id) return

    if (message.author.id == cobalt.user.id) return

    let reactionEmbed = new Discord.MessageEmbed()
        .setColor('#00a1ff')
        .setTimestamp()
        .setAuthor(user.username, user.displayAvatarURL({format: 'png'}))
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