function seasonRulesCtrl($scope, $rootScope, $compile, EditDataSrvc) {
    var log_ctrl = ' - seasonRulesCtrl: ';
    console.log('');
    console.log('seasonRulesCtrl Controller started');
    $scope.dataType = 'rules';

		$scope.init = function(data) {
			console.log(log_ctrl + 'init()');
			$scope.rules = data;

			$scope.achievements = [];
		  for(var prop in $scope.rules) {
		    $scope.achievements[prop] = $scope.rules[prop];
		  }

		};


}




