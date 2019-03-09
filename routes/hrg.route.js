const express = require('../node_modules/express');
const HRGRoutes = express.Router();
var request = require('request');



// Require model in our routes module
let Business = require('../models/hrg');

// Defined Create route
HRGRoutes.route('/gethospitals').get(function (req, res) {
  try {
      // res.send(JSON.parse(body)["resourceSets"][0]["resources"][0]["results"]);
      
      Business.find({}).limit(5).exec( function (err, userdata) {
        var distancearray= [];
        console.log(req.query.coordinates);
      userdata.forEach(function(element) {
        request('https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins='+req.query.coordinates+'&destinations='+element['lat']+','+element['long']+'&travelMode=driving&key=AgSDEuD8ucPw-rHtVEieHGwVHxvfiieVkfnOVNqlw0cs3X3M5_IWgiZ1qjlDagaD&distanceUnit=km&timeUnit=minutes', function (error, response, body) {
        distancearray.push({"data":element,"distance":JSON.parse(body)["resourceSets"][0]["resources"][0]["results"][0]['travelDistance']});
        if(Object.keys(distancearray).length===Object.keys(userdata).length)
        {
          distancearray.sort(function(a, b){
            return a.distance-b.distance
        })
          res.send(distancearray);
        }
        });
        });
          // res.send({"Status":"Api is Working " ,"Data": userdata});
        });
      // var data = {};
      // data['Name'] = req.body.Name;
      // data['Email'] = req.body.Email;
      // data['Password'] = hash;

      // let newuser = new Business(data);
      // newuser.save()
      //   .then(user => {
      //     res.status(200).json({ 'Status': 'Success Created' });
      //   })
      //   .catch(err => {
      //     res.status(400).json({ 'Status': 'Error Processing Data' });
      //   });

    
    // distance.matrix(origins, destinations, function (err, distances) {
    //   if (!err)
    //     res.send(distances, body);
    // })

  } catch (error) {
    res.status(400).json({ 'Status': error });


  }



});

// HRGRoutes.route('/updatefile').get(function (req, res) {
//   try {

//     const csvFilePath=path.join(__dirname+'/hospitals_lat_lng_sheet.csv')
// const csv=require('csvtojson')
// csv()
// .fromFile(csvFilePath)
// .then((jsonObj)=>{

// jsonObj.forEach(element => {
//   console.log(element);


//   var data = {};
//   data['Name'] = element['Name of Hospital'];
//   data['Address'] = element['Address'];
//   data['lat'] = element['Latitude'];
//   data['long'] = element['Longitude'];
//   data['bedcount'] = Math.floor(Math.random()*50);
//   console.log(data);


//   let newuser = new Business(data);
//   newuser.save()
//     .then(user => {
      
//     })
//     .catch(err => {
//       res.status(400).json({ 'Status': 'Error Processing Data' });
//     });
  
// }); 
//  /**
//      * [
//      * 	{a:"1", b:"2", c:"3"},
//      * 	{a:"4", b:"5". c:"6"}
//      * ]
//      */ 
// })

    

//   } catch (error) {
//     res.status(400).json({ 'Status': error });


//   }



// });



// test route
HRGRoutes.route('/').get(function (req, res) {

  res.send({ "Status": "Api is Working" });

});
module.exports = HRGRoutes;