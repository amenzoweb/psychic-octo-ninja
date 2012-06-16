/**
 * Module dependencies.
 */

var express = require('express')
  , Resource = require('express-resource')
  , mongoose = require('mongoose')
  , account_controller = require('./controllers/account_controller.js')
  , document_controller = require('./controllers/document_controller.js');

/**
 * Environment variables.
 */

var port = process.env.PORT || 3000
  , db = process.env.DB_URL || 'mongodb://localhost/db';

/**
 * Create server.
 */

var app = module.exports = express.createServer();

/**
 * Configure server.
 */

app.configure(function() {
  app.use(express.logger());
  app.use(express.bodyParser());
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

/**
 * Configure mongoose.
 */

mongoose.connect(db);

/**
 * Routes.
 */

// Public
app.post('/account', account_controller.create);

// Authenticate all routes/resource defined after this.
app.all('*', account_controller.authenticate);

// Secured
app.resource('documents', document_controller);

/**
 * Ninja go!
 */

app.listen(port);