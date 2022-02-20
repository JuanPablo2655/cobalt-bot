const { WebhookClient, MessageEmbed } = require('discord.js');
const secrets = require('../secrets.json');
module.exports = cobalt => {
    webhook = new WebhookClient({ url: secrets.webhookURL });
    const readyEmbed = new MessageEmbed()
        .setTitle('Ready')
        .setDescription(`Cobalt Network is ready in \`${cobalt.guilds.cache.size}\` servers.`)
        .setColor('#1cc936')
        .setTimestamp();
    webhook.send({ embeds: [readyEmbed] });
    console.log('[Cobalt]\tOnline!');
    cobalt.user.setActivity('Breaking Bad ', { type: 'WATCHING' });
};
