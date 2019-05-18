const Discord = require("discord.js");

module.exports = (cobalt, member) => {
    var channel = cobalt.channels.get('426044465023680513');
    let membersCount = cobalt.memberCount;

    let newMember = new Discord.RichEmbed()
        .setTitle('New Cobaltia citizen has joined')
        .setAuthor(member.username, member.displayAvatarURL)
        .addField("Member count", membersCount)
        .setColor("#1cc936");

    channel.send(newMember);
}