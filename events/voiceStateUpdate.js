const Discord = require("discord.js");

module.exports = (cobalt, oldMember, newMember) => {
    var channel = cobalt.channels.get('405158191324987393');
    let avatar = newMember.user.displayAvatarURL;

    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;

    let voiceEmbed = new Discord.RichEmbed()
        .setColor('#00a1ff')
        .setTimestamp()
        .setAuthor(newMember.user.username, avatar);

    if (oldUserChannel === undefined && newUserChannel !== undefined) {
        voiceEmbed.setTitle('User Joined')
        voiceEmbed.addField('Channel', newUserChannel.name)
        channel.send(voiceEmbed)
    } else if (newUserChannel === undefined) {
        voiceEmbed.setTitle('User left')
        voiceEmbed.addField('Channel', oldUserChannel.name)
        channel.send(voiceEmbed)
    } else if (oldUserChannel != undefined && newUserChannel != undefined) {
        if (oldUserChannel == newUserChannel) return
        voiceEmbed.setTitle('User switched')
        voiceEmbed.addField('From', oldUserChannel.name, true)
        voiceEmbed.addField('To', newUserChannel.name, true)
        channel.send(voiceEmbed)
    }
}