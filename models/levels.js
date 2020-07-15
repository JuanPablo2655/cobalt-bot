const mongoose = require('mongoose');

const levelsSchema = mongoose.Schema({
    username: String,
    userID: String,
    servers: [String],
    xp: Number,
    lvl: Number,
    totalXp: Number
});

module.exports = mongoose.model("levels", levelsSchema);