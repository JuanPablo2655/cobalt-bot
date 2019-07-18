const mongoose = require('mongoose');

const nationSchema = mongoose.Schema({
    username: String,
    userID: String,
    nationstates: String
});

module.exports = mongoose.model("nationstates", nationSchema);