var express     = require('express');
var routes      = require('./server/controllers');
var adminRoutes = require('./server/controllers/admin');
var templates   = require('./server/controllers/templates');
var http        = require('http');
var path        = require('path');

// AUTH
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var auth = require('./settings/auth');
auth.init(passport, LocalStrategy);

// Express
var app = express();
app.configure(function() {
	app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/server/views');
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
	app.use(express.static(path.join(__dirname, 'client')));
});


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// Routers - users
app.get( '/', 			routes.index);

// Routers - admin
app.get( '/admin', 	auth.ensureAuthenticated, adminRoutes.index);
app.get( '/admin/drivers', 	auth.ensureAuthenticated, adminRoutes.drivers);

// Ajax requests
app.post( '/admin/saveDriver', 	auth.ensureAuthenticated, adminRoutes.saveDriver);
app.get(  '/admin/deleteDriver',  auth.ensureAuthenticated, adminRoutes.deleteDriver);

// Auth
app.get( '/login', 	routes.login);
app.post('/login', 	auth.login);
app.get( '/logout', function(req, res){
										  req.logout();
										  res.redirect('/');
										});

// Service
app.get('/templates/driverForm', 	templates.driverForm);



// START
// ---------------------------------------------------------------
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
