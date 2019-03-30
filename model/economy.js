const mongoose = require('mongoose');

const economySchema = mongoose.Schema({
    userID: String,
    userName: String,
    serverID: String,
    serverName: String,
    money: Number
});

module.exports = mongoose.model("ecomony", economySchema);