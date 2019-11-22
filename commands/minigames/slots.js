const Discord = require("discord.js");

module.exports.run = async (cobalt, message, args, cb) => {
    try {
        let options = [":banana:", ":apple:", ":pineapple:", ":grapes:", ":pear:", ":cherries:", ":strawberry:", ":watermelon: "];

        let chosen = [];
        for (let i = 0; i < 3; i++) {
            chosen.push(options[Math.round(Math.random() * (options.length - 1))]);
        }

        let first_2 = chosen[0] === chosen[1];
        let last_2 = chosen[1] === chosen[2];
        let opposite_ends = chosen[0] === chosen[2];

        let msg = "No matches.  Sorry!";
        if (first_2 && last_2) {
            msg = "Matched all of them!  Well done.";
        } else if (first_2 || last_2 || opposite_ends) {
            msg = "Matched 2!  Well done.";
        }

        message.channel.send("|-" + chosen.join("-") + "-|\n`" + msg + "`");
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    aliases: []
}

exports.help = {
    name: "slots",
    description: "play slots",
    usage: "slots"
}