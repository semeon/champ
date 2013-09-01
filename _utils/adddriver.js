var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db');

var printCollection = function(model) {
	model.find(function (err, drivers) {
	  if (err) {
	  	console.log('Could not find data in DB.');
	  	process.exit(1); // Failure  	
	  } else {
	  	console.log('There are following drivers in DB:');
		console.log(drivers);
		process.exit(0); // Success	
	  }
	});
}

if(process.argv.length == 4){
	// 0 will be node, 1 will be the script
	var driverSchema = mongoose.Schema({id: String, name: String });
	var Driver = mongoose.model('Driver', driverSchema);
	var drv = new Driver({ id: process.argv[2], name: process.argv[3] });
	console.log(drv);

	drv.save(function (err) {
	  if (err) {
	  	console.log('Could not save data to DB.');
	  	console.log(err);
	  	process.exit(1); // Failure
	  } else {
	  	console.log('Data was successfully saved to DB.');
		printCollection(Driver);
	  }
	});


}else{
	console.error("Script requires exactly 2 arguments");
	console.error("Usage: node adddriver.js id name");
	process.exit(1); // Failure
}