function itemListCtrl($scope, $rootScope, $compile, EditDataSrvc, GetDataSrvc) {
		var log_ctrl = ' - itemListCtrl: ';
		console.log('');
		console.log('itemListCtrl Controller started');

		// Public
			$scope.init = function(data, type) {
				console.log(log_ctrl + 'init()');
				$scope.items = data;
				$scope.dataType = String(type).toLowerCase(); 
				$scope.formSubmitUrl = '/data/' + $scope.dataType + '/save';
				$scope.requiredData = {};

				if ($scope.dataType == 'races') {
					loadCollection('seasons');
				}
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


		// Private
			function showEditDialog(item) {
				var dialog_ctrl = ' - dialogCtrl: ';
				var dialogScope = $rootScope.$new(true);
				dialogScope.formId = Math.round(new Date().getTime() / 1000);
				dialogScope.formSubmitUrl = $scope.formSubmitUrl;
				dialogScope.requiredData = $scope.requiredData;

				if (item) {
					dialogScope.item = item;
					dialogScope.title = 'Изменить данные: ' + item.name;
				} else {
					dialogScope.item = {};
					dialogScope.title = 'Создать новую запись';
				}

				dialogScope.saveChangesClick = function(formId) {
					var objId = '';
					if (item) objId = item._id;
					var dataObject = {};

					$('#' + formId).find(":input").each(
						function(){
							var propName = this.name;
							console.log(dialog_ctrl + 'Property name: ' + propName);

					    dataObject[propName] = this.value;


						});					

					console.log(dialog_ctrl + 'Result object: ');
					console.log(dataObject);

					EditDataSrvc.saveItem($scope.dataType, objId, dataObject, function(){ location.reload(); });
				}

				var openDialog = function(html) {
					var dialogDom = $compile(html)(dialogScope);
					$(dialogDom).modal();
				}

				EditDataSrvc.getEditFormTemplate($scope.dataType, openDialog);
			}

			function loadCollection(dataType) {
				GetDataSrvc.loadCollection(dataType, function(data) {
						$scope.requiredData[dataType] = data;
				})
			}
}




