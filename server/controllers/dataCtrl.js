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
// ------------------------------------
exports.showRacesBySeasons = function(req, res) {

	var page = 'races_grouped';
	var model = dataMdl.getModel('seasons');
	console.log(logPref + 'Page: ' + page);

	var renderer = function(data) {
		res.render( 'admin/item_list', 
								{ title: 'Этапы',
									 page: page,
									 user: req.user,
									 data: data
								}
							);
	}

	console.log(logPref + 'Model: ' + model.modelName);
	if (model) {
		dataMdl.getItemList(model, false, renderer);

	} else {
		res.redirect('/admin/error');  
	}
};

exports.showItemsPageDefault = function(req, res) {
	var dataType = getDataType(req.params.dataType);
	var page = dataType;
	var model = dataMdl.getModel(dataType);
	console.log(logPref + 'Page: ' + page);

	var renderer = function(data) {
		res.render( 'admin/item_list', 
								{ title: pageTitles[dataType],
									 page: page,
									 user: req.user,
									 data: data
								}
							);
	}

	console.log(logPref + 'Model: ' + model.modelName);
	if (model) {
		dataMdl.getItemList(model, false, renderer);
	} else {
		res.redirect('/admin/error');  
	}
};



// Data requests
// ------------------------------------
exports.saveItem = function(req, res){
	console.log(logPref + 'Processing save request.');
	console.log('=====================================================================================');

	console.log(logPref + 'Request body:');
	console.log('------------------------------');
	console.log(req.body);
	console.log('------------------------------');
	console.log('');

	var dataType = getDataType(req.params.dataType);
	var dataItem = req.body.item;
	var dataItemChildren = req.body.children;

	console.log(logPref + 'Item data type: ' + dataType);
	console.log(logPref + 'Creating object:');
	console.log('------------------------------');
	console.log(dataItem);
	console.log('------------------------------');
	console.log('');

	console.log(logPref + 'Children:');
	console.log('------------------------------');
	console.log(dataItemChildren);
	console.log('------------------------------');
	console.log('');


	function saveCb(result) {
		console.log(logPref + 'Save callback result');
		console.log('------------------------------');
		console.log(result);
		console.log('------------------------------');
		res.send(result);

		if (result.children_type) {
			processChildren(result, dataItemChildren);
		}
	}

	if (dataType) {
		console.log(logPref + 'Call data model for saving..');
		console.log('------------------------------');
		console.log('');
		dataMdl.saveItem(dataType, dataItem._id, dataItem, saveCb);

	} else {
		res.redirect('/admin/error');  
	}


	function processChildren(obj, children) {
		var childType = obj.children_type;

		if (childType && children && children.length>0) {
			console.log(logPref + ' -- Processing children.');			
			console.log(logPref + '  - Children data type: ' + childType);
			console.log(logPref + '  - Children: ');
			console.log(children);

			for (var i = 0; i < children.length; i++) {
				var child = children[i];
				child.parent_id = obj._id;
				dataMdl.saveItem(childType, child._id, child, saveCb);
			};
		} else {
			console.log(logPref + ' -- No children for object: ');
			console.log(obj);
		}

	}


};


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


exports.delItem = function(req, res){
	console.log(logPref + 'Processing delete request!!!!!!!!!!!!!!!!!!!!!!!:');
	console.log('=====================================================================================');

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