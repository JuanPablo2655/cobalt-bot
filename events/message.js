const cobalt = require("./../cobalt.js");
const config = cobalt.config;

const devMode = true
const levelMode = false

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

    // const swearWords = ["heck", "damn","darn"];
    // if (swearWords.some(word => message.content.includes(word))) {
    //     message.delete();
    //     message.author.send('Hey! That word has been banned, please don\'t use it!');
    // }

    if (!messageDAT.startsWith(config.prefix)) {
        if (levelMode == true){
            return manageLevels(message);
        } else return
    }

    let cmd;
    if (cobalt.commands.has(command)) {
        cmd = cobalt.commands.get(command);
    } else if (cobalt.aliases.has(command)) {
        cmd = cobalt.commands.get(cobalt.aliases.get(command));
    }
    if (!cmd) {
        if (levelMode == true){
            return manageLevels(message);
        } else return
    };
    if (cmd.conf["enabled"] === false) {
        if (devMode == true) {
            cmd.run(cobalt, message, args, commandError)
        } else return
    }
    if (cmd.conf["ownerOnly"] === true) {
        if (!message.author.id == "288703114473635841") return
    }
    if (cmd) {
        console.log(`[Cobalt]\t${message.author.username} used command '${cmd.help["name"]}'`);
    }

    function commandError(err){
        console.log("ERROR RUNNING COMMAND");
        console.log(err);
        message.channel.send("The command failed to run.");
        cobalt.channels.cache.get('645753142838951947').send(`\`\`\`${err.stack}\`\`\``||"error lmao");
    }
    
    cmd.run(cobalt, message, args, commandError);

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