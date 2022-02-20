const Discord = require('discord.js');
let nations = require('../../models/nationstates.js');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        let [...nationName] = args;
        // // const dmChannel = await message.author.createDM();
        // // console.log(dmChannel);
        // message.channel.send('Please check your DMs');
        // message.author.send('What is the name of your main nation? Please do not include the pretitle.').then(msg => {
        //     msg.channel.awaitMessages({ max: 1, time: 30000, errors: ['time'] }).then(answer => {
        //         nationName = answer.join('_');
        //         message.author.send(nationName);
        //     });
        // });
        if (!nationName || !args[0]) {
            message.channel.send({ content: 'I need a nation name' });
        } else {
            nations.findOne(
                {
                    userID: message.author.id,
                },
                (err, res) => {
                    if (err) console.log(err);
                    if (!res) {
                        const newNation = new nations({
                            username: message.author.username,
                            userID: message.author.id,
                            nation: nationName.join('_'),
                        });
                        newNation.save().catch(e => cb(e));
                        message.channel.send({
                            content:
                                'Your nation ' + nationName.join(' ') + ' is now linked up with your discord account.',
                        });
                    } else {
                        res.nation = nationName.join('_');
                        res.username = message.author.username;
                        res.save().catch(e => cb(e));
                        message.channel.send({
                            content: 'Your discord account is now linked up with ' + nationName.join(' '),
                        });
                    }
                },
            );
        }
        addCD();
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
    name: 'connect',
    description: 'connect discord to nationstates',
    usage: 'connect [nation]',
};
