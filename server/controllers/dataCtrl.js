var logPref = '[Data Ctrl] ';

// Models
var dataMdl = require('../models/dataMdl');


// Page titles
var pageTitles = {};
pageTitles['drivers'] = 'Пилоты';
pageTitles['teams'] = 'Команды';
pageTitles['seasons'] = 'Сезоны';
pageTitles['rules'] = 'Схемы начисления';
pageTitles['races'] = 'Этапы';

// Data type mapping
function getDataType (urlParam) {
	return String(urlParam).toLowerCase();
}

// Page Renderers
exports.showItemsPage = function(req, res) {
	var dataType = getDataType(req.params.dataType);
	console.log(logPref + dataType);
	var renderer = function(data) {
		res.render( 'admin/item_list', 
								{ title: pageTitles[dataType],
									 page: dataType,
									 user: req.user,
									 data: data
								}
							);
	}

	var model = dataMdl.getModel(dataType);
	console.log(logPref + 'Model: ' + model.modelName);
	if (model) {
		dataMdl.getItemList(model, false, renderer);

	} else {
		res.redirect('/admin/error');  
	}
};



// Post request
exports.save = function(req, res){
	console.log(logPref + 'Processing save request.');
	console.log('=====================================================================================');

	var dataType = getDataType(req.params.dataType);
	console.log(logPref + dataType);

	console.log(logPref + 'Request body:');
	console.log('------------------------------');
	console.log(req.body);
	console.log('------------------------------');
	console.log('');

	console.log(logPref + 'Creating object:');
	console.log('------------------------------');
	var obj = req.body.item;
	obj.type = dataType;
	console.log(obj);
	console.log('------------------------------');
	console.log('');

	console.log(logPref + 'Children:');
	console.log('------------------------------');
	console.log(req.body.children);
	console.log('------------------------------');
	console.log('');


	var model = dataMdl.getModel(dataType);
	console.log(logPref + 'Model: ' + model.modelName);
	console.log('');


	var callback = function(result) {
		console.log(logPref + 'Save callback result');
		console.log('------------------------------');
		console.log(result);
		console.log('------------------------------');
		res.send(result);		

		processChildren(result, req.body.children);

	}

	if (model) {
		console.log(logPref + 'Saving model..');
		console.log('------------------------------');
		console.log('');
		dataMdl.saveItem(model, obj._id, obj, callback);

	} else {
		res.redirect('/admin/error');  
	}


	var processChildren = function(obj, children) {
		var childType = obj.children_type;

		if (childType && children && children.length>0) {
			console.log(logPref + ' -- Processing children.');			
	
			var childrenModel = dataMdl.getModel(childType);
			console.log(logPref + ' -- Children model: ' + childrenModel.modelName);

			for (var i = 0; i < children.length; i++) {
				var child = children[i];
				child.parent_id = obj._id;
				dataMdl.saveItem(childrenModel, child._id, child, callback);
			};
		} else {
			console.log(logPref + ' -- No children for object: ');
			console.log(obj);
		}

	}


};



// AJAX get request
exports.getItemsData = function(req, res) {

	var dataType = getDataType(req.params.dataType);
	console.log(logPref + 'Data type: ' + dataType);

	var query = req.query;
	console.log(logPref + 'Query: ' + query);
	console.log(query);

	if ( isEmptyObject(query) ) {
		query = false;
	}


	var renderer = function(data) {
		res.send(data);
	}

	var model = dataMdl.getModel(dataType);
	console.log(logPref + 'Model: ' + model.modelName);
	if (model) {
		dataMdl.getItemList(model, query, renderer);
	} else {
		res.redirect('/admin/error');  
	}
};




exports.getItem = function(req, res) {

	var dataType = getDataType(req.params.dataType);
	console.log(logPref + 'Data type: ' + dataType);

	var itemId = req.params.id;
	console.log(logPref + 'Item id: ' + itemId);

	var renderer = function(data) {
		res.send(data);
	}

	var model = dataMdl.getModel(dataType);
	console.log(logPref + 'Model: ' + model.modelName);
	if (model) {
		dataMdl.getItem(model, id, renderer);
	} else {
		res.redirect('/admin/error');  
	}
};

exports.del = function(req, res){
	console.log(logPref + 'Processing delete request!!!!!!!!!!!!!!!!!!!!!!!:');
	console.log('=====================================================================================');
	
	console.log(req.query);

	var dataType = getDataType(req.params.dataType);
	console.log(logPref + dataType);


	var objId = req.params.id;
	console.log(objId);

	var callback = function(result) {
		console.log(logPref + 'delete callback');
		console.log(result);
		res.send(result);
	}

	var model = dataMdl.getModel(dataType);
	console.log(logPref + 'Model: ' + model.modelName);
	if (model) {
		// dataMdl.markItemAsDeleted(model, objId, callback);
		dataMdl.deleteItemFromDb(model, objId, callback);
	} else {
		res.send('error');  
	}
};

function isEmptyObject(obj) {
	return !Object.keys(obj).length;
}