const { conf } = require("../commands/utility/help.js");
const cobalt = require("./../cobalt.js");
const Discord = require('discord.js');
const config = require('../config.json');
const { DateTime } = require("luxon");
const prettyMilliseconds = require('pretty-ms');

const devMode = config.devMode
const levelMode = config.levelMode

let levelCooldowns = new Set();

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

    if (message.guild && !message.member) await message.guild.members.fetch(message.author);

    // const swearWords = ["heck", "damn","darn"];
    // if (swearWords.some(word => message.content.includes(word))) {
    //     message.delete();
    //     message.author.send('Hey! That word has been banned, please don\'t use it!');
    // }

    if (!messageDAT.startsWith(config.prefix)) {
        if (levelMode == true) {
            return await manageUser(message);
        } else return
    }

    let cmd;
    if (cobalt.commands.has(command)) {
        cmd = cobalt.commands.get(command);
    } else if (cobalt.aliases.has(command)) {
        cmd = cobalt.commands.get(cobalt.aliases.get(command));
    }

    if (!cmd) {
        if (levelMode == true) {
            return await manageUser(message);
        } else return
    };
    if (cmd.conf.enabled === false) {
        if (devMode == true) {
            cmd.run(cobalt, message, args, commandError)
        } else return message.channel.send(`the command \`${cmd.help.name}\` is not enabled, try again later`)
    }
    if (cmd.conf.ownerOnly === true) {
        if (!message.author.id == "288703114473635841") return
    }
    if (cmd) {
        if (!cobalt.cooldowns.has(cmd.help.name)) {
            cobalt.cooldowns.set(cmd.help.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cobalt.cooldowns.get(cmd.help.name);
        const cooldownAmount = (cmd.conf.cooldown || 1) * 1000

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                const cooldownEmbed = new Discord.MessageEmbed()
                    .setDescription(`**${message.author.username}** : This command is on a cooldown.\n\nYou will be able to run the command again in : \`${prettyMilliseconds(timeLeft * 1000)}\`.\n\nThe default cooldown on this command is \`${prettyMilliseconds(cmd.conf.cooldown * 1000)}\`.`)
                    .setColor('#FFA500');
                return message.channel.send(cooldownEmbed);
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        console.log(`[Cobalt]\t${message.author.username} used command '${cmd.help.name}'`);
    }

    cmd.run(cobalt, message, args, commandError);

    function commandError(err) {
        console.log("ERROR RUNNING COMMAND");
        console.log(err);
        message.channel.send("The command failed to run.");
        cobalt.channels.cache.get('645753142838951947').send(`\`\`\`${err.stack}\`\`\`` || "error lmao");
    }

    async function manageUser(message) {
        if (levelCooldowns.has(message.author.id)) return console.log('cooldown')
        levelCooldowns.add(message.author.id)
        setTimeout(() => {
            levelCooldowns.delete(message.author.id)
        }, 60000)
        // if (!cooldowns['__xp'])
        //     cooldowns['__xp'] = {};

        // if (cooldowns['__xp'][message.author.id])
        //     return console.log(cooldowns['__xp'][message.author.id]);

        // cooldowns['__xp'][message.author.id] = new Date().getTime() + 60000;

        let xpToAdd = Math.round(Math.random() * ((25 - 15) + 1) + 15);
        require('../utils/xp.js').add(xpToAdd, message);

        let bankSpaceToAdd = Math.round(10 + Math.random() * 20)
        await cobalt.addBankSpace(message.author.id, bankSpaceToAdd)
        console.log('it worked')
        // require('../utils/econ').add(bankSpaceToAdd, message);
    }

    // function manageBankSpace(message) {
    //     if (!bankCooldowns['__bank'])
    //     bankCooldowns['__bank'] = {};

    //     if (bankCooldowns['__bank'][message.author.id])
    //         return;

    //         bankCooldowns['__bank'][message.author.id] = new Date().getTime() + 60000;

    //     let bankSpaceToAdd = Math.round(10 + Math.random() * 20)
    //     require('../utils/econ').add(bankSpaceToAdd, message);
    // }
}