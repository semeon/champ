function driverCtrl($scope, EditDriverSrvc) {
    var log_ctrl = ' - driverCtrl: ';
    console.log('');
    console.log('driverCtrl Controller started');

    $scope.driver = {};

		$scope.init = function(driver) {
			console.log(log_ctrl + 'init()');
		  $scope.driver = driver;
			// console.log(log_ctrl + $scope.driver);
		};

		$scope.editDriverClick = function () {
			console.log(log_ctrl + $scope.driver);
			console.log($scope.driver);

			var template = EditDriverSrvc.getFormTemplate();
			console.log(log_ctrl + template);

			bootbox.dialog({
			  message: template,
			  title: "Редактировать: Имя / Ник",
			  onEscape: function() {},
			  show: true,
			  backdrop: true,
			  closeButton: true,
			  animate: true,
			  className: "my-modal",
			  buttons: {
			    saveChanges: {   
			      label: "Сохранить",
			      className: "btn-success",
			      callback: function() {}
			    },
			    cancel: {   
			      label: "Отменить",
			      className: "btn-default",
			      callback: function() {}
			    }
			  }
			});

		}

}
