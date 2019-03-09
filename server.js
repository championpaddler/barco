const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./DB');

const hrgrouteshandler = require('./routes/hrg.route');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


app.use('/*', function(req,res){
  res.send("Api is working");
});


var server_port = process.env.port || 4000
 
const server = app.listen(server_port, function () {
  console.log('Listening on port ' + server_port);
});