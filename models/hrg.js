const mongoose = require('../node_modules/mongoose');
const Schema = mongoose.Schema;

let HRG = new Schema({
  Name: String,
  Email: String,
  Password : String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
},{
    collection: 'HRG'
});

module.exports = mongoose.model('HRG', HRG);