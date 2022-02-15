const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const prettyMilliseconds = require('pretty-ms');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        addCD();
        const categories = fs
            .readdirSync('./commands/')
            .filter(file => fs.statSync(path.join('./commands/', file)).isDirectory());
        let helpEmbed = new Discord.MessageEmbed();
        helpEmbed.setTimestamp();
        helpEmbed.setAuthor({ name: 'Cobalt Network', iconURL: message.guild.iconURL });
        helpEmbed.setColor('RANDOM');

        if (args.length === 0) {
            helpEmbed.setDescription('Please select one of the following categories');
            categories.forEach(category => {
                if (category === 'dev') return;
                helpEmbed.addField(category, `\`${cobalt.config.prefix}help ${category}\``, true);
            });
            message.channel.send({ embeds: [helpEmbed] });
        } else {
            let dir = args[0];
            if (!categories.includes(dir) && !cobalt.commands.get(dir)) {
                return message.channel.send({ content: 'Invalid category or command' });
            }

            if (categories.includes(dir)) {
                fs.readdir(`./commands/${args[0]}/`, (err, files) => {
                    helpEmbed.setDescription('Showing help for category ' + dir);
                    if (err) throw err;
                    files.forEach(f => {
                        const props = require(`../${args[0]}/${f}`);
                        helpEmbed.addField(props.help.name, props.help.description);
                    });
                    message.channel.send({ embeds: [helpEmbed] });
                });
            } else {
                const props = cobalt.commands.get(dir);
                helpEmbed.setDescription('Showing help for command ' + dir);
                helpEmbed.addField('Usage', props.help.usage || props.help.name, true);
                helpEmbed.addField('Description', props.help.description || 'No Description', true);
                helpEmbed.addField('Cooldown', prettyMilliseconds((props.conf.cooldown || 1) * 1000), true);
                helpEmbed.addField('aliases', props.conf.aliases.join(', ') || 'No Aliases');
                message.channel.send({ embeds: [helpEmbed] });
            }
        }
    } catch (e) {
        cb(e);
    }
};

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 2,
    aliases: ['h', 'command', 'cmd', 'commands'],
};

exports.help = {
    name: 'help',
    description: 'Let the bot say stuff',
    usage: 'help [category|command]',
};
