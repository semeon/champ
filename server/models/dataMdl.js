// Config
// ------------------------------------
var logPref = '[Data Model] ';
var dbEnv = require('../../settings/mongodb.js');
var mongoose = dbEnv.initMongoose();

// Models
// ------------------------------------
var driverSchema = mongoose.Schema({type: String,
																		name: String, 
																		nick: String, 
																		email: String, 
																		tel: String, 
																		deleted: Boolean});

var teamSchema = mongoose.Schema({type: String,
																	name: String, 
																	deleted: Boolean});

var seasonSchema = mongoose.Schema({type: String,
																		name: String, 
																		completed: Boolean,
																		children_type: String, 
																		deleted: Boolean});

var rulesSchema = mongoose.Schema({	type: String,
																		name: String, 
																		points: { type: Number, min: 0, max: 1000 }, 
																		season_id: mongoose.Schema.Types.ObjectId,
																		deleted: Boolean});

var raceSchema = mongoose.Schema({type: String,
																	name: String, 
																	date: String, 
																	place: String, 
																	season_id: mongoose.Schema.Types.ObjectId, 
																	deleted: Boolean});

var resultSchema = mongoose.Schema({type: String,
																		name: String, 
																		date: String, 
																		race_id: String, 
																		deleted: Boolean});

var modelMap = {};
modelMap['drivers'] 	= mongoose.model('drivers', driverSchema);
modelMap['teams'] 		= mongoose.model('teams', teamSchema);
modelMap['seasons'] 	= mongoose.model('seasons', seasonSchema);
modelMap['rules'] 	= mongoose.model('rules', rulesSchema);
modelMap['races'] 	= mongoose.model('races', raceSchema);

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
exports.getItemList = function(Model, query, callback) {
	console.log(logPref + 'Requesting items of collection ' + Model.modelName);

	var findExecuted = function (err, result) {
		if (err) {
			console.log(logPref + 'Could not find data in DB. Error: ');
			console.log(err);

		} else {
			console.log(logPref + Model.modelName + ' items found:');
			console.log(result);
			callback(result);
		}
	}

	if (query) {
		console.log(logPref + 'Find with query:');
		console.log(query);

		Model.find(query, findExecuted);
	} else {
		console.log(logPref + 'Find without query.');

		Model.find(findExecuted);
	}

}

exports.getItem = function(Model, id, callback) {
	console.log(logPref + 'Requesting items of collection ' + Model.modelName);
	// console.log(Model);
	Model.findById(id, function (err, result) {
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

exports.saveItem = function(dataType, objId, obj, callback) {
	console.log(logPref + ' - Saving obj to DB: ' + dataType);
	console.log('------------------------');
	console.log('');

	var Model = modelMap[dataType];
	console.log(logPref + 'Model: ' + Model.modelName);
	console.log('');


	// Prepare object for saving
	delete obj._id;


	if (objId) {
	// Update existing
		console.log(logPref + 'Updating existing, id=' + objId);
		console.log(obj);
		console.log('------------------------');
		console.log('');


		Model.findByIdAndUpdate(objId, obj, saveItemCb);

	} else {
	// Create new
		console.log(logPref + 'Creating new document');
		
		// Default field values for all new objects
		// ------------------------------------
		obj.deleted = false;
		obj.type = Model.modelName;

		// Set service fields for specific types
		// ------------------------------------
		if (Model.modelName == 'seasons') {
			obj.children_type = 'races';
			obj.completed = false;
		}

		console.log(logPref + ' - Model.modelName: ' + Model.modelName + '; Object:');
		console.log(obj);
		console.log(logPref + ' - Saving..');
		Model.create(obj, saveItemCb);				
	}

	function saveItemCb(err, product, num) {
		console.log(logPref + 'Saving results:');

		if (err) {
			console.log(logPref + 'Could not save data to DB.');
			console.log(err);
			callback(err);
		} else {
			console.log(logPref + 'Data was successfully saved to DB:');
			console.log('------------------------');
			console.log(product);
			console.log('------------------------');
			console.log('');
			callback(product);
		}
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