var logPref = '[Season Ctrl] ';

// Model
var dataMdl = require('../models/dataMdl');
var Season = dataMdl.getModel('Season');

// Page Renderers
exports.getList = function(req, res){
  var renderer = function(seasons) {
    console.log(logPref + 'Model renderer: ' + Season.modelName);
    res.render( 'admin/season_list', 
                { title: 'Admin: Seasons',
                   page: 'seasons',
                   user: req.user,
                   data: seasons
                });
  }
  dataMdl.getItemList(Season, renderer);
};

// Post request
exports.save = function(req, res){
  console.log(logPref + 'Processing save season request:');
  console.log(req.body);

  console.log(logPref + 'Creating season object:');
  var objId = req.body.dbId;
  var season = {};
    season.name = req.body.seasonName;
    season.completed = false;

  console.log(season);

  var callback = function(result) {
    console.log(logPref + 'saveSeason callback');
    console.log(result);
    res.redirect('/admin/seasons');
  }

  dataMdl.saveItem(Season, objId, season, callback);
};

// AJAX get request
exports.delete = function(req, res){
  console.log(logPref + 'Processing delete season request:');
  console.log(req.query);

  var objId = req.query.id;
  console.log(objId);

  var callback = function(result) {
    console.log(logPref + 'delete callback');
    console.log(result);
    res.send(result);
  }

  // dataMdl.markItemAsDeleted(Season, objId, callback);
  dataMdl.deleteItemFromDb(Season, objId, callback);
};