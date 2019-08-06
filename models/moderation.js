const mongoose = require('mongoose');

const modSchema = mongoose.Schema({
    username: String,
    userID: String,
    warns: Number,
    gulags: Number,
    ban: Boolean
});

module.exports = mongoose.model("moderation", modSchema);