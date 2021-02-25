const mongoose = require('mongoose');

const statsSchema = mongoose.Schema({
    serverID: { type: String, require: false },
    commands: { type: Array, require: false,
        default: [{
            cmdName: { type: String, require: true },
            timesRan: { type: Number, require: false, default: 1 }
        }]
    },
});

module.exports = mongoose.model("stats", statsSchema);