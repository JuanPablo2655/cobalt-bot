const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        addCD();
        const meme = async () => {
            let subreddits = ['greentext'];
            let subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
            let request = await fetch(`https://www.reddit.com/r/${subreddit}/top/.json?limit=100`);
            let content = await request.json();
            if (content.error === 404)
                return message.channel.send({ content: `I can't find anything on the sub r/${subreddit}` });

            return new Promise((resolve, reject) => {
                content = content.data.children;
                if (!content) reject('error');
                let post = content[Math.floor(Math.random() * content.length)].data;
                if (post.over_18) return resolve('NSFW content not allowed');

                const memeEmbed = new MessageEmbed()
                    .setTitle(`${post.title}`)
                    .setURL(`https://reddit.com${post.permalink}`)
                    .setImage(post.url)
                    .setColor('RANDOM')
                    .setFooter({ text: `👍 ${post.ups} 💬 ${post.num_comments}` });
                resolve(memeEmbed);
            });
        };
        const meme = await meme();
        if (typeof meme === 'string') {
            message.channel.send({ content: meme });
        } else {
            message.channel.send({ embeds: [meme] });
        }
    } catch (e) {
        cb(e);
    }
};

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 15,
    aliases: [],
};

exports.help = {
    name: '4chan',
    description: 'get a random greentext from reddit',
    usage: '4chan',
};
