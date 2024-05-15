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

/**
 * Pridobivanje iz connectionSchema
 */
connectionSchema.statics.getFromSearchConnection = function (from) {
	fromConnectionType = ConnectionTypeModel.getFromSearchConnectionType(from.connectionType)

	return new this({
		id: from.id,
		connectionType: fromConnectionType,
		reference: from.reference,
		amps: from.amps,
		voltage: from.voltage,
		powerKW: from.powerKW,
		curentType: from.curentType,
		quantity: from.quantity,
		comments: "OpenChargeMap comment " + from.comments
	})
}

module.exports = mongoose.model('connection', connectionSchema);
