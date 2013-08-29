
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('container', 
  					{ title: 'Rock-n-roll Racing',
  						page: 'index'
  					});
};

exports.login = function(req, res){
  res.render('container', 
  					{ title: 'Rock-n-roll Racing',
  						page: 'login'
  					});
};



// exports.index = function(req, res){
//   res.render('index', { title: 'Rock-n-roll Racing' });
// };

// exports.admin = function(req, res){
//   res.render('admin', { title: 'Administration' });
// };