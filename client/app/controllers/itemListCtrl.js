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

		function loadChildren(item) {
			console.log(log_ctrl + 'loadChildren called for');
			console.log(item);
			GetDataSrvc.loadItems(item.children_type, {}, function(data) {
					item.children = data;
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


	// Public members
	// -------------------------
		$scope.init = function(data, type) {
			console.log(log_ctrl + 'init()');
			$scope.items = data;
			$scope.dataType = String(type).toLowerCase();

			console.log(log_ctrl + '$scope.dataType: ' + $scope.dataType);

			if ($scope.dataType == 'races') {
				for (var i = 0; i < $scope.items.length; i++) {
					var item = $scope.items[i];
					loadChildren(item);	
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




}




