const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userID: { type: String, require: false },
    username: { type: String, require: false },
    disciminator: { type: Number, require: false },
    avatar: { type: String, require: false }
});

module.exports = mongoose.model("user", userSchema);