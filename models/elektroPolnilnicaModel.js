var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var elektroPolnilnicaSchema = new Schema({
	'id' : Number,
	'dateLastVerified' : Date,
	'UUID' : String,
	'dataProviderID' : Number,
	'usageCost' : String,
	'usageTypeID' : Number,
	'addressID' : Number,
	'connectionID' : Number,
	'dateCreated' : Date,
	'submissionStatusTypeID' : Number,
	'numberOfPoints' : Number,
	'statusTypeID' : Number,
	'dateLastConfirmed' : Date,
	'comments' : String
});

module.exports = mongoose.model('elektroPolnilnica', elektroPolnilnicaSchema);
