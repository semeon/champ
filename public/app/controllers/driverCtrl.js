function driverCtrl($scope) {
    var log_ctrl = ' - driverCtrl: ';
    console.log('');
    console.log('driverCtrl Controller started');

		require(["text!/app/views/_driverForm.html"], 
			function(html) {
				console.log(html);
			}
		);

    $scope.driver = {};

		$scope.init = function(data) {
			console.log(log_ctrl + 'init');			
		  $scope.driver = data;
			console.log(log_ctrl + $scope.driver);			
		};

		$scope.editDriverClick = function () {
			console.log(log_ctrl + $scope.driver);
			console.log($scope.driver);

			bootbox.dialog({
			  message: '<p>fffffffff</p>',
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
