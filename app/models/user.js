var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  roles: [{type: String}],

  // Game Data
  name: {type: String},
  characterClass:{type: String, default: 'Warrior'},
  damage: {type: Number, default: 0},
  cash: {type: Number, default: 0},
  experience: {type: Number, default: 0},
  inventory: [{type: String}],
});

UserSchema.path('password').set(function(value) {
  if (!value) {
    return this.password;
  }

  var salt = bcrypt.genSaltSync();

  return bcrypt.hashSync(value, salt);
});

UserSchema.methods.checkPassword = function(value, success, failure) {
  bcrypt.compare(value, this.password, function(err, result) {
    if (result) {
      success();
    } else {
      failure(err);
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
