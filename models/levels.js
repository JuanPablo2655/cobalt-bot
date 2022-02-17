const mongoose = require('mongoose');

const levelsSchema = mongoose.Schema({
    username: { type: String, require: false },
    userID: { type: String, require: false },
    servers: { type: Array, require: false, default: [] },
    xp: { type: Number, require: false, default: 0 },
    lvl: { type: Number, require: false, default: 0 },
    totalXp: { type: Number, require: false, default: 0 },
    socialCredit: { type: Number, require: false, default: 1000 },
});

module.exports = mongoose.model('levels', levelsSchema);
