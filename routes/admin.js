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

