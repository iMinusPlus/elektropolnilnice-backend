var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var elektroPolnilnicaSchema = new Schema({
	'id' : Number,
	'dateLastVerified' : Date,
	'UUID' : String,
	'dataProviderID' : Number,
	'usageCost' : String,
	'usageType' : Number,
	'address' : Number,
	'connections' : Number,
	'dateCreated' : Date,
	'dateAddedToOurApp' : Date,
	'submissionStatusTypeID' : Number,
	'numberOfPoints' : Number,
	'status' : Number,
	'dateLastCOnfirmed' : Date,
	'comments' : String
});

module.exports = mongoose.model('elektroPolnilnica', elektroPolnilnicaSchema);
