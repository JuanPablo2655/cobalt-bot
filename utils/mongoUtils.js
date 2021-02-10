let currency = require('../models/currency');

class Economy {
    constructor () {
        this.currency = currency;
    }

    /**
     * 
     * @param {string} userID - A discord user ID.
     */

    async fetchUser(userID) {
        const someone = users.cache.get(userID)
        if (!someone || someone.bot) return false;
        let user = await currency.findOne({
            userID
        })
        if (!user) {
            const newUser = new currency({
                username: someone.username,
                userID
            });
            newUser.save();
            return newUser
        }
        return user;
    }

    /**
     * 
     * @param {string} userID - A discord user ID.
     * @param {number} amount - Amount of money to give.
     */

    async giveMoney(userID, amount) {
        const someone = users.cache.get(userID);
        if (!someone || someone.bot) return false;
        let user = await currency.findOne({
            userID
        })
        if (!user) {
            const newUser = new currency({
                username: someone.username,
                userID,
                onHand: parseInt(amount),
                netWorth: parseInt(amount)
            });
            newUser.save();
            return newUser
        }
        user.onHand += parseInt(amount)
        user.netWorth += parseInt(amount)
        await user.save();
        return user;
    }

    /**
     * 
     * @param {string} userID - A discord user ID.
     * @param {number} amount  - Amount of money to add or remove.
     */

    async removeMoney(userID, amount) {
        const someone = users.cache.get(userID);
        if (!someone || someone.bot) return false;
        let user = await currency.findOne({
            userID
        })
        if (!user) {
            const newUser = new currency({
                username: someone.username,
                userID,
                onHand: parseInt(-amount),
                netWorth: parseInt(-amount)
            });
            newUser.save();
            return newUser
        }
        user.onHand -= parseInt(amount)
        user.netWorth -= parseInt(amount)
        await user.save();
        return user;
    }

    /**
     * 
     * @param {string} userID 
     * @param {string} amount 
     */

    async addBankSpace(userID, amount) {
        const someone = users.cache.get(userID);
        if (!someone || someone.bot) return false;
        let user = await currency.findOne({
            userID
        })
        if (!user) {
            const newUser = new currency({
                username: someone.username,
                userID,
                bankSpace: 1000 + parseInt(amount)
            });
            newUser.save();
            return newUser
        }
        user.bankSpace += parseInt(amount)
        await user.save();
        return user;
    }

    /**
     * 
     * @param {string} userID 
     * @param {string} amount 
     */

    async removeBankSpace(userID, amount) {
        const someone = users.cache.get(userID);
        if (!someone || someone.bot) return false;
        let user = await currency.findOne({
            userID
        })
        if (!user) {
            const newUser = new currency({
                username: someone.username,
                userID,
                bankSpace: 1000 - parseInt(amount)
            });
            newUser.save();
            return newUser
        }
        user.bankSpace -= parseInt(amount)
        await user.save();
        return user;
    }
}

module.exports = Economy;