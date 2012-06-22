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
  , db = process.env.MONGOHQ_URL || 'mongodb://localhost/db'
  , key = process.env.SSL_KEY_PATH
  , cert = process.env.SSL_CERT_PATH;

/**
 * Create server.
 */

var app;

if(key && cert) { // HTTPS
  app = module.exports = express.createServer({ key: key, cert: cert });
}
else { // HTTP
  console.log('Warning: Using HTTP');

  app = module.exports = express.createServer();
}

/**
 * Configure server.
 * NODE_ENV variable sets environment.
 * See: http://expressjs.com/guide.html#configuration
 */

// All environments
app.configure(function() {
  app.use(express.logger());
  app.use(express.bodyParser());
});

// Development environment
app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Production environment
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

app.listen(port, function() {
  console.log('Running...');
});