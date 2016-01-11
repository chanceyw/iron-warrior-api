

var Mystique = require('mystique');

var ProfileTransformer = Mystique.Transformer.extend({
  resourceName: 'character',
  mapOut: function(character) {
    return {
      id: character.id,
      roles: character.roles,
      name: character.name,
      characterClass: character.characterClass,
      damage: character.damage,
      cash: character.cash,
      experience: character.experience,
      inventory: character.inventory,
    };
  },

  mapIn(req) {
    return {
      roles: req.getJson('character.roles'),
      name: req.getJson('character.name'),
      characterClass: req.getJson('character.characterClass'),
      damage: req.getJson('character.damage'),
      cash: req.getJson('character.cash'),
      experience: req.getJson('character.experience'),
      inventory: req.getJson('character.inventory'),
    };
  },
});

Mystique.registerTransformer('Character', ProfileTransformer);
