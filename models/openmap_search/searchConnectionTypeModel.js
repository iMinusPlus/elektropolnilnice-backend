var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var searchConnectionTypeSchema = new Schema({
	'id' : Number,
	'formalName' : String,
	'discontinued' : Boolean,
	'obsolete' : Boolean,
	'title' : String
});

searchConnectionTypeSchema.statics.getFromJson = function (json) {
	return new this({
		id: json.ID,
		formalName: json.FormalName,
		discontinued: json.IsDiscontinued,
		obsolete: json.IsObsolete,
		title: json.Title
	})
}

module.exports = mongoose.model('searchConnectionType', searchConnectionTypeSchema);
