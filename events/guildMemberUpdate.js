const Discord = require("discord.js");

module.exports = async (cobalt, oldMember , newMember) => {
    var channel = cobalt.channels.get('405158191324987393');
    let avatar = newMember.user.displayAvatarURL;

    let updateEmbed = new Discord.RichEmbed()
        .setColor('#00a1ff')
        .setTimestamp()
        .setAuthor(newMember.user.username, avatar)
        .setTitle('User update');

    if (oldMember.roles.size < newMember.roles.size) {
        for (const role of newMember.roles.map(x => x.id)) {
            if (!oldMember.roles.has(role)) {
                updateEmbed.addField('Role(s) assigned', oldMember.guild.roles.get(role).name)
            }
        }
        channel.send(updateEmbed);
    } else if (oldMember.roles.size > newMember.roles.size) {
        for (const role of oldMember.roles.map(x => x.id)) {
            if (!newMember.roles.has(role)) {
                updateEmbed.addField('Role(s) removed', oldMember.guild.roles.get(role).name)
            }
        }
        channel.send(updateEmbed);
    } else {
        updateEmbed.addField('Old Nickname', oldMember.nickname|| oldMember.user.username)
        updateEmbed.addField('New nickname', newMember.nickname|| newMember.user.username)
        channel.send(updateEmbed);
    }
}