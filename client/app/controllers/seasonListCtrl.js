function seasonListCtrl($scope, $rootScope, $compile, EditDataSrvc) {
    var log_ctrl = ' - seasonListCtrl: ';
    console.log('');
    console.log('seasonListCtrl Controller started');

    var showEditDialog = function(season) {
	    var dialogScope = $rootScope.$new(true);
	    if (season) {
	      dialogScope.season = season;
	      dialogScope.title = 'Изменить данные сезона: ' + season.name;
	    } else {
	      dialogScope.season = {};
	      dialogScope.title = 'Добавить пилота';
	    }

	    dialogScope.saveChangesClick = function(formId) {
	      $('#' + formId).submit();
	    }

	    var openDialog = function(html) {
				var dialogDom = $compile(html)(dialogScope);
				$(dialogDom).modal();
	    }

			EditDataSrvc.getEditFormTemplate('season', openDialog);
	  }

		$scope.init = function(data) {
			console.log(log_ctrl + 'init()');
			$scope.seasons = data;
		};

		$scope.editSeasonClick = function (season) {
			showEditDialog(season);
		}

		$scope.addSeasonClick = function () {
			showEditDialog();
		}

		$scope.deleteSeasonClick = function (season) {

			bootbox.dialog({
				message: '<h4 class="text-danger"><i class="icon-warning-sign"></i> Внимание!</h4>' +
						 '<p class="text-dangers"> Вы собираетесь удалить сезон ' + 
						  season.name + 
						  '. Эту опрерацию невозможно отменить.</p>',
				title: "Удаление сезона " + season.name,
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
				    callback: function() {EditDataSrvc.deleteItem('season', season, function(){ location.reload(); })}
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




