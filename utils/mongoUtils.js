let admin = require('../models/admin');
let currency = require('../models/currency');
let levels = require('../models/levels');
let moderation = require('../models/moderation');
let nationstates = require('../models/nationstates');
let userModel = require('../models/user');


class MongoUtils {

    /**
     * 
     * @param {string} model - A mongoose model
     * @param {string} userID - A discord user ID.
     */

    async fetchUser(model, userID) {
        const someone = users.cache.get(userID)
        if (!someone || someone.bot) return false;
        switch (model) {
            case admin:
                let user = await admin.findOne({
                    userID: userID
                })
                if (!user) return false;
                return user;
            case currency:
                let user = await currency.findOne({
                    userID: userID
                })
                if (!user) {
                    const newUser = new currency({
                        username: someone.username,
                        userID: userID
                    });
                    newUser.save();
                    return newUser
                }
                return user;
            case levels:
                let user = await levels.findOne({
                    userID: userID
                })
                if (!user) {
                    const newUser = new levels({
                        username: someone.username,
                        userID: userID
                    });
                    newUser.save();
                    return newUser
                }
                return user;
            case moderation:
                let user = await moderation.findOne({
                    userID: userID
                })
                if (!user) {
                    const newUser = new moderation({
                        username: someone.username,
                        userID: userID
                    });
                    newUser.save();
                    return newUser
                }
                return user;
            case nationstates:
                let user = await nationstates.findOne({
                    userID: userID
                })
                if (!user) {
                    const newUser = new nationstates({
                        username: someone.username,
                        userID: userID
                    });
                    newUser.save();
                    return newUser
                }
                return user;
            case user:
                let user = await userModel.findOne({
                    userID: userID
                })
                if (!user) {
                    const newUser = new userModel({
                        username: someone.username,
                        userID: userID
                    });
                    newUser.save();
                    return newUser
                }
                return user;
            default:
                return false
        }
    }

    /**
     * 
     * @param {string} userID - A discord user ID.
     * @param {number} amount - Amount of coins to give.
     */

    async giveMoney(userID, amount) {
        const someone = users.cache.get(userId);
        if (!someone || someone.bot) return false;
        let user = await currency.findOne({
            userID: userID
        })
        if (!user) {
            const newUser = new currency({
                username: someone.username,
                userID: userID,
                onHand: parseInt(amount)
            });
            newUser.save();
            return newUser
        }
        user.onHand += parseInt(amount)
        await user.save();
        return user;
    }
}