const Discord = require('discord.js');

module.exports.run = async (cobalt, message, args, addCD, cb) => {
    try {
        let arr = message.content.split(' ');
        delete arr[0];

        let choice = arr.join(' ').toLowerCase().trim();
        let options = ['rock', 'paper', 'scissors'];

        if (!options.includes(choice))
            return message.channel.send({ content: "Please choose either 'Rock', 'Paper', or 'Scissors'" });

        addCD();

        let computer = options[Math.round(Math.random() * (options.length - 1))];

        let wins = {
            rock: 'scissors',
            scissors: 'paper',
            paper: 'rock',
        };

        if (wins[computer] === choice) return message.channel.send({ content: 'I choose ' + computer + ' so I win.' });

        if (wins[choice] === computer)
            return message.channel.send({ content: 'I choose ' + computer + ' so you win. :tada: :tada:' });

        message.channel.send({ content: 'I choose ' + computer + ' so it was a tie.' });
    } catch (e) {
        cb(e);
    }
};

exports.conf = {
    enabled: true,
    ownerOnly: false,
    cooldown: 5,
    aliases: [],
};

exports.help = {
    name: 'rps',
    description: 'Play RPS with the bot',
    usage: 'rps [rock|paper|scissors]',
};
