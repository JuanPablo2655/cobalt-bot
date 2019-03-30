const Discord = require("discord.js");
const mongoose = require('mongoose');
let jobs = require('../model/job.js');

module.exports.run = async (cobalt, message, args) => {
    const filter = m => m.author.id === message.author.id
    if (args[0] == 'add') {
        message.reply("Please give this job a name. This message will expipre in ten seconds.").then(q => q.delete(15000));
        message.channel.awaitMessage(filter, {max: 1, time: 10000}).then(collected => {
            collected.delete(15000);
            if (collected.first().content === 'cancel') {
                return message.reply("Canceled.");
            }
            let jobName =  collected.first().content
        }).catch(err => {
            message.reply("message expired").then(r => r.delete(5000));
        })

        // if (!args[1]) {
        //     return message.channel.send("I need a name for this job")
        // } else if (!args[2] || args[2] == 0) {
        //     return message.channel.send("This job needs a pay.")
        // } else if (!args[1] && !args[2]) {
        //     return message.channel.send("I need job name and pay")
        // } else {
        //     const newJob = new jobs({
        //         name: args[1],
        //         pay: args[2]
        //     });
        //     newJob.save().catch(err => console.log(err));
        //     message.channel.send(args[1] + " has been added.")
        // }
    }
}

exports.conf = {
    aliases: ['jobs']
}

exports.help = {
    name: "jobs",
    description: "adds jobs",
    usage: "jobs"
}