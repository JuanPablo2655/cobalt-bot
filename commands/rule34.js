const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args) => {
    const snekfetch = require('snekfetch');
    const xml2js = require('xml2js');

    if (message.channel.nsfw === false) {
        return message.reply("This channel isn't marked as NSFW.");
    }
    if (!args[0]) {
        return message.channel.send('Please give a search terms!');
    }
    snekfetch.get('http://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=' + encodeURIComponent(args.join(' '))).then(r => {
        if (r.body.length < 75) {
            return message.channel.send('Nothing found!');
        }
        xml2js.parseString(r.body, (err, reply) => {
            if (err) {
                message.channel.send('The API returned an unconventional response.');
            }

            let count = Math.floor((Math.random() * reply.posts.post.length));
            message.channel.send({
                files: [reply.posts.post[count].$.file_url]
            })
        });
    });
}

exports.conf = {
    aliases: ['r34']
}

exports.help = {
    name: "rule34",
    description: "smh",
    usage: "rule34 [search]"
}