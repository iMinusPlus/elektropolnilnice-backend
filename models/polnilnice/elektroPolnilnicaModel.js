var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var elektroPolnilnicaSchema = new Schema({
	'id' : Number,
	'dateLastVerified' : Date,
	'UUID' : String,
	'dataProviderID' : Number,
	'usageCost' : String,
	'usageType' : Number,
	'address' : {
		type: Schema.Types.ObjectId,
		ref: 'address'
	},
	'connections' : [{ //todo tega prilagoditi da je array/list (mogoce bodo ti '[]' delovali)
		type: Schema.Types.ObjectId,
		ref: 'connection'
	}],
	'dateCreated' : Date,
	'dateAddedToOurApp' : Date,
	'submissionStatusTypeID' : Number,
	'numberOfPoints' : Number,
	'status' : {
		type: Schema.Types.ObjectId,
		ref: 'polnilnicaStatus'
	},
	'dateLastCOnfirmed' : Date,
	'comments' : String
});

module.exports = mongoose.model('elektroPolnilnica', elektroPolnilnicaSchema);
