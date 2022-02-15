const Discord = require('discord.js');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        addCD();
        let shopEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({ name: 'Cobalt Network', iconURL: message.guild.iconURL })
            .addField('🔒 **Padlock - __₡1__,__000__**', '`id: padlock`\nProtect your money on hand from robbers.')
            .addField('📜 **Bank Note - __₡1__,__000__**', '`id: banknote`\nMore bank capacity.')
            .addField('💝 **Extra Life - __₡2__,__000__**', '`id: extralife`\nAnother chance at living.');
        message.channel.send({ embeds: [shopEmbed] });
    } catch (e) {
        cb(e);
    }
};

exports.conf = {
    enabled: false,
    ownerOnly: false,
    cooldown: 1,
    aliases: [],
};

exports.help = {
    name: 'shop',
    description: 'the shop to buy items',
    usage: 'shop',
};
