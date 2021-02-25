const { Client } = require('discord.js');
const mongoose = require('mongoose');
let currency = require('../models/currency');
let stats = require('../models/stats');

class cobaltClass extends Client {
    constructor () {
        super();
        this.config = require('../config.json');
        this.secrets = require('../secrets.json');
        const dbOptions = {
            useNewUrlParser: true,
            autoIndex: false,
            useUnifiedTopology: true,
            // reconnectTries: Number.MAX_VALUE,
            // reconnectInterval: 500,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };

        mongoose.connect(this.secrets.databasePass, dbOptions);

        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;
        
        mongoose.connection.on('connected', () => {
            console.log('[Mongoose]\tMongoose connection successfully opened');
        });
        
        mongoose.connection.on('err', err => {
            console.error(`[Mongoose]\tMongoose connection error: \n ${err.stack}`);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('[Mongoose]\tMongoose connection disconnected');
        });
    }

    /**
     * 
     * @param {string} userID - A discord user ID.
     */

    async fetchEconUser(userID) {
        const someone = this.users.cache.get(userID)
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
        const someone = this.users.cache.get(userID);
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
     * @param {number} amount  - Amount of money to remove.
     */

    async removeMoney(userID, amount) {
        const someone = this.users.cache.get(userID);
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
        const someone = this.users.cache.get(userID);
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
        const someone = this.users.cache.get(userID);
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

    async commandUsed(message) {
        const serverInfo = await stats.findOne({
            serverID: message.guild.id
        })
        if(!serverInfo) {
            const newEntry = new stats({
                serverID: message.guild.id,
            });
            newEntry.save();
            return newEntry;
        }
        return serverInfo;
    }
}

module.exports = cobaltClass;