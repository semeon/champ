var logPref = '[Driver Ctrl] ';

// Model
var dataMdl = require('../models/dataMdl');
var Driver = dataMdl.getModel('Driver');

// Page Renderers
exports.driverList = function(req, res){
  var renderer = function(drivers) {
    res.render( 'admin/driver_list', 
                { title: 'Admin: Drivers',
                   page: 'drivers',
                   user: req.user,
                   data: drivers
                });
  }
  dataMdl.getItemList(Driver, renderer);
};

// Post request
exports.saveDriver = function(req, res){
  console.log(logPref + 'Processing save driver request:');
  console.log(req.body);

  console.log(logPref + 'Creating driver object:');
  var objId = req.body.dbId;
  var driver = {};
    driver.name = req.body.driverName;
    driver.nick = req.body.driverNick;
    driver.email = req.body.driverEmail;
    driver.tel = req.body.driverPhone;

  console.log(driver);

  var callback = function(result) {
    console.log(logPref + 'saveDriver callback');
    console.log(result);
    res.redirect('/admin/drivers');
  }

  dataMdl.saveItem(Driver, objId, driver, callback);
};

// AJAX get request
exports.deleteDriver = function(req, res){
  console.log(logPref + 'Processing delete driver request:');
  console.log(req.query);

  var objId = req.query.id;
  console.log(objId);

  var callback = function(result) {
    console.log(logPref + 'deleteDriver callback');
    console.log(result);
    res.send(result);
  }

  // dataMdl.markItemAsDeleted(Driver, objId, callback);
  dataMdl.deleteItemFromDb(Driver, objId, callback);
};