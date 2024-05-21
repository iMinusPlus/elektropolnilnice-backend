var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var polnilnicaStatusSchema = new Schema({
	'id' : Number,
	'operational' : Boolean,
	'userSelectable' : Boolean,
	'currentlyOccupied' : Boolean,
	'title' : String
});

polnilnicaStatusSchema.statics.getFromOpenChargeJson = function(json) {
	if (json === null) return null;
	return new this({
		id: json.ID,
		operational: json.IsOperational,
		userSelectable: json.IsUserSelectable,
		title: json.Title
	})
}

module.exports = mongoose.model('polnilnicaStatus', polnilnicaStatusSchema);
