/**
 * Module dependencies.
 */

var mongoose = require('mongoose');

/**
 * Aliases
 */

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

/**
 * Schema.
 */

var DocumentSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  owner: { type: ObjectId, required: true },
  created: { type: Date, required: true, default: Date.now },
  modified: { type: Date, required: true, default: Date.now }
});

/*
 * Export Document model.
 */

module.exports = mongoose.model('Document', DocumentSchema);