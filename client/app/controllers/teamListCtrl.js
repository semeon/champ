function teamListCtrl($scope, $rootScope, $compile, EditDataSrvc) {
    var log_ctrl = ' - teamListCtrl: ';
    console.log('');
    console.log('teamListCtrl Controller started');

    var showEditDialog = function(team) {
	    var dialogScope = $rootScope.$new(true);
	    if (team) {
	      dialogScope.team = team;
	      dialogScope.title = 'Изменить данные пилота: ' + team.name;
	    } else {
	      dialogScope.team = {};
	      dialogScope.title = 'Добавить пилота';
	    }

	    dialogScope.saveChangesClick = function(formId) {
	      $('#' + formId).submit();
	    }

	    var openDialog = function(html) {
				var dialogDom = $compile(html)(dialogScope);
				$(dialogDom).modal();
	    }

			EditDataSrvc.getEditFormTemplate('team', openDialog);
	  }

		$scope.init = function(data) {
			console.log(log_ctrl + 'init()');
			$scope.teams = data;
		};

		$scope.editTeamClick = function (team) {
			showEditDialog(team);
		}

		$scope.addTeamClick = function () {
			showEditDialog();
		}

		$scope.deleteTeamClick = function (team) {

			bootbox.dialog({
				message: '<h4 class="text-danger"><i class="icon-warning-sign"></i> Внимание!</h4>' +
						 '<p class="text-dangers"> Вы собираетесь удалить команду ' + 
						  team.name + 
						  '. Эту опрерацию невозможно отменить.</p>',
				title: "Удаление команды " + team.name,
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
				    callback: function() {EditDataSrvc.deleteItem('team', team, function(){ location.reload(); })}
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




