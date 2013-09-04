// Database
var db = require('../modules/database');

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

  console.log('Processing saving driver request:');
  console.log(req.body);

  console.log('Creating driver object:');
  var objId = req.body.dbId;
  var driver = {};
    driver.id = req.body.driverId;
    driver.name = req.body.driverName;
    driver.nick = req.body.driverNick;
    driver.email = req.body.driverEmail;
    driver.tel = req.body.driverPhone;
  console.log(driver);

  var callback = function(result) {
    console.log('saveDriver callback');
    console.log(result);
    res.redirect('/admin/drivers');
  }

  db.saveDriver(objId, driver, callback);

};
