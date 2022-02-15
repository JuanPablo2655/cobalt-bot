const Discord = require('discord.js');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        if (!args[0]) return message.channel.send({ content: 'I need a category' });
        if (!args[1]) return message.channel.send({ content: 'I need a command to reload' });

        let c = args[0];
        let f = args[1];
        let data = cobalt.commands.get(f);
        if (!data) return message.channel.send({ content: "That isn't a valid command." }).catch(e => cb(e));

        cobalt.commands.delete(f);

        const mod = require.cache[require.resolve(`../${c}/${f}`)];
        delete require.cache[require.resolve(`../${c}/${f}.js`)];
        for (let i = 0; i < mod.parent.children.length; i++) {
            if (mod.parent.children[i] === mod) {
                mod.parent.children.splice(i, 1);
                break;
            }
        }

        let props = require(`../${c}/${f}.js`);

        cobalt.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            cobalt.aliases.set(alias, props.help.name);
        });

        message.channel.send({ content: 'Reloaded ' + c + '/' + f }).catch(e => cb(e));
    } catch (e) {
        cb(e);
    }
};

exports.conf = {
    enabled: true,
    ownerOnly: true,
    cooldown: 1,
    aliases: ['r'],
};

exports.help = {
    name: 'reload',
    description: 'Reloads a command',
    usage: 'reload [command]',
};
