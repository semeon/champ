var logPref = '[DB] ';
var dbEnv = require('../env/mongodb.js');
var dbUrl = dbEnv.url();

var mongoose = require('mongoose');
mongoose.connect(dbUrl);

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


// Models
// var driverSchema = mongoose.Schema({id: String, name: String, nick: String, email: String, tel: String});
var driverSchema = mongoose.Schema({name: String, nick: String, email: String, tel: String});
var Driver = mongoose.model('Driver', driverSchema);

// System
exports.getSettings = function() {
	return dbUrl;
}

// Data handling
// ------------------------

	// Drivers
	// ---------
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

		exports.saveDriver = function(objId, driver, callback) {
			var result = '';
			console.log(logPref + 'Saving driver to DB...');
			console.log(callback);

			if (objId) {
			// Update existing
				var query = { _id: objId };
				// var options = {upsert: true};
				var options = {};
				Driver.findOneAndUpdate(query, driver, options, callback)

			} else {
			// Create new
				var newDriver = new Driver(driver);

				newDriver.save(
					function (err) {
						if (err) {
							console.log(logPref + 'Could not save data to DB.');
							console.log(err);
						} else {
							console.log('logPref + Data was successfully saved to DB.');
						}
	
						callback(err);
					});				
			}


		  // callback(result);
		}