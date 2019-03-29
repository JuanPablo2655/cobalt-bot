const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const economy = new Schema({
    userID: String,
    serverID: String,
    money: Number
});

module.exports = mongoose.model("ecomony", economy);
  