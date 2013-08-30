
/**
 * Module dependencies.
 */



var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');


// PASSPORT
	var passport = require('passport');
	var LocalStrategy = require('passport-local').Strategy;

	var auth = require('./modules/auth');
	auth.init(passport, LocalStrategy);




var app = express();

// configure Express
app.configure(function() {
		app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.engine('ejs', require('ejs-locals'));
		app.use(express.favicon());

  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
		app.use(express.static(path.join(__dirname, 'public')));
});

// Database
var Database = require('./modules/database');
var db = new Database();
db.connect('mongodb://localhost/users');


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// Routers
app.get( '/', 			routes.index);
app.get( '/login', 	routes.login);
app.get( '/admin', 	auth.ensureAuthenticated, routes.admin);

app.post('/login', 	auth.login);
app.get( '/logout', function(req, res){
										  req.logout();
										  res.redirect('/');
										});













// START
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
