const mongoose = require('mongoose');

const modSchema = mongoose.Schema({
    username: { type: String, require: false },
    userID: { type: String, require: false },
    warns: { type: Number, require: false, default: 0 },
    gulags: { type: Number, require: false, default: 0 },
    ban: { type: Boolean, require: false, default: false }
});

module.exports = mongoose.model("moderation", modSchema);