var logPref = '[Data Ctrl] ';

// Models
var dataMdl = require('../models/dataMdl');


// Page titles
var pageTitles = {};
pageTitles['drivers'] = 'Пилоты';
pageTitles['teams'] = 'Команды';
pageTitles['seasons'] = 'Сезоны';

// Data type mapping
function getDataType (urlParam) {
  return String(urlParam).toLowerCase();
}

// Object generator
function createDataItem (body) {
  var obj = {};

  for(var prop in body) {
    obj[prop] = body[prop];
  }

  return obj;
}



// Page Renderers
exports.getList = function(req, res) {
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
    dataMdl.getItemList(model, renderer);

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
  var objId = req.body.dbId;
  var obj = createDataItem(req.body);
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

// // AJAX get request OLD
// exports.delete = function(req, res){
//   console.log(logPref + 'Processing delete driver request:');
//   console.log(req.query);

//   var objId = req.query.id;
//   console.log(objId);

//   var callback = function(result) {
//     console.log(logPref + 'deleteDriver callback');
//     console.log(result);
//     res.send(result);
//   }

//   // dataMdl.markItemAsDeleted(Driver, objId, callback);
//   dataMdl.deleteItemFromDb(Driver, objId, callback);
// };