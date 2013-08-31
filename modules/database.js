var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var dbEnv = require('../env/mongodb.js');
var dbUrl = dbEnv.url();
 
var Database = module.exports = function Database(){};
 
Database.prototype = {
	
	  _collections: {
	  	adminUser: {
			  login		: String
			, password	: String
		}
	}
	
	, _db: null
	, _schema: {}
	, _model: {}
	
	, connect: function(){
		mongoose.connect(dbUrl);
		
		this._schema.adminUser = new Schema(this._collections.adminUser);
		this._model.adminUser = mongoose.model('adminUser', this._schema.adminUser);
		
	}
	
	, model: function(mod){	
		switch (mod){
			case 'adminUser':
				return this._model.adminUser;
		}
	}
 
};