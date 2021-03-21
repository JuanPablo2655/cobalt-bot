const Discord = require("discord.js");

module.exports = async (cobalt, oldState, newState) => {
    var channel = oldState.guild.channels.cache.find(channel => channel.name === "record");
    let avatar = newState.member.user.displayAvatarURL({format: 'png'});

    let newUserChannelID = newState.channelID;
    let oldUserChannelID = oldState.channelID;
    let newUserChannel = await cobalt.channels.cache.get(newUserChannelID)
    let oldUserChannel = await cobalt.channels.cache.get(oldUserChannelID)

    let voiceEmbed = new Discord.MessageEmbed()
        .setColor('#00a1ff')
        .setTimestamp()
        .setAuthor(newState.member.user.username, avatar)
        .setFooter("User ID: "+newState.member.user.id);

    if (oldUserChannelID === null && newUserChannelID !== null) {
        voiceEmbed.setTitle('User Joined')
        voiceEmbed.addField('Channel', newUserChannel.name)
        channel.send(voiceEmbed)
    } else if (newUserChannelID === null) {
        voiceEmbed.setTitle('User left')
        voiceEmbed.addField('Channel', oldUserChannel.name)
        channel.send(voiceEmbed)
    } else if (oldUserChannelID != null && newUserChannelID != null) {
        if (oldUserChannelID == newUserChannelID) return
        voiceEmbed.setTitle('User switched')
        voiceEmbed.addField('From', oldUserChannel.name, true)
        voiceEmbed.addField('To', newUserChannel.name, true)
        channel.send(voiceEmbed)
    }
}