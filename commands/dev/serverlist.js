const Discord = require('discord.js');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        addCD();

        const description = data => {
            return (
                `Total Servers - ${cobalt.guilds.cache.size}\n\n` +
                cobalt.guilds.cache
                    .sort((a, b) => b.memberCount - a.memberCount)
                    .map(r => r)
                    .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}\n \n`)
                    .slice(data.i0, data.i1)
                    .join('\n')
            );
        };

        const genEmbed = (message, data) => {
            let descriptions = description(data.i0, data.i1);

            let embed = new Discord.MessageEmbed()
                .setAuthor({
                    name: message.author.tag,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                    }),
                })
                .setFooter({ text: cobalt.user.username })
                .setTitle(`Page - ${data.page}/${Math.ceil(cobalt.guilds.cache.size / 10)}`)
                .setDescription(descriptions);

            return embed;
        };

        const reactEmbed = async (botMessage, clientMessage, data) => {
            await botMessage.react('⬅');
            await botMessage.react('➡');
            await botMessage.react('❌');

            let collector = botMessage.createReactionCollector({
                filter: (reaction, user) => user.id === clientMessage.author.id,
            });

            collector.on('collect', async (reaction, user) => {
                if (reaction.emoji.name === '⬅') {
                    // Updates variables
                    data.i0 = data.i0 - 10;
                    data.i1 = data.i1 - 10;
                    data.page = data.page - 1;

                    // if there is no guild to display, delete the message
                    if (data.i0 + 1 < 0) {
                        return botMessage.delete();
                    }
                    if (!data.i0 || !data.i1) {
                        return botMessage.delete();
                    }

                    // Edit the message
                    botMessage.edit({ embeds: [genEmbed(clientMessage, data)] });
                }

                if (reaction._emoji.name === '➡') {
                    // Updates variables
                    data.i0 = data.i0 + 10;
                    data.i1 = data.i1 + 10;
                    data.page = data.page + 1;

                    // if there is no guild to display, delete the message
                    if (data.i1 > cobalt.guilds.cache.size + 10) return botMessage.delete();
                    if (!data.i0 || !data.i1) return botMessage.delete();

                    // Edit the message
                    botMessage.edit({ embeds: [genEmbed(botMessage, data)] });
                }

                if (reaction._emoji.name === '❌') return botMessage.delete();

                // Remove the reaction when the user react to the message
                await reaction.users.remove(clientMessage.author.id);
            });
        };

        let data = {
            i0: 0,
            i1: 10,
            page: 1,
        };

        const embed = genEmbed(message, data);
        reactEmbed(await message.channel.send({ embeds: [embed] }), message, data);
    } catch (e) {
        cb(e);
    }
};

exports.conf = {
    enabled: true,
    ownerOnly: true,
    cooldown: 1,
    aliases: ['sl'],
};

exports.help = {
    name: 'serverlist',
    description: 'get the server list',
    usage: 'serverlist',
};
