var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var searchStatusTypeSchema = new Schema({
	'id' : Number,
	'operational' : Boolean,
	'userSelectable' : Boolean,
	'title' : String
});

searchStatusTypeSchema.statics.getFromJson = function(json) {
	return new this({
		id: json.ID,
		operational: json.IsOperational,
		userSelectable: json.IsUserSelectable,
		title: json.Title
	})
}

module.exports = mongoose.model('searchStatusType', searchStatusTypeSchema);
