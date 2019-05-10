const mongoose = require('mongoose');

const nationSchema = mongoose.Schema({
    userID: String,
    nation: String
});

module.exports = mongoose.model('nation', nationSchema);