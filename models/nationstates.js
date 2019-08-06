const mongoose = require('mongoose');

const nationSchema = mongoose.Schema({
    username: String,
    userID: String,
    nation: String
});

module.exports = mongoose.model("nations", nationSchema);