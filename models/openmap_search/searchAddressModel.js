var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var searchAddressSchema = new Schema({
	'id' : Number,
	'title' : String,
	'addressLine1' : String,
	'addressLine2' : String,
	'town' : String,
	'postcode' : String,
	'country' : String,
	'latitude' : String,
	'longitude' : String
});

searchAddressSchema.statics.getFromJson = function (json) {
	return new this({
		id: json.ID,
		title: json.Title,
		addressLine1: json.AddressLine1,
		addressLine2: json.AddressLine2,
		town: json.Town,
		postcode: json.Postcode,
		country: json.Country,
		latitude: json.Latitude,
		longitude: json.Longitude,
	})
}

module.exports = mongoose.model('searchAddress', searchAddressSchema);
