var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var searcConnectionSchema = new Schema({
	'id' : Number,
	'connectionTypeID' : Number,
	'reference' : String,
	'statusTypeID' : Number,
	'levelID' : Number,
	'amps' : Number,
	'voltage' : Number,
	'powerKW' : Number,
	'currentTypeID' : Number,
	'quantity' : Number,
	'comments' : String
});

module.exports = mongoose.model('searchConnection', searcConnectionSchema);
