const mongoose = require('mongoose');

const nationSchema = mongoose.Schema({
    username: { type: String, require: false },
    userID: { type: String, require: false },
    nation: { type: String, require: false },
    verified: {type: Boolean, require: false, default: false}
});

module.exports = mongoose.model("nations", nationSchema);