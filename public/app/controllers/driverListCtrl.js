function driverListCtrl($scope) {
    var log_ctrl = ' - driverListCtrl: ';
    console.log('');
    console.log('driverListCtrl Controller started');


		$scope.init = function(scope) {
			console.log(log_ctrl + 'init()');
			$scope.drivers = scope.data;
			$scope.driverFormTemplate = scope.formTemplate;
		};



}
