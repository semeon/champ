appModule.factory('GetDataSrvc', ['$http', function($http) {
	var log_ctrl = ' - GetDataSrvc: ';
	console.log('');
	console.log('GetDataSrvc started');

	var getDataSrvc = {};


	getDataSrvc.loadItems = function(dataType, query, callback) {
		var url = '/data/' + dataType;

		if (!url) {
			console.error(log_ctrl + 'Error: cannot create URL for dataType ' + dataType);
			return;
		}
		console.log(log_ctrl + 'loadCollection called for ' + dataType);

		console.log(log_ctrl + 'Request settings: ');
		console.log(log_ctrl + 'URL: ' + url);
		console.log(log_ctrl + 'Query: ' + query);
		console.log(query);


		$http({
			url: url, 
			method: "GET",
			params: query
		}).success(
			function(data) {
				console.log(log_ctrl + 'Collection loaded:');
				console.log(data);
				callback(data);
			});
	}

	return getDataSrvc;
}]);
