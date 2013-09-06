var express     = require('express');
var http        = require('http');
var path        = require('path');


// Controllers
var routes      = require('./server/controllers');
var adminRoutes = require('./server/controllers/admin');

var driverCtrl = 	require('./server/controllers/driverCtrl');
var teamCtrl 	= require('./server/controllers/teamCtrl');
var seasonCtrl 	= require('./server/controllers/seasonCtrl');


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


app.get( '/', 			routes.index);
app.get( '/admin', 	auth.ensureAuthenticated, adminRoutes.index);

// Drivers
app.get( '/admin/drivers', 			auth.ensureAuthenticated, driverCtrl.getList);
app.post('/admin/saveDriver', 	auth.ensureAuthenticated, driverCtrl.save);
app.get( '/admin/deleteDriver', auth.ensureAuthenticated, driverCtrl.delete);

// Teams
app.get( '/admin/teams', 				auth.ensureAuthenticated, teamCtrl.getList);
app.post('/admin/saveTeam', 		auth.ensureAuthenticated, teamCtrl.save);
app.get( '/admin/deleteTeam', 	auth.ensureAuthenticated, teamCtrl.delete);

// Seasons
app.get( '/admin/seasons', 			auth.ensureAuthenticated, seasonCtrl.getList);
app.post('/admin/saveSeason', 		auth.ensureAuthenticated, seasonCtrl.save);
app.get( '/admin/deleteSeason', 	auth.ensureAuthenticated, seasonCtrl.delete);



// Auth
app.get( '/login', 	routes.login);
app.post('/login', 	auth.login);
app.get( '/logout', function(req, res){
										  req.logout();
										  res.redirect('/');
										});


// START
// ---------------------------------------------------------------
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
