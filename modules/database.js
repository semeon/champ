var logPref = 'DB: ';
var dbEnv = require('../env/mongodb.js');
var dbUrl = dbEnv.url();

var mongoose = require('mongoose');
mongoose.connect(dbUrl);

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


// Models
var driverSchema = mongoose.Schema({id: String, name: String });
var Driver = mongoose.model('Driver', driverSchema);



exports.getDrivers = function(callback) {

	var result = [];
  	console.log(logPref + 'Requesting Drivers...');
	Driver.find(function (err, result) {
	  if (err) {
	  	console.log(logPref + 'Could not find data in DB.');
	  } else {
	  	console.log(logPref + 'Drivers found:');
		console.log(result);
	  	console.log('------------------------');
	  	callback(result);
	  }
	});
}

exports.addDriverDebug = function() {
	var drv = new Driver({ id: 'stig', name: 'The Stig' });
  	console.log('DEBUG: Creating new driver:');
	console.log(drv);

	drv.save(function (err) {
	  if (err) {
	  	console.log('Could not save data to DB.');
	  	console.log(err);
	  } else {
	  	console.log('Data was successfully saved to DB.');
	  }
	});
}