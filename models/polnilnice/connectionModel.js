var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ConnectionTypeModel = require('./connectionTypeModel.js')

var connectionSchema = new Schema({
	'id' : Number,
	'connectionType' : {
		type: Schema.Types.ObjectId,
		ref: 'connectionType'
	},
	'reference' : String,
	'amps' : Number,
	'voltage' : Number,
	'powerKW' : Number,
	'curentType' : Number,
	'quantity' : Number,
	'comments' : String
});

connectionSchema.statics.getFromOpenChargeJson = function (json) {
	let getConnectionType = ConnectionTypeModel.getFromOpenChargeJson(json.ConnectionType)

	return new this({
		id: json.ID,
		connectionType: getConnectionType,
		reference: json.Reference,
		levelID: json.LevelID,
		amps: json.Amps,
		voltage: json.Voltage,
		powerKW: json.PowerKW,
		currentTypeID: json.CurrentTypeID,
		quantity: json.Quantity,
		comments: json.Comments
	})
}

module.exports = mongoose.model('connection', connectionSchema);
