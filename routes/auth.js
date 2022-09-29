// require variables
const express = require('express')
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');
require('../passport-config')(passport);
const jwt = require('jsonwebtoken');
const user = require('../models/user')
const User = require("../models/user");

router.post('/',  function(req, res) {

    
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            const token = jwt.sign(user.toJSON(), process.env.PASSPORT_SECRET);
            // return the information including token as JSON
            return res.json({success: true, token: 'JWT ' + token});
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
  });

router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
      next()
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

const getToken = (headers) => {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

module.exports = router;