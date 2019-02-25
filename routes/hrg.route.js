const express = require('../node_modules/express');
const HRGRoutes = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const crypto = require('crypto');


// Require model in our routes module
let Business = require('../models/hrg');

// Defined Create route
HRGRoutes.route('/create').post(function (req, res) {
  try {
    Business.findOne({ 'Email': req.body.Email }, function (err, business) {
      if (business == null) {

        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(req.body.Password, salt, function (err, hash) {
            var data = {};
            data['Name'] = req.body.Name;
            data['Email'] = req.body.Email;
            data['Password'] = hash;

            let newuser = new Business(data);
            newuser.save()
              .then(user => {
                res.status(200).json({ 'Status': 'Success Created' });
              })
              .catch(err => {
                res.status(400).json({ 'Status': 'Error Processing Data' });
              });

          });
        });
      }
      else {
        res.status(400).json({ 'Status': 'User With THis email already exists' });

      }


    });

  } catch (error) {
    res.status(400).json({ 'Status': error });


  }



});



// Defined Get Data Route
HRGRoutes.route('/getusersdata').get(function (req, res) {
  Business.find({}, function (err, userdata) {
    res.send({"Status":"Api is Working " ,"Data": userdata});
  });
});

/// Defined Forgot Route
HRGRoutes.route('/forgot').post(function (req, res) {
  try {
    Business.findOne({ 'Email': req.body.Email }, function (err, userdata) {
      if (userdata != null) {
        crypto.randomBytes(256, function (err, buf) {
          userdata.resetPasswordToken = buf.toString('hex');
          userdata.resetPasswordExpires = Date.now() + 25920000  ; // 3days token period
          userdata.save()
            .then(user => {
              res.status(200).json({ 'Status': 'Reset token is set, with time period of 3 Days' });
            })
            .catch(err => {
              res.status(400).json({ 'Status': error });
            });
        });
      }
      else {
        res.status(400).json({ 'Status': "User Doesn't exist" });
      }
    });
    
  } catch (error) {
    res.status(400).json(error);
  }
});


// Defined Reset Route
HRGRoutes.route('/reset').post(function (req, res) {
 try {
  Business.findOne({ 'Email': req.body.Email }, function (err, userdata) {
    if (userdata != null) {
      if (userdata.resetPasswordExpires >= Date.now() && userdata.resetPasswordToken === req.body.token) {

        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(req.body.Password, salt, function (err, hash) {
            userdata.Password = hash;
            userdata.save()
              .then(user => {
                res.status(200).json({ 'Status': 'Password is Updated' });
              })
              .catch(err => {
                res.status(400).json({ 'Status': error });
              });
          });
        });
      }
      else {
        res.status(400).json({ 'Status': "Token Is Invalid" });
      }
    }
    else {
      res.status(400).json({ 'Status': "User Doesn't exist" });
    }
  });
 } catch (error) {
  res.status(400).send(error);
}
});


//  Defined Login route
HRGRoutes.route('/login').post(function (req, res) {
  try {
    Business.findOne({ 'Email': req.body.Email }, function (err, business) {
      if (business != null) {
        bcrypt.compare(req.body.Password, business['Password'], function (err, response) {
          if (response) {
            res.status(200).json({ 'Status': 'User Login Success' });
          }
          else {
            res.status(400).json({ 'Status': 'User Login Error' });
          }
        });
      }
      else {
        res.status(400).json({ 'Status': "User Doesn't exist" });
      }

    })

  } catch (error) {
    res.status(400).json({ 'Error': error });
  }

});



// test route
HRGRoutes.route('/').get(function (req, res) {
  
    res.send({"Status":"Api is Working"});
  
});
module.exports = HRGRoutes;