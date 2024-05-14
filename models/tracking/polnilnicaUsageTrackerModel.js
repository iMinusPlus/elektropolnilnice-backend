var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var polnilnicaUsageTrackerSchema = new Schema({
	'id' : Number,
	'polnilnica' : Number,
	'dateFrom' : Date,
	'dateTo' : Date,
	'ser' : String,
	'user' : Number
});

module.exports = mongoose.model('polnilnicaUsageTracker', polnilnicaUsageTrackerSchema);
