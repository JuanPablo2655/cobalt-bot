const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    name: String,
    pay: Number
});

module.exports = mongoose.model("job", jobSchema);