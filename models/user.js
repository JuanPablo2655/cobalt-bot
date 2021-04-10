const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userID: { type: String, require: true },
    username: { type: String, require: false },
    roles: { type: Array, require: false, default: [] }
});

module.exports = mongoose.model("user", userSchema);