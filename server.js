const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./DB');

const hrgrouteshandler = require('./routes/hrg.route');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
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


app.listen(process.env.PORT || 3000, function(){
});