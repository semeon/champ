var logPref = '[Team Ctrl] ';

// Model
var dataMdl = require('../models/dataMdl');
var Team = dataMdl.getModel('Team');

// Page Renderers
exports.teamList = function(req, res){
  var renderer = function(teams) {
    res.render( 'admin/team_list', 
                { title: 'Admin: Teams',
                   page: 'teams',
                   user: req.user,
                   data: teams
                });
  }

  console.log(logPref + 'Model:' + Team.modelName);


  dataMdl.getItemList(Team, renderer);
};

// Post request
exports.saveTeam = function(req, res){
  console.log(logPref + 'Processing save team request:');
  console.log(req.body);

  console.log(logPref + 'Creating team object:');
  var objId = req.body.dbId;
  var team = {};
    team.name = req.body.teamName;

  console.log(team);

  var callback = function(result) {
    console.log(logPref + 'save team callback');
    console.log(result);
    res.redirect('/admin/teams');
  }

  dataMdl.saveItem(Team, objId, team, callback);
};

// AJAX get request
exports.deleteTeam = function(req, res){
  console.log(logPref + 'Processing delete team request:');
  console.log(req.query);

  var objId = req.query.id;
  console.log(objId);

  var callback = function(result) {
    console.log(logPref + 'delete team callback');
    console.log(result);
    res.send(result);
  }

  // dataMdl.markItemAsDeleted(Team, objId, callback);
  dataMdl.deleteItemFromDb(Team, objId, callback);
};