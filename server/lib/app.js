//Mongoose
const mongoose = require('mongoose');
const restify = require('express-restify-mongoose');
const User    = require('../models/user');
const Comment = require('../models/Comment');
const Project = require('../models/Project');
const Vote    = require('../models/Vote');
const Progress = require('../models/Progress');
//Other middlewares
const express       = require('express');
const methodOverride = require('method-override');
const path          = require('path');
const bodyParser    = require('body-parser');
const logger        = require('morgan');
//For Satellizer
const moment = require( 'moment' );
const jwt = require( 'jwt-simple');
//App and routers
const app           = express();
const userAuthRouter = require('./user-router');
const publicRouter  = require('./public-router');
const userRouter    = express.Router();
const commentRouter = express.Router();
const projectRouter = express.Router();
const voteRouter    = express.Router();
const progressRouter = express.Router();
//const public        = path.join( __dirname + '/public');
//const auth = require( './auth.js' ); //un-comment once we have auth router in place
app.use(logger('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use( bodyParser.urlencoded({ extended: false }) );

app.use(methodOverride());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

restify.serve(commentRouter, Comment, {name: 'comments'});
restify.serve(projectRouter, Project, {name: 'projects'});
restify.serve(userRouter, User, {name: 'users'});
restify.serve(voteRouter, Vote, {name: 'votes'});
restify.serve(progressRouter, Progress, {name: 'progresses'});

app.use('/projects', publicRouter);
app.use('/auth', userAuthRouter);
app.use( commentRouter);
app.use( projectRouter);
app.use( userRouter);
app.use( voteRouter);
app.use( progressRouter);
app.use(function(req, res, next) {
  res.status(404).send('404, no page found: ' + req.url);
});
module.exports = app;

/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
function ensureAuthenticated(req, res, next) {
  if ( req.method === 'OPTIONS' ) return next(); //Pass this to router. Our router doesn't have any method hat deals with OPTIONS request

  if (!req.header('Authorization')) {
    console.log(req.headers);
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('Authorization').split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, process.env.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}
