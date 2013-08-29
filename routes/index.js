
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', 
  					{ title: 'Rock-n-roll Racing',
  						page: 'index'
  					});
};

exports.login = function(req, res){
  res.render('container', 
  					{ title: 'Rock-n-roll Racing',
  						mode: 'user',
  						page: 'login'
  					});
};

exports.admin = function(req, res){
  res.render('container', 
  					{ title: 'Admin',
  						mode: 'admin',
  						page: 'admin'
  					});
};




// exports.index = function(req, res){
//   res.render('index', { title: 'Rock-n-roll Racing' });
// };

// exports.admin = function(req, res){
//   res.render('admin', { title: 'Administration' });
// };