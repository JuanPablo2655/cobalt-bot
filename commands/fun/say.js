const { Util } = require('discord.js');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        addCD();
        const clean = async text => {
            if (text && text.constructor.name == 'Promise') text = await text;
            if (typeof text !== 'string') text = require('util').inspect(text, { depth: 1 });

            text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));

            return text;
        };

        const sayMessage = args.join(' ');
        if (!sayMessage) return message.channel.send({ content: "I can't send nothing." });
        let cleaned = await clean(sayMessage);
        message.delete().catch(O_o => {});
        message.channel.send({ content: cleaned });
    } catch (e) {
        cb(e);
    }
};

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 3,
    aliases: [],
};

exports.help = {
    name: 'say',
    description: 'Let the bot say stuff',
    usage: 'say [message]',
};
