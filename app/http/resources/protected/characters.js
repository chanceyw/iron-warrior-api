// Module dependencies.
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Mystique = require('mystique');
var api = {};

// ALL
api.characters = function(req, res) {
  User.findById(req.user).exec((err, model) => {
    if (err) {
      return res.status(500).send(err);
    }

    req.store.renderItem(model, 'Character');
  });
};

api.editCharacter = function(req, res) {
  var Transformer = Mystique.getTransformer('Character');

  var data = Transformer.rawItem(req, Transformer.mapIn);

  return User.findById(req.params.id)
    .exec((err, model) => {
      if (err) {
        return res.status(500).send(err);
      }

      model.set(data);
      model.save((err) => {
        if (err) {
          return res.status(500).send(err);
        }

        req.store.renderItem(model, 'Character');
      });
    });
};

router.get('/characters', api.characters);

module.exports = router;
