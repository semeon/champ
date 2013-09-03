// Database
var db = require('../modules/database');
var fs = require('fs');
require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

exports.index = function(req, res){
  res.render('admin', 
  					{ title: 'Admin',
  						page: 'index',
  						user: req.user
  					});
};

exports.drivers = function(req, res){
  var renderer = function(drivers) {

    var driverForm = require('../views/admin/driver_form.html');
    console.log(driverForm);

    var scope = {};
    scope.data = drivers;
    scope.formTemplate = driverForm;


    res.render( 'admin', 
                { title: 'Admin/Drivers',
                  page: 'drivers',
                  user: req.user,
                  data: drivers,
                  driverForm: String(driverForm),
                  scope: scope
                });
  }
  db.getDrivers(renderer);
};

