'use strict';
const express      = require('express');
const router       = express.Router();
const request      = require('request');
const jwt          = require('jwt-simple');
const qs           = require('querystring');
const User         = require('../models/user');
const moment       = require('moment');

/**
 * Save new user to db and give them a signed jwt token
 */
 function createJWT(user) {
   var payload = {
     sub: user._id,
     iat: moment().unix(),
     exp: moment().add(14, 'days').unix()
   };
   return jwt.encode(payload, process.env.TOKEN_SECRET);
 }

router.post('/signup', function(req, res) {
  User.findOne({ email: req.body.email }, function(err, existingUser) {
    if (existingUser) {
      return res.status(409).send({ message: 'Email is already taken' });
    }

    var user = new User({
      displayName: req.body.displayName,
      email: req.body.email,
      password: req.body.password
    });
    user.save(function(err, savedUser) {
      if (err) {
        res.status(500).send({ message: err.message });
      }
      res.send({ token: createJWT(savedUser), userId: savedUser._id  });
    });
  });
});

/**
 * Regular login for a user register with methods above
 * Using the +password param to tell mongo to include in query
 */

router.post('/login', function(req, res) {
  User.findOne({ email: req.body.email }, '+password', function(err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Invalid email and/or password' });
    }
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Invalid email and/or password' });
      }
      res.send({ token: createJWT(user), userId: user._id });
    });
  });
});

router.post('/twitter', function(req, res) {

  var requestTokenUrl = process.env.REQ_TOKEN_URL;
  var accessTokenUrl = process.env.ACC_TOKEN_URL;
  var profileUrl = process.env.PROF_URL;

  if (!req.body.oauth_token || !req.body.oauth_verifier) {
    var requestTokenOauth = {
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      callback: req.body.redirectUri
    };

    request.post({ url: requestTokenUrl, oauth: requestTokenOauth }, function(err, response, body) {
      var oauthToken = qs.parse(body);
      res.send(oauthToken);
    });
  } else {
    var accessTokenOauth = {
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      token: req.body.oauth_token,
      verifier: req.body.oauth_verifier
    };
    request.post({ url: accessTokenUrl, oauth: accessTokenOauth }, function(err, response, accessToken) {
      accessToken = qs.parse(accessToken);
      var profileOauth = {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        oauth_token: accessToken.oauth_token
      };
      request.get({
        url: profileUrl + accessToken.screen_name,
        oauth: profileOauth,
        json: true
      }, function(err, response, profile) {
        if (req.header('Authorization')) {
          User.findOne({ twitter: profile.id }, function(err, existingUser) {
            if (existingUser) {
              return res.status(409).send({ message: 'There is already a Twitter account that belongs to you' });
            }
            var token = req.header('Authorization').split(' ')[1];
            var payload = jwt.decode(token, process.env.TOKEN_SECRET);
            User.findById(payload.sub, function(err, user) {
              if (!user) {
                return res.status(400).send({ message: 'User not found' });
              }
              user.twitter = profile.id;
              user.displayName = user.displayName || profile.name;
              user.picture = user.picture || profile.profile_image_url.replace('_normal', '');
              user.save(function(err) {
                if(err) console.log(err);
                res.send({ token: createJWT(user), userId: user._id });
              });
            });
          });
        } else {
          User.findOne({ twitter: profile.id }, function(err, existingUser) {
            if (existingUser) {
              return res.send({ token: createJWT(existingUser), userId: existingUser._id });
            }
            var user = new User();
            console.log(user, '1');
            user.twitter = profile.id;
            user.displayName = profile.name;
            user.picture = profile.profile_image_url.replace('_normal', '');
                        console.log('user here', user);

            user.save(function(err) {
              if(err){
                res.status(500).send(err);
              }
              res.send({ token: createJWT(user), userId: user._id});
            });
          });
        }
      });
    });
  }
});

module.exports = router;
