var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var polnilnicaStatusSchema = new Schema({
	'id' : Number,
	'operational' : Boolean,
	'userSelectable' : Boolean,
	'currentlyOccupied' : Boolean,
	'title' : String
});

/**
 * Pridobivanje iz searchStatusTypeModel.js
 */
polnilnicaStatusSchema.statics.getFromSearchStatus = function (from) {
	return new this({
		// id: from.id, //todo random number
		operational: from.operational,
		userSelectable: from.userSelectable,
		currentlyOccupied: from.currentlyOccupied,
		title: from.title
	})
}

module.exports = mongoose.model('polnilnicaStatus', polnilnicaStatusSchema);
