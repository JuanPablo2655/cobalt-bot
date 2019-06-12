const Discord = require("discord.js");

module.exports = (cobalt, member) => {
    var channel = cobalt.channels.get('426044465023680513');

    let newMember = new Discord.RichEmbed()
        .setTitle('Old Cobaltia citizen left or got banned')
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .addField("member count", cobalt.memberCount)
        .setColor("d62424");

    channel.send(newMember);
}