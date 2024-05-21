var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var connectionTypeSchema = new Schema({
	'id' : Number,
	'name' : String,
	'discontinued' : Boolean,
	'obsolete' : Boolean,
	'title' : String
});

connectionTypeSchema.statics.getFromSearchConnectionType = function (from) {
	return new this({
		id: from.id,
		name: from.name,
		discontinued: from.discontinued,
		obsolete: from.obsolete,
		title: from.title
	})
}

connectionTypeSchema.statics.getFromOpenChargeJson = function (json) {
	return new this({
		id: json.ID,
		name: json.FormalName,
		discontinued: json.IsDiscontinued,
		obsolete: json.IsObsolete,
		title: json.Title
	})
}

module.exports = mongoose.model('connectionType', connectionTypeSchema);
