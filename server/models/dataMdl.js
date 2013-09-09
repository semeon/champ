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
																		season_id: String,
																		deleted: Boolean});

var raceSchema = mongoose.Schema({type: String,
																	name: String, 
																	date: String, 
																	place: String, 
																	parent_id: String, 
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

exports.saveItem = function(Model, objId, obj, callback) {
	console.log(logPref + Model.modelName + ' - Saving obj to DB');
	console.log('------------------------');
	console.log('');

	// Prepare object for saving
	delete obj._id;

	if (objId) {
	// Update existing
		console.log(logPref + 'Updating existing, id=' + objId);
		console.log(obj);
		console.log('------------------------');
		console.log('');


		var operationResult = function (err, product, num) {
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


		Model.findByIdAndUpdate(objId, obj, operationResult);

	} else {
	// Create new
		console.log(logPref + 'Creating new document');
		obj.deleted = false;

		if (Model.modelName == 'seasons') {
			obj.children_type = 'races';
			obj.completed = false;
		}

		var newItem = new Model(obj);
		console.log(logPref + ' - Model.modelName: ' + Model.modelName);
		console.log(logPref + ' - newItem.modelName: ' + newItem.modelName);
		console.log(obj);

		console.log(logPref + ' - Saving..');
		newItem.save(operationResult);				

		// Model.create(obj, operationResult);				

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