const mongoose = require('mongoose');

const levelsSchema = mongoose.Schema({
    userID: String,
    userName: String,
    serverID: String,
    serverName: String,
    xp: Number,
    lvl: Number
});

module.exports = mongoose.model("levels", levelsSchema);