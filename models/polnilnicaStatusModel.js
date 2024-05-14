var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var polnilnicaStatusSchema = new Schema({
	'id' : Number,
	'operational' : Boolean,
	'userSelectable' : Boolean,
	'currentlyOccupied' : Boolean,
	'title' : String
});

module.exports = mongoose.model('polnilnicaStatus', polnilnicaStatusSchema);
