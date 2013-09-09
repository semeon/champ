function itemListCtrl($scope, $rootScope, $compile, EditDataSrvc, GetDataSrvc) {
	var log_ctrl = ' - itemListCtrl: ';
	console.log('');
	console.log('itemListCtrl Controller started');




	// Private
		function callDataReload() {
			GetDataSrvc.loadItems($scope.dataType, {}, function(data) {
					$scope.items = data;
			})
		}

		function loadCollection(dataType) {
			GetDataSrvc.loadItems(dataType, {}, function(data) {
					$scope.requiredData[dataType] = data;
			})
		}


		function showEditDialog(item) {
			var dialog_ctrl = ' - dialogCtrl: ';
			var dialogScope = $rootScope.$new(true);
			dialogScope.formId = Math.round(new Date().getTime() / 1000);
			dialogScope.formSubmitUrl = $scope.formSubmitUrl;
			dialogScope.requiredData = $scope.requiredData;

			dialogScope.addChild = function () {
				console.log(dialog_ctrl + 'Creating new child...');						
				var newChild = {};
				newChild.type = dialogScope.childrenType;
				if (newChild.type == 'races') {
					newChild.name = '';
					newChild.date = '';
					newChild.place = '';
					newChild.season_id = 'item._id';
				}
				dialogScope.children.push(newChild);
			}


			dialogScope.init = function() {
				if (item) {
					console.log(dialog_ctrl + 'Dialog scope started.');				
					dialogScope.item = item;
					dialogScope.title = 'Изменить данные: ' + item.name;

					dialogScope.children = [];
					dialogScope.childrenType = item.children_type;
					GetDataSrvc.loadItems(dialogScope.childrenType, 
																{parent_id: item._id}, 
																function(result) { 
																	if (result && result.length>0) {
																		console.log(dialog_ctrl + 'Loaded children:');
																		console.log(result);
																		dialogScope.children = result;
																	} else {
																		dialogScope.addChild(dialogScope.childrenType);
																	}
																});

				} else {
					dialogScope.item = {};
					dialogScope.title = 'Создать новую запись';
					dialogScope.children = [];
					dialogScope.addChild(dialogScope.childrenType);
				}
	
			}

			dialogScope.addChildClick = function() {
				console.log(dialog_ctrl + 'addChildClick');
				dialogScope.addChild(dialogScope.childrenType);
			}

			dialogScope.saveChangesClick = function() {
				console.log(dialog_ctrl + 'Result object: ');
				console.log(dialogScope.item);

				EditDataSrvc.saveItem($scope.dataType, dialogScope.item, dialogScope.children, 
					function(){ 
						callDataReload();
						$('#modal').modal('hide');
						// location.reload(); 
					});
			}

			dialogScope.cancelClick = function() {
				$('#modal').modal('hide');

			}

			var openDialog = function(html) {
				$('.modal').delay(5000).remove();
				$('.modal-backdrop').delay(5000).remove();				
				var dialogDom = $compile(html)(dialogScope);
				$(dialogDom).modal();
			}

			EditDataSrvc.getEditFormTemplate($scope.dataType, openDialog);
		}







	// Public
		$scope.init = function(data, type) {
			console.log(log_ctrl + 'init()');
			$scope.items = data;
			$scope.dataType = String(type).toLowerCase(); 
			$scope.formSubmitUrl = '/data/' + $scope.dataType + '/save';
			$scope.requiredData = {};

			if ($scope.dataType == 'seasons') {
				// loadCollection('seasons');
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




