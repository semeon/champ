function itemListCtrl($scope, $rootScope, $compile, EditDataSrvc) {
    var log_ctrl = ' - itemListCtrl: ';
    console.log('');
    console.log('itemListCtrl Controller started');
    $scope.dataType = '';

    var showEditDialog = function(item) {
	    var dialogScope = $rootScope.$new(true);
	    if (item) {
	      dialogScope.item = item;
	      dialogScope.title = 'Изменить данные пилота: ' + item.name;
	    } else {
	      dialogScope.item = {};
	      dialogScope.title = 'Добавить пилота';
	    }

	    dialogScope.saveChangesClick = function(formId) {
	      $('#' + formId).submit();
	    }

	    var openDialog = function(html) {
				var dialogDom = $compile(html)(dialogScope);
				$(dialogDom).modal();
	    }

			EditDataSrvc.getEditFormTemplate($scope.dataType, openDialog);
	  }

		$scope.init = function(data, type) {
			console.log(log_ctrl + 'init()');
			$scope.items = data;
			$scope.dataType = String(type).toLowerCase(); 
		};

		$scope.editButtonClick = function (item) {
			showEditDialog(item);
		}

		$scope.addButtonClick = function () {
			showEditDialog();
		}

		$scope.deleteButtonClick = function (item) {

			bootbox.dialog({
				message: '<h4 class="text-danger"><i class="icon-warning-sign"></i> Внимание!</h4>' +
						 '<p class="text-dangers"> Вы собираетесь запись: ' + 
						  item.name + 
						  '. Эту опрерацию невозможно отменить.</p>',
				title: "Удаление записи " + item.name,
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
				    callback: function() {EditDataSrvc.deleteItem($scope.dataType, item, function(){ location.reload(); })}
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




