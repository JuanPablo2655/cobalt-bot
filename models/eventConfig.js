const mongoose = require('mongoose');

const eventConfigSchema = mongoose.Schema({
    guildID: { type: String, require: true },
    roles: { type: Array, require: false, default: [] }
});

module.exports = mongoose.model("eventConfig", eventConfigSchema);