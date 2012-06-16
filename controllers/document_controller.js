/**
 * Module dependencies.
 */

var Document = require('../models/document.js');

/**
 * GET /documents
 * Get list of documents for account.
 * TODO: Paging
 */

exports.index = function(req, res, next) {
  // Get Documents by owner.
  Document.find({ owner: req.account_id }, function(err, documents) {
    if(err) {
      return next(err);
    }

    res.send(documents);
  });
};

/**
 * POST /documents
 * Create a Document for the account making the request.
 */

exports.create = function(req, res) {
  var document = new Document();
  
  document.title = req.body.title;
  document.content = req.body.content;
  document.owner = req.account_id;
  document.save(function(err) {
    if (err) {
      return next(err);
    }

    res.send(document, 201);
  });
};

/**
 * GET /documents/:id
 * Get the specified document.
 */

exports.show = function(req, res) {
  var query = { _id: req.params.document, owner: req.account_id };

  // Get Document by id and owner.
  Document.findOne(query, function(err, document) {
    if (err) {
      return next(err);
    }

    if (!document) {
      return res.send(404);
    }

    res.send(document);
  });
};

/**
 * PUT /documents/:id
 * Update the specified document.
 */
exports.update = function(req, res) {
  var query = { _id: req.params.document, owner: req.account_id };

  // Get Document by id and owner.
  Document.findOne(query, function(err, document) {
    if (err) {
      return next(err);
    }

    if (!document) {
      return res.send(404);
    }

    document.title = req.body.title;
    document.content = req.body.content;
    document.modified = new Date();
    document.save(function(err) {
      if (err) {
        return next(err);
      }

      res.send(document);
    });
  });
};

/**
 * DELETE /documents/:id
 * Delete the specified document.
 */

exports.destroy = function(req, res) {
  var query = { _id: req.params.document, owner: req.account_id };

  // Get Document by id and owner.
  Document.remove(query, function(err, document) {
    if (err) {
      return next(err);
    }
    
    if (!document) {
      return res.send(404);
    }

    res.send(204);
  });
};