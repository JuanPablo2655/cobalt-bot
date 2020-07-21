const mongoose = require('mongoose');

const economySchema = mongoose.Schema({
    username: String,
    userID: String,
    onHand: Number,
    bank: Number,
    netWorth: Number
});

module.exports = mongoose.model("economy", economySchema);