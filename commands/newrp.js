const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args) => {
    let [...name] = args;
    if (!name[0]) {
        message.channel.send("Error: Can\'t create a channel with no name.");
    } else if (name) {
        rp = getInitials(name.join(' '))
        message.guild.createChannel(`${rp}-development`, "text")
            .then(channel => channel.setParent('393965452579307521'))
            .then(channel => channel.lockPermissions());
        message.channel.send("Channel created.")
    }
}

var getInitials = function (string) {
    var initials = "";
    var names = string.split(' ');
    for (n = 0; n < names.length; n++) {
        initials += names[n].substring(0, 1).toUpperCase();
    }
    return initials;
};

exports.conf = {
    aliases: []
}

exports.help = {
    name: "newrp",
    description: "create a new rp channel.",
    usage: "newrp"
}