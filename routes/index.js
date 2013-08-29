
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Rock-n-roll Racing' });
};

exports.admin = function(req, res){
  res.render('admin', { title: 'Administration' });
};