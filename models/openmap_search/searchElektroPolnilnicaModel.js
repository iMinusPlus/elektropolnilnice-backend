var mongoose = require('mongoose');
var SearchStatusTypeModel = require('./searchStatusTypeModel');
var SearchAddressModel = require('./searchAddressModel.js')
var SearchConnectionModel = require('./searchConnectionModel')
var Schema   = mongoose.Schema;

var searchElektroPolnilnicaSchema = new Schema({
	'id' : Number,
	'dateLastVerified' : Date,
	'UUID' : String,
	'dataProviderID' : Number,
	'usageCost' : String,
	'usageTypeID' : Number,
	// 'addressID' : Number,
	'address' : {
		type: Schema.Types.ObjectId,
		ref: 'searchAddress'
	},
	// 'connectionID' : Number,
	'connections' : [{
		type: Schema.Types.ObjectId,
		ref: 'searchConnection'
	}],
	'dateCreated' : Date,
	'submissionStatusTypeID' : Number,
	'numberOfPoints' : Number,
	// 'statusTypeID' : Number,
	'statusType' : {
		type: Schema.Types.ObjectId,
		ref: 'searchStatusType'
	},
	'dateLastConfirmed' : Date,
	'comments' : String
});

searchElektroPolnilnicaSchema.statics.getFromJson = function (data) {
	let getStatusType = SearchStatusTypeModel.getFromJson(data.StatusType);
	let getAddress = SearchAddressModel.getFromJson(data.AddressInfo)
	let getConnections = data.Connections.map(conn => SearchConnectionModel.getFromJson(conn));

	return new this({
		id: data.id,
		dateLastVerified: data.DateLastVerified ? new Date(data.DateLastVerified) : null,
		UUID: data.UUID,
		dataProviderID: data.DataProvider.ID,
		usageCost: data.UsageCost,
		usageTypeID: data.UsageTypeID,
		connections: getConnections, //tODO TO UREDITI KER JIH JE VEC LAHKO
		dateCreated: data.DateCreated ? new Date(data.DateCreated) : null,
		submissionStatusTypeID: data.SubmissionStatusTypeID,
		numberOfPoints: data.NumberOfPoints,
		// statusType: data.statusTypeID,
		dateLastConfirmed: data.DateLastConfirmed ? new Date(data.DateLastConfirmed) : null,
		statusType: getStatusType,
		address: getAddress,
		comments: data.Comments
	})
}

module.exports = mongoose.model('searchElektroPolnilnica', searchElektroPolnilnicaSchema);
