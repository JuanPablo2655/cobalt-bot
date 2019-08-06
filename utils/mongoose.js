const mongoose = require('mongoose');
const secrets = require("../secrets.json");

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };
        
        mongoose.connect(secrets.databasePass, dbOptions);
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
};