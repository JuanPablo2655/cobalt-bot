const mongoose = require('mongoose');

const collectorSchema = mongoose.Schema({
    channelID: { type: String, require: true },
    roles: { type: Array, require: false, default: [{
        roleID: { type: String, require: true},
        messages: { type: Number, require: false, default: 1}
    }]},
});

module.exports = mongoose.model("collector", collectorSchema);