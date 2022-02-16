exports.add = async function (xpToAdd, message) {
    let levels = require('../models/levels.js');
    levels.findOne(
        {
            userID: message.author.id,
        },
        (err, res) => {
            if (err) console.log(err);
            if (!res) {
                const newLevel = new levels({
                    username: message.author.username,
                    userID: message.author.id,
                    servers: [message.guild.id],
                    xp: xpToAdd,
                    lvl: 0,
                    totalXp: xpToAdd,
                });
                newLevel.save().catch(err => console.log(err));
            } else {
                const nextLevel = exports.nextLevel(res.lvl);
                let futureXP = res.xp + xpToAdd;
                let futureLevel = res.lvl;

                res.username = message.author.username;
                if (!message.guild.id) {
                    res.servers.push(message.guild.id);
                }

                if (futureXP > nextLevel) {
                    futureLevel++;
                    futureXP -= nextLevel;
                    message.channel
                        .send({
                            content: 'Congratulations <@' + res.userID + '> you are now level ' + futureLevel + '!',
                        })
                        .then(message => {
                            setTimeout(() => {
                                message.delete();
                            }, 10000);
                        });
                }
                res.lvl = futureLevel;
                res.xp = futureXP;
                res.totalXp = futureLevel * nextLevel + futureXP;
                res.save().catch(err => console.log(err));
            }
        },
    );
};

exports.get = function (user) {
    return new Promise(resolve => {
        let level = require('../models/levels.js');
        level.findOne({ userID: user.id }, function (err, res) {
            if (err) console.log(err);
            if (!res) {
                try {
                    const newEntry = new level({
                        username: user.username,
                        userID: user.id,
                        servers: [],
                        xp: 0,
                        lvl: 0,
                        totalXp: 0,
                    });
                    newEntry.save().catch(err => console.log(err));
                    resolve(newEntry);
                } catch (err) {
                    console.log(err);
                }
            }
            resolve(res);
        });
    });
};

exports.nextLevel = function (currentLevel) {
    return 5 * Math.pow(currentLevel, 2) + 50 * currentLevel + 100;
};
