const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const teamSchema = new Schema({
  name: {type: String, required: true},
  messages: Array
})
const Team = mongoose.model('team', teamSchema);

module.exports = Team;
