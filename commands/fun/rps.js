const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args) => {
    let arr = message.content.split(" ");
    delete arr[0];

    let choice = (arr.join(" ")).toLowerCase().trim();
    let options = ['rock','paper','scissors'];
 
    if(!options.includes(choice))
        return message.channel.send("Please choose either 'Rock', 'Paper', or 'Scissors'");

    let computer = options[Math.round(Math.random()*(options.length-1))];

    let wins = {'rock':'scissors', 'scissors':'paper','paper':'rock'};

    if(wins[computer]===choice)
        return message.channel.send("I choose "+computer+" so I win.");

    if(wins[choice]===computer)
        return message.channel.send("I choose "+computer+" so you win. :tada: :tada:");

    message.channel.send("I choose "+computer+" so it was a tie.");
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "rps",
    description: "Let the bot say stuff",
    usage: "rps [rock|paper|scissors]"
}