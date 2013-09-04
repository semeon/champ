function driverListCtrl($scope, $http, EditDriverSrvc) {
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

		$scope.deleteDriverClick = function (driver) {

			bootbox.dialog({
				message: '<h4 class="text-danger"><i class="icon-warning-sign"></i> Внимание!</h4>' +
						 '<p class="text-dangers"> Вы собираетесь удалить пилота ' + 
						  driver.name + 
						  '. Эту опрерацию невозможно отменить.</p>',
				title: "Удаление пилота " + driver.name,
				onEscape: function() {},
				show: true,
				backdrop: true,
				closeButton: true,
				animate: true,
				className: "my-modal",
				buttons: {
				  saveChanges: {   
				    label: "Удалить",
				    className: "btn-danger",
				    callback: function() {
						console.log(log_ctrl + 'Delete Driver called');
						$http({
						  url: '/admin/deleteDriver', 
						  method: "GET",
						  params: {id: driver._id}
						}).success(
						function(data) {
						  console.log(log_ctrl + 'Deleting result:');
						  console.log(data);
						  location.reload();
						});
				    }
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




