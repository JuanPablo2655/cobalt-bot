const mongoose = require('mongoose');

const currencySchema = mongoose.Schema({
    username: { type: String, require: false },
    userID: { type: String, require: false },
    servers: { type: Array, require: false, default: []},
    onHand: { type: Number, require: false, default: 0 },
    deposited: { type: Number, require: false, default: 0 },
    bankSpace: { type: Number, require: false, default: 1000 },
    netWorth: { type: Number, require: false, default: 0 },
    workCooldown: { type: Date, require: false },
    bounty: {type: Number, require: false, default: 0},
    items: {type: Array, required: false, default: []},
});

module.exports = mongoose.model("currency", currencySchema);