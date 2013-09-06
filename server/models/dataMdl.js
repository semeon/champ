// Config
// ------------------------------------
var logPref = '[Data Model] ';
var dbEnv = require('../../settings/mongodb.js');
var mongoose = dbEnv.initMongoose();

// Models
// ------------------------------------
var driverSchema = mongoose.Schema({name: String, 
																		nick: String, 
																		email: String, 
																		tel: String, 
																		deleted: Boolean});

var teamSchema = mongoose.Schema({name: String, 
																	deleted: Boolean});

var seasonSchema = mongoose.Schema({name: String, 
																		completed: Boolean, 
																		deleted: Boolean});

var raceSchema = mongoose.Schema({name: String, 
																	date: String, 
																	season_id: String, 
																	deleted: Boolean});

var resultSchema = mongoose.Schema({name: String, 
																		date: String, 
																		race_id: String, 
																		deleted: Boolean});

// var Driver = mongoose.model('Driver', driverSchema);
// var Team = mongoose.model('Team', teamSchema);

var modelMap = {};
modelMap['Driver'] 	= mongoose.model('Driver', driverSchema);
modelMap['Team'] 		= mongoose.model('Team', teamSchema);
modelMap['Season'] 	= mongoose.model('Season', teamSchema);


exports.getModel = function(modelName) {
	console.log(logPref + 'modelName requested: ' + modelName);
	if ( modelMap[modelName] ) {
		return modelMap[modelName];
	} else {
		return false;
	}

}

// Methods
// ------------------------------------
exports.getItemList = function(Model, callback) {

  console.log(logPref + 'Requesting items of collection ' + Model.modelName);
	// console.log(Model);

	Model.find(function (err, result) {
	  if (err) {
	  	console.log(logPref + 'Could not find data in DB.');
	  } else {
			console.log(logPref + Model.modelName + ' items found:');
			console.log(result);
			console.log('------------------------');
			callback(result);
	  }
	});
}

exports.saveItem = function(Model, objId, obj, callback) {
	console.log(logPref + Model.modelName + ' - Saving obj to DB');

	obj.deleted = false;

	if (objId) {
	// Update existing
		Model.findByIdAndUpdate(objId, obj, callback)
	} else {
	// Create new
		var newItem = new Model(obj);

		newItem.save(
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

exports.markItemAsDeleted = function(Model, objId, callback) {
	console.log(logPref + Model.modelName + ' - Deleting obj: ' + objId);

	// Soft delete
	Model.findById(id, 
		function (err, obj) {
			if (err) {
				callback(err);
			} else {
				obj.update({deleted: true}, callback);
			}
		});
}

exports.deleteItemFromDb = function(Model, objId, callback) {
	console.log(logPref + Model.modelName + ' - Deleting obj: ' + objId);
	Model.findByIdAndRemove(objId, 
		function (err) {
			if (err) {
				callback(err);
			} else {
				callback(logPref + Model.modelName + ' - Item removed from DB forever.');
			}
		});
}		