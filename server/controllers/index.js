exports.index = function(req, res){
  res.render('index', 
  					{ title: 'Rock-n-roll Racing',
  						page: 'index'
  					});
};

exports.login = function(req, res){

	console.log('req.session.messages: ' + req.session.messages);

  res.render('login', 
  					{ title: 'Rock-n-roll Racing',
  						mode: 'user',
  						page: 'login',
  						messages: req.session.messages
  					});
};

exports.admin = function(req, res){
  res.render('admin', 
  					{ title: 'Admin',
  						mode: 'admin',
  						page: 'admin',
  						user: req.user
  					});
};

