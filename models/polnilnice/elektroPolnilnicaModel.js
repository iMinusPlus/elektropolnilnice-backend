var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var AddressModel = require('./addressModel.js')
var StatusModel = require('./polnilnicaStatusModel.js')
var ConnectionModel = require('./connectionModel.js')

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
	'connections' : [{
		type: Schema.Types.ObjectId,
		ref: 'connection'
	}],
	'dateCreated' : Date,
	'dateAddedToOurApp' : Date,
	// 'submissionStatusTypeID' : Number,
	'numberOfPoints' : Number,
	'status' : {
		type: Schema.Types.ObjectId,
		ref: 'polnilnicaStatus'
	},
	'dateLastCOnfirmed' : Date,
	'comments' : String
});

elektroPolnilnicaSchema.statics.getFromOpenChargeJson = function(json) {
	let getStatusType = StatusModel.getFromOpenChargeJson(json.StatusType)
	let getAddress = AddressModel.getFromOpenChargeJson(json.AddressInfo)
	let getConnections = json.Connections.map(conn => ConnectionModel.getFromOpenChargeJson(conn))

	return new this({
		idFromOpenCharge: json.id,
		dateLastVerified: json.DateLastVerified ? new Date(json.DateLastVerified) : null,
		UUID: json.UUID,
		dataProviderID: json.DataProvider.ID,
		usageCost: json.UsageCost,
		usageTypeID: json.UsageTypeID,
		connections: getConnections,
		dateCreated: json.DateCreated ? new Date(json.DateCreated) : null,
		submissionStatusTypeID: json.SubmissionStatusTypeID,
		numberOfPoints: json.NumberOfPoints,
		dateLastConfirmed: json.DateLastConfirmed ? new Date(jsonjson.DateLastConfirmed) : null,
		statusType: getStatusType,
		address: getAddress,
		comments: json.Comments
	})
}

module.exports = mongoose.model('elektroPolnilnica', elektroPolnilnicaSchema);
