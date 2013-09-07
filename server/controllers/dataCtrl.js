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
	var dataType = getDataType(req.params.dataType);
	console.log(logPref + dataType);

	console.log(logPref + 'Processing save request:');
	console.log(req.body);

	console.log(logPref + 'Creating object:');
	var objId = req.body.id;
	var obj = req.body.data;
	obj.type = dataType;
	console.log(obj);

	var callback = function(result) {
		console.log(logPref + 'save callback');
		console.log(result);
		res.redirect('/admin/' + dataType);
	}

	var model = dataMdl.getModel(dataType);
	console.log(logPref + 'Model: ' + model.modelName);
	if (model) {
		dataMdl.saveItem(model, objId, obj, callback);
	} else {
		res.redirect('/admin/error');  
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

	var itemId = getDataType(req.params.id);
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
	var dataType = getDataType(req.params.dataType);
	console.log(logPref + dataType);

	console.log(logPref + 'Processing delete request:');
	console.log(req.query);

	var objId = req.query.id;
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