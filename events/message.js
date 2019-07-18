const cobalt = require("./../cobalt.js");
const config = cobalt.config;

let cooldowns = {};

module.exports = async (cobalt, message) => {
    const messageDAT = message.content + "";
    if (message.author.bot) {
        return
    };
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if ((message.content + "").replace("!", "").trim() === "<@" + cobalt.user.id + ">") {
        message.reply("the prefix is: " + config.prefix);
    }

    if (message.content == "test") {
        message.channel.send("test")
    }
    let msg = JSON.stringify(messageDAT).replace(" ", ",")
    console.log(msg)

    if (!messageDAT.startsWith(config.prefix)) {
       return manageLevels(message);
    }

    let cmd;
    if (cobalt.commands.has(command)) {
        cmd = cobalt.commands.get(command);
    } else if (cobalt.aliases.has(command)) {
        cmd = cobalt.commands.get(cobalt.aliases.get(command));
    }
    if (!cmd) {
        return manageLevels(message);
    };
    if (cmd) {
        console.log(`[Cobalt]\t${message.author.username} used command '${cmd.help["name"]}'`);
    }
    cmd.run(cobalt, message, args);

    function manageLevels(message) {
        if (!cooldowns['__xp'])
            cooldowns['__xp'] = {};

        if (cooldowns['__xp'][message.author.id])
            return;

        cooldowns['__xp'][message.author.id] = new Date().getTime() + 60000;

        let xpToAdd = Math.round(Math.random() * ((25 - 15) + 1) + 15);
        require('../utils/xp.js').add(xpToAdd, message);
    }

}