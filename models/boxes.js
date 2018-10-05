var mongoose = require('mongoose');

var BoxSchema = mongoose.Schema({
	isCheck:Boolean
});

var BoxModel = mongoose.model('boxes',BoxSchema);

module.exports = BoxModel;

