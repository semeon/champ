var fs = require('fs');
require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

exports.driverForm = function(req, res){
  res.render('admin/driver_form');
};


// exports.driverForm2 = function(req, res){
//   var driverForm = require('../views/admin/driver_form.html');
//   console.log(driverForm);
//   res.send(driverForm);
// };