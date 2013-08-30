function driversCtrl($scope) {
    var log_ctrl = ' - driversCtrl: ';
    console.log('');
    console.log('driversCtrl Controller started');


		$scope.init = function(data) {
			console.log(log_ctrl + 'init');			
		  $scope.data = data;
		};

		$scope.test= function () {
			console.log(log_ctrl + $scope.data);
		}

}
