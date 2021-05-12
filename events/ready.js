const { WebhookClient, MessageEmbed } = require("discord.js")
const secrets = require("../secrets.json")
module.exports = cobalt => {
    webhook = new WebhookClient(secrets.webhookID, secrets.webhookToken)
    const readyEmbed = new MessageEmbed()
        .setTitle("Ready")
        .setDescription(`Cobalt Network is ready in \`${cobalt.guilds.cache.size}\` servers.`)
        .setColor("#1cc936")
        .setTimestamp()
    webhook.send(readyEmbed)
    console.log('[Cobalt]\tOnline!')
    cobalt.user.setActivity('Samuel', {type: 'WATCHING'});
}