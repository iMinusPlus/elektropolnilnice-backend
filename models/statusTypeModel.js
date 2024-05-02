var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var statusTypeSchema = new Schema({
	'id' : Number,
	'operational' : Boolean,
	'userSelectable' : Boolean,
	'title' : String
});

module.exports = mongoose.model('statusType', statusTypeSchema);
