

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

    };
  },

  mapIn(req) {
    return {
    };
  },
});

Mystique.registerTransformer('Character', ProfileTransformer);
