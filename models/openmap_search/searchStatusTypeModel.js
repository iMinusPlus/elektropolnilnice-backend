var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var searchStatusTypeSchema = new Schema({
	'id' : Number,
	'operational' : Boolean,
	'userSelectable' : Boolean,
	'title' : String
});

module.exports = mongoose.model('searchStatusType', searchStatusTypeSchema);
