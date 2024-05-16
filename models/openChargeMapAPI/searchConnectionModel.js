var mongoose = require('mongoose');
var SearchConnectionTypeModel = require('./searchConnectionTypeModel.js')
var SearchStatusTypeModel = require('./searchStatusTypeModel.js')
var Schema   = mongoose.Schema;

var searcConnectionSchema = new Schema({
	'id' : Number,
	// 'connectionTypeID' : Number,
	'connectionType' : {
		type: Schema.Types.ObjectId,
		ref: 'searchConnectionType'
	},
	'reference' : String,
	// 'statusTypeID' : Number,
	'statusType' : {
		type: Schema.Types.ObjectId,
		ref: 'searchStatusType'
	},
	'levelID' : Number,
	'amps' : Number,
	'voltage' : Number,
	'powerKW' : Number,
	'currentTypeID' : Number,
	'quantity' : Number,
	'comments' : String
});

searcConnectionSchema.statics.getFromJson = function (json) {
	let getConnectionType = SearchConnectionTypeModel.getFromJson(json.ConnectionType)
	let getStatusType = SearchStatusTypeModel.getFromJson(json.StatusType)

	return new this({
		id: json.ID,
		connectionType: getConnectionType,
		reference: json.Reference,
		statusType: getStatusType,
		levelID: json.LevelID,
		amps: json.Amps,
		voltage: json.Voltage,
		powerKW: json.PowerKW,
		currentTypeID: json.CurrentTypeID,
		quantity: json.Quantity,
		comments: json.Comments
	})
}

module.exports = mongoose.model('searchConnection', searcConnectionSchema);
