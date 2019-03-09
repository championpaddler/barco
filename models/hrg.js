var mongoose = require('../node_modules/mongoose');
var Schema = mongoose.Schema;

let HRG = new Schema({
  Name: String,
  Address: String,
  lat: String,
  long : String,
  bedcount: Number,
},{
    collection: 'HRG'
});

module.exports = mongoose.model('HRG', HRG);