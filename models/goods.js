var mongoose = require('mongoose');

var GoodSchema = mongoose.Schema({
	goods:Array
});

var GoodModel = mongoose.model('good',GoodSchema);

module.exports = GoodModel;