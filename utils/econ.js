exports.add = async (bankSpaceToAdd, message) => {
    let currency = require('../models/currency');
    currency.findOne(
        {
            userID: message.author.id,
        },
        (err, res) => {
            if (err) console.log(err);
            if (!res) {
                const newEntry = new currency({
                    username: message.author.username,
                    userID: message.author.id,
                    servers: [message.guild.id],
                    bankSpace: 1000 + bankSpaceToAdd,
                });
                newEntry.save().catch(err => console.log(err));
            } else {
                res.username = message.author.username;
                if (!message.guild.id) {
                    res.servers.push(message.guild.id);
                }
                res.bankSpace += bankSpaceToAdd;
                res.save().catch(err => console.log(err));
            }
        },
    );
};
