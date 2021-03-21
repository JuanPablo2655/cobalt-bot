const Discord = require("discord.js");

module.exports = (cobalt, member) => {
    var log = member.guild.channels.cache.find(channel => channel.name === "record");
    var welcome = member.guild.cache.find(channel => channel.name === "border-patrol");
    if (!welcome) return

    let newMember = new Discord.MessageEmbed()
        .setTitle('New Cobaltia citizen has joined')
        .setAuthor(member.user.username, member.user.displayAvatarURL({format: 'png'}))
        .addField("Member count", member.guild.memberCount)
        .setColor("#1cc936")
        .setFooter("User ID: "+member.user.id)
        .setTimestamp();
    log.send(newMember);

    welcome.send(`Welcome, ${member.user.username} to Cobaltia. Please wait while the Directors administers your member role.`)
}