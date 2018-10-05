var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	username:String,
	password:String
});

var UserModel = mongoose.model('user',UserSchema);

module.exports = UserModel;

