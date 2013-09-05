function driverListCtrl($scope, $rootScope, $compile, EditDataSrvc) {
    var log_ctrl = ' - driverListCtrl: ';
    console.log('');
    console.log('driverListCtrl Controller started');

    var showEditDialog = function(driver) {
	    var dialogScope = $rootScope.$new(true);
	    if (driver) {
	      dialogScope.driver = driver;
	      dialogScope.title = 'Изменить данные пилота: ' + driver.name;
	    } else {
	      dialogScope.driver = {};
	      dialogScope.title = 'Добавить пилота';
	    }

	    dialogScope.saveChangesClick = function(formId) {
	      $('#' + formId).submit();
	    }

	    var openDialog = function(html) {
				var dialogDom = $compile(html)(dialogScope);
				$(dialogDom).modal();
	    }

			EditDataSrvc.getEditFormTemplate('driver', openDialog);
	  }


		$scope.init = function(data) {
			console.log(log_ctrl + 'init()');
			$scope.drivers = data;
		};

		$scope.editDriverClick = function (driver) {
			showEditDialog(driver);
		}

		$scope.addDriverClick = function () {
			showEditDialog();
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
				    callback: function() {EditDataSrvc.deleteItem('driver', driver, function(){ location.reload(); })}
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




