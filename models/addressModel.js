var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var addressSchema = new Schema({
	'id' : Number,
	'title' : String,
	'town' : String,
	'postcode' : String,
	'country' : String,
	'latitude' : String,
	'longitude' : String
});

module.exports = mongoose.model('address', addressSchema);