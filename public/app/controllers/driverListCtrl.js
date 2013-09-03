function driverListCtrl($scope, EditDriverSrvc) {
    var log_ctrl = ' - driverListCtrl: ';
    console.log('');
    console.log('driverListCtrl Controller started');


		$scope.init = function(data) {
			console.log(log_ctrl + 'init()');
			$scope.drivers = data;
		};

		$scope.editDriverClick = function (driver) {
			EditDriverSrvc.showDialog(driver);
		}

		$scope.addDriverClick = function () {
			EditDriverSrvc.showDialog();
		}

}
