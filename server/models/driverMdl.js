var logPref = '[Driver Model] ';
var dbEnv = require('../../settings/mongodb.js');
var mongoose = dbEnv.initMongoose();

var driverSchema = mongoose.Schema({name: String, nick: String, email: String, tel: String, deleted: Boolean});
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

exports.saveDriver = function(objId, driver, callback) {
	console.log(logPref + 'Saving driver to DB...');

	driver.deleted = false;

	if (objId) {
	// Update existing
		Driver.findByIdAndUpdate(objId, driver, callback)
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
}

exports.markDriverAsDeleted = function(objId, callback) {
	console.log(logPref + 'Deleting driver...');

	// Soft delete
	Driver.findById(id, 
		function (err, driver) {

			if (err) {
				callback(err);
			} else {
				driver.update({deleted: true}, callback);
			}


		});

}

exports.deleteFromDb = function(objId, callback) {
	console.log(logPref + 'Deleting driver: ' + objId);
	Driver.findByIdAndRemove(objId, 
		function (err) {

			if (err) {
				callback(err);
			} else {
				callback('Driver removed from DB forever.');
			}


		});
}		