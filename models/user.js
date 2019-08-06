const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userID: String,
    username: String,
    disciminator: Number,
    avatar: String,
});

module.exports = mongoose.model("user", userSchema);