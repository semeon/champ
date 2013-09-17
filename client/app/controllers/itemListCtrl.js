function itemListCtrl($scope, $rootScope, $compile, EditDataSrvc, GetDataSrvc) {
	var log_ctrl = ' - itemListCtrl: ';
	console.log('');
	console.log('itemListCtrl Controller started');


	// Private members
	// -------------------------
		function callDataReload() {
			GetDataSrvc.loadItems($scope.dataType, {}, function(data) {
					$scope.items = data;
			})
		}

		function loadRaces(item) {
			console.log(log_ctrl + 'loadChildren called for');
			console.log(item);
			GetDataSrvc.loadItems('races', {season_id: item._id}, function(data) {
					item.races = data;
			})
		}


		function showEditDialog(item) {
			console.log(log_ctrl + 'showEditDialog started.');
			var dialogScope = $rootScope.$new(true);

			dialogScope.data = item;
			dialogScope.dataType = $scope.dataType;
			console.log(log_ctrl + 'dataType: ' +  $scope.dataType);

			var openDialog = function(html) {
				$('.modal').remove();
				$('.modal-backdrop').remove();				
				var dialogDom = $compile(html)(dialogScope);
				$(dialogDom).modal();
			}

			EditDataSrvc.getEditFormTemplate($scope.dataType, openDialog);
		}


		function showDeleteDialog(item) {
			bootbox.dialog({
				message: '<h4 class="text-danger"><i class="icon-warning-sign"></i> Внимание!</h4>' +
						 '<p class="text-dangers"> Вы собираетесь удалить запись: ' + 
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

		function showDeleteDeclineMessage(item, message) {
			bootbox.dialog({
				message: '<h4 class="text-danger"><i class="icon-warning-sign"></i> Действие запрещено</h4>' +
						 '<p class="text-dangers"> Невозможно удалить запись: ' + 
							item.name + 
							'.<br/>Причина: ' + message + '</p>',
				title: "Ошибка удаления записи " + item.name,
				onEscape: function() {},
				show: true,
				backdrop: true,
				closeButton: true,
				animate: true,
				className: "my-modal",
				buttons: {
					cancel: {   
						label: "Закрыть",
						className: "btn-primary",
						callback: function() {}
					}
				}
			});
		}

	// Public members
	// -------------------------
		$scope.init = function(data, type) {
			console.log(log_ctrl + 'init()');
			$scope.items = data;
			$scope.dataType = String(type).toLowerCase();

			console.log(log_ctrl + '$scope.dataType: ' + $scope.dataType);

			if ($scope.dataType == 'races_grouped') {
				for (var i = 0; i < $scope.items.length; i++) {
					var item = $scope.items[i];
					loadRaces(item);	
				};
			}
		};

		$scope.editButtonClick = function (item) {
			showEditDialog(item, callDataReload);
		}

		$scope.addButtonClick = function () {
			showEditDialog(false, callDataReload);
		}

		$scope.deleteButtonClick = function (item) {

			if (item.type == 'seasons') {

				GetDataSrvc.loadItems('races', 
															{season_id: item._id}, 
															function(races) {
																if (races && races.length>0) {
																	showDeleteDeclineMessage(item, 'У выбранного сезона уже созданы этапы.');
																} else {
																	showDeleteDialog(item);
																}
															});

			} else {
				showDeleteDialog(item);
			}
		}

}