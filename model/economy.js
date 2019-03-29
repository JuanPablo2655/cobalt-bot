const Schema = mongoose.Schema;

const economy = new Schema({
    userID: String,
    serverID: String,
    money: Number
});

module.exports = mongoose.module("ecomony", economy);
  