const mongoose = require('mongoose');

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
        
        mongoose.connect('mongodb://cobaltia:cobaltpass@localhost:27017/cobalt?authSource=admin', dbOptions);
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
