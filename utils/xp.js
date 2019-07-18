exports.add = async function (xpToAdd, message) {
    let levels = require('../models/levels.js');
    levels.findOne({
        userID: message.author.id,
    }, (err, res) => {
        if (err) console.log(err);
        if (!res) {
            const newLevel = new levels({
                username: message.author.username,
                userID: message.author.id,
                servers: [message.guild.id],
                xp: xpToAdd,
                lvl: 0
            });
            newLevel.save().catch(err => console.log(err));
        } else {
            const nextLevel = exports.nextLevel(res.lvl);
            let futureXP = res.xp + xpToAdd;
            let futureLevel = res.lvl;

            res.username = message.author.username;
            if (!message.guild.id) {
                res.servers.push(message.guild.id)
            }

            if(futureXP > nextLevel){
                futureLevel ++;
                futureXP -= nextLevel;
                message.channel.send("Congratulations <@"+res.userID+"> you are now level " + futureLevel + "!");
            }
            res.lvl = futureLevel;
            res.xp = futureXP;
            res.save().catch(err => console.log(err));
        }
    });
}

exports.get = function(userID){
    return new Promise(resolve => {
        let level = require('../models/levels.js');
        level.findOne({userID: userID}, function (err, res) {
            if (err) console.log(err);
            resolve(res);
        });
    });
}

exports.nextLevel = function(currentLevel){
    return 5 * Math.pow(currentLevel, 2) + 50 * currentLevel + 100;
}