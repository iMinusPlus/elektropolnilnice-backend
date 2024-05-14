var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

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

module.exports = mongoose.model('connection', connectionSchema);
