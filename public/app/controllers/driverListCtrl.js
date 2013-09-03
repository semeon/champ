function driverListCtrl($scope, EditDriverSrvc) {
    var log_ctrl = ' - driverListCtrl: ';
    console.log('');
    console.log('driverListCtrl Controller started');


		$scope.init = function(data) {
			console.log(log_ctrl + 'init()');
			$scope.drivers = data;
		};

		$scope.editDriverClick = function (driver) {

			var template = EditDriverSrvc.getFormTemplate();

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
