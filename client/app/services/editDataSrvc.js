appModule.factory('EditDataSrvc', ['$http', function($http) {
	var log_ctrl = ' - EditDataSrvc: ';
	console.log('');
	console.log('EditDataSrvc started');

	var editDataSrvc = {};

	function isEmptyObject(obj) {
		return !Object.keys(obj).length;
	}

	editDataSrvc.getEditFormTemplate = function(dataType, callback) {
		var url = '/app/views/' + dataType + '_edit_form.html';

		if (!url) {
			console.error(log_ctrl + 'Error: cannot find form template URL for dataType ' + dataType);
			return;
		}

		$http.get(url).success(function(html) {
														callback(html)
													});
	}

	editDataSrvc.deleteItem = function(dataType, obj, callback) {
		console.log(log_ctrl + 'Delete called for object:');
		console.log(obj);

		var url = '/data/' + dataType + '/delete/' + obj._id;
		if (!url) {
			console.error(log_ctrl + 'Error: cannot create delete URL for dataType ' + dataType);
			return;
		}

		$http({
			url: url, 
			method: "GET"
		}).success(
			function(data) {
				console.log(log_ctrl + 'Deleting result:');
				console.log(data);
				callback();
			});
	}

	editDataSrvc.saveItem = function(dataType, item, children, callback) {
		var url = '/data/' + dataType + '/save';

		if (isEmptyObject(item)) {
			
		}

		if (!dataType || !url) {
			console.error(log_ctrl + 'Error: cannot create delete URL for dataType ' + dataType);
			return;
		}

		console.log(log_ctrl + 'Save called for ' + dataType);
		console.log(log_ctrl + 'url: ' + url);

		$http({
			url: url, 
			method: "POST",
			data: {item: item, children: children}
		}).success(
			function(result) {
				console.log(log_ctrl + 'Saving result:');
				console.log(result);
				callback(result);
			});
	}

	return editDataSrvc;


}]);
