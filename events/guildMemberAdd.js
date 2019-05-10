const Discord = require("discord.js");

module.exports = (cobalt, member) => {
    var channel = cobalt.channels.get('426044465023680513');
    let memberCount = cobalt.members;

    let newMember = new Discord.RichEmbed()
        .setTitle('New Cobaltia citizen has joined')
        .setAuthor(member.username, member.displayAvatarURL)
        .addField("Member count", memberCount)
        .setColor("#1cc936");

    channel.send(newMember);
}