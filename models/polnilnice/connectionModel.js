var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var connectionSchema = new Schema({
	'id' : Number,
	'connectionType' : Number,
	'reference' : String,
	'amps' : Number,
	'voltage' : Number,
	'powerKW' : Number,
	'curentType' : Number,
	'quantity' : Number,
	'comments' : String
});

module.exports = mongoose.model('connection', connectionSchema);
