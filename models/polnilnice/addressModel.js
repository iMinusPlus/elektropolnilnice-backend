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

/**
 * Pridobivanje iz searchAddressModel.js
 */
addressSchema.statics.getFromSearchAddress = function (from) {
	return new this({
		id: from.id, //Todo random number
		title: from.title,
		town: from.town,
		postcode: from.postcode,
		country: from.country,
		latitude: from.latitude,
		longitude: from.longitude
	})
}

module.exports = mongoose.model('address', addressSchema);
