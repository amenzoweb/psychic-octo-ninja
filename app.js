/**
 * Module dependencies.
 */

var fs = require('fs')
  , express = require('express')
  , Resource = require('express-resource')
  , mongoose = require('mongoose')
  , account_controller = require('./controllers/account_controller.js')
  , document_controller = require('./controllers/document_controller.js');

/**
 * Environment variables.
 */

var port = process.env.PORT
  , db = process.env.MONGO_URL
  , serverKey = process.env.SERVER_KEY_PATH
  , serverCert = process.env.SERVER_CERT_PATH
  , caCert = process.env.CA_CERT_PATH;

/**
 * Create server.
 */

var options = {
    requestCert: true
  , rejectUnauthorized: true
  , key: fs.readFileSync(serverKey)
  , cert: fs.readFileSync(serverCert)
  , ca: [ fs.readFileSync(caCert) ]
};

var app = module.exports = express.createServer(options);

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

// Routes that do not require user credentials.
app.post('/account', account_controller.create);

// Routes defined after this require user credentials.
app.all('*', account_controller.authenticate);
app.resource('documents', document_controller);

/**
 * Ninja go!
 */

app.listen(port, function() {
  console.log('Port: %d, Environment: %s, DB: %s', port, app.settings.env, db);
});