const Discord = require("discord.js");

module.exports = (cobalt, member) => {
    var log = cobalt.channels.cache.get('405158191324987393');
    var welcome = cobalt.channels.cache.get('433831532981911553')

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