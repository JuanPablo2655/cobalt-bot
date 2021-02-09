const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    username: { type: String, require: false },
    userID: { type: String, require: false },
    owner: { type: Boolean, require: false, default: false },
    director: { type: Boolean, require: false, default: false }
});

module.exports = mongoose.model("admin", adminSchema);