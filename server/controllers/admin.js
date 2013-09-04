var logPref = '[Route Admin] ';
// Database
var db = require('../models/driverMdl');

exports.index = function(req, res){
  res.render('admin', 
  					{ title: 'Admin',
  						page: 'index',
  						user: req.user
  					});
};

exports.drivers = function(req, res){

  var renderer = function(drivers) {
    res.render( 'admin', 
                { title: 'Admin/Drivers',
                  page: 'drivers',
                  user: req.user,
                  data: drivers
                });
  }

  db.getDrivers(renderer);
};


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

  db.saveDriver(objId, driver, callback);

};


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

  // db.markDriverAsDeleted(objId, callback);
  db.deleteFromDb(objId, callback);

};