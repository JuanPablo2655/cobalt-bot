const mongoose = require('mongoose');

const bankSchema = mongoose.Schema({
    username: String,
    userID: String,
    money: Number,
    jobID: String
});

module.exports = mongoose.model("bank", bankSchema);