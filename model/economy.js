const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const economy = new Schema({
    userID: String,
    userName: String,
    serverID: String,
    serverName: String,
    money: Number
});

module.exports = mongoose.model("ecomony", economy);
  