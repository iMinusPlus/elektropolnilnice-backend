var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var searchConnectionTypeSchema = new Schema({
	'id' : Number,
	'formalName' : String,
	'discontinued' : Boolean,
	'obsolete' : Boolean,
	'title' : String
});

module.exports = mongoose.model('searchConnectionType', searchConnectionTypeSchema);
