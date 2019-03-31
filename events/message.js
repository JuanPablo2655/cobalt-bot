const cobalt = require("./../cobalt.js");
const config = cobalt.config;

module.exports = async (cobalt, message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) {
        let levels = require('../model/levels.js');
        let xpToAdd = Math.round(Math.random() * ((25 - 15) + 1) + 15);
        levels.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, (err, res) => {
            if (err) console.log(err);
            if (!res) {
                const newLevel = new levels({
                    userID: message.author.id,
                    userName: message.author.username,
                    serverID: message.guild.id,
                    serverName: message.guild.name,
                    xp: xpToAdd,
                    lvl: 0
                });
                newLevel.save().catch(err => console.log(err));
            } else {
                const curLevel = 5 * Math.pow(res.lvl, 2) + 50 * res.lvl + 100
                if (res.xp > curLevel) {
                    res.lvl = res.lvl + 1;
                    message.channel.send("congratulations you are now level " + res.lvl + "!")
                    res.save().catch(err => console.log(err));
                } else {
                    res.xp = res.xp + xpToAdd;
                    res.save().catch(err => console.log(err));
                }
            }
        });
    }

    //Return out if the prefix is not at the beginning of the message
    if (message.content.indexOf(config.prefix) !== 0) {
        return;
    }
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let cmd;
    if (cobalt.commands.has(command)) {
        cmd = cobalt.commands.get(command);
    } else if (cobalt.aliases.has(command)) {
        cmd = cobalt.commands.get(cobalt.aliases.get(command));
    }
    if (!cmd) return false;
    if (cmd) {
        console.log(`Cobalt: ${message.author.username}#${message.author.discriminator} used command '${cmd.help["name"]}' on ${message.guild.name}`);
    }
    cmd.run(cobalt, message, args);
}