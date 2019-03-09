var express = require('express');
var  bodyParser = require('body-parser');
 var cors = require('cors');
 var  mongoose = require('mongoose');
var  config = require('./DB');

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

app.use('/api', hrgrouteshandler);


app.use('/*', function(req,res){
  res.send("Api is working");
});


app.listen(process.env.PORT || 3000, function(){
});