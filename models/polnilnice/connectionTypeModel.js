var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var connectionTypeSchema = new Schema({
	'id' : Number,
	'name' : String,
	'discontinued' : Boolean,
	'obsolete' : Boolean,
	'title' : String
});

module.exports = mongoose.model('connectionType', connectionTypeSchema);
