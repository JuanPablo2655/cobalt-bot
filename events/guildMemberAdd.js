const Discord = require("discord.js");

module.exports = (cobalt, member) => {
    var log = cobalt.channels.get('426044465023680513');
    var welcome = cobalt.channels.get('433831532981911553')

    let newMember = new Discord.RichEmbed()
        .setTitle('New Cobaltia citizen has joined')
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .addField("Member count", member.guild.memberCount)
        .setColor("#1cc936");
    log.send(newMember);

    welcome.send(`Welcome ${member.user.username} to Cobaltia. Please wait while the Directors administers your member role.`)
}