const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    username: String,
    userID: String,
    owner: Boolean,
    director: Boolean
});

module.exports = mongoose.model("admin", adminSchema);