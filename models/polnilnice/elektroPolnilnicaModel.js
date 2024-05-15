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

/**
 * Pridobivanje iz searchElektroPolnilnicaSchema
 */
elektroPolnilnicaSchema.statics.getFromSearchPolnilnica = function(from) {
	fromAddress = AddressModel.getFromSearchAddress(from.address)
	fromStatus = from.status ? StatusModel.getFromSearchStatus(from.status) : null //todo preveriti
	fromConnections = from.connections.map(conn => ConnectionModel.getFromSearchConnection(conn))

	return new this({
		// id: from.id,
		dateLastVerified: from.dateLastVerified,
		// UUID: from.UUID,
		dataProviderID: from.dataProviderID,
		usageCost: from.usageCost,
		usageType: from.usageType,
		address: fromAddress,
		connections: fromConnections,
		dateCreated: from.dateCreated,
		dateAddedToOurApp: Date.now(),
		// submissionStatusTypeID: ,
		numberOfPoints: from.numberOfPoints,
		// status: fromStatus,
		dateLastCOnfirmed: from.dateLastVerified,
		comments: "OpenChargeMap comment " + from.comment
	})
}

module.exports = mongoose.model('elektroPolnilnica', elektroPolnilnicaSchema);
