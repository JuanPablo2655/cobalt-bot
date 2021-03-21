const Discord = require("discord.js");

module.exports = async (cobalt, oldMember , newMember) => {
    var channel = oldmember.guild.channels.cache.find(channel => channel.name === "record");
    let avatar = newMember.user.displayAvatarURL({format: 'png'});

    let updateEmbed = new Discord.MessageEmbed()
        .setColor('#00a1ff')
        .setTimestamp()
        .setAuthor(newMember.user.username, avatar)
        .setTitle('User update');

    if (oldMember.roles.cache.size < newMember.roles.cache.size) {
        for (const role of newMember.roles.cache.map(x => x.id)) {
            if (!oldMember.roles.cache.has(role)) {
                updateEmbed.addField('Role(s) assigned', oldMember.guild.roles.cache.get(role).name)
            }
        }
        channel.send(updateEmbed);
    } else if (oldMember.roles.cache.size > newMember.roles.cache.size) {
        for (const role of oldMember.roles.cache.map(x => x.id)) {
            if (!newMember.roles.cache.has(role)) {
                updateEmbed.addField('Role(s) removed', oldMember.guild.roles.cache.get(role).name)
            }
        }
        channel.send(updateEmbed);
    } else {
        if (oldMember.nickname == newMember.nickname) return
        updateEmbed.addField('Old Nickname', oldMember.nickname || oldMember.user.username)
        updateEmbed.addField('New nickname', newMember.nickname || newMember.user.username)
        channel.send(updateEmbed);
    }
}



// if (oldMember.premiumSince !== newMember.premiumSince) {
//     Might come useful later
//  }