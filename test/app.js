
var app = require('../app.js')
  , express = require('express')
  , should = require('should');

describe('app', function() {
  it('Should be an instance of express.HTTPSServer', function(){
    app.should.be.an.instanceof(express.HTTPSServer);
  });
});