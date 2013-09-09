function itemCtrl($scope, $rootScope, $compile, GetDataSrvc, EditDataSrvc) {
		var log_ctrl = ' - itemCtrl: ';
		console.log('');
		console.log('itemCtrl started');

		$scope.formId = Math.round(new Date().getTime() / 1000);
		$scope.formSubmitUrl = $scope.formSubmitUrl;
		$scope.requiredData = $scope.requiredData;


		$scope.addChild = function () {
			console.log(log_ctrl + 'Creating new child...');						
			var newChild = {};
			newChild.type = $scope.childrenType;
			if (newChild.type == 'races') {
				newChild.name = '';
				newChild.date = '';
				newChild.place = '';
				newChild.season_id = 'item._id';
			}
			$scope.children.push(newChild);
		}

		$scope.init = function(item, dataType) {
			console.log(log_ctrl + 'init()');
			$scope.dataType = dataType;

			console.log(log_ctrl + 'Data dataType: ');
			console.log(dataType);

			$scope.childrenType = '';



			if (item) {
				console.log(log_ctrl + 'Data: ');
				console.log(item);

				$scope.item = item;
				$scope.title = 'Изменить данные: ' + item.name;

				$scope.children = [];
				$scope.childrenType = item.children_type;

				console.log(log_ctrl + 'Loading children: ');
				GetDataSrvc.loadItems($scope.childrenType, 
															{parent_id: item._id}, 
															function(result) { 
																if (result && result.length>0) {
																	console.log(log_ctrl + 'Loaded children:');
																	console.log(result);
																	$scope.children = result;
																} else {
																	$scope.addChild($scope.childrenType);
																}
															});

			} else {
				console.log(log_ctrl + 'creating new object');
				$scope.item = {};
				$scope.title = 'Создать новую запись';
				$scope.children = [];
				// $scope.addChild($scope.childrenType);
			}

			// if (!$scope.childrenType) {
			// 	if ($scope.dataType == 'seasons') {
			// 		$scope.childrenType = 'races';
			// 	}
			// }

		};

		$scope.addChildClick = function() {
			console.log(log_ctrl + 'addChildClick');
			$scope.addChild($scope.childrenType);
		}

		$scope.saveChangesClick = function() {

			console.log(log_ctrl + 'Result object: ');
			console.log($scope.item);


			console.log(log_ctrl + 'Result object: ');
			console.log($scope.item);

			console.log(log_ctrl + 'Data dataType: ');
			console.log($scope.dataType);


			console.log(log_ctrl + 'Saving the object: ');
			EditDataSrvc.saveItem($scope.dataType, $scope.item, $scope.children, 
				function(){ 
					$('#modal').modal('hide');
					callDataReload();
					// location.reload(); 
				});
		}

		$scope.cancelClick = function() {
			$('#modal').modal('hide');

		}

}


		// function showEditDialog(item) {
		// 	var dialog_ctrl = ' - dialogCtrl: ';
		// 	var dialogScope = $rootScope.$new(true);
		// 	dialogScope.formId = Math.round(new Date().getTime() / 1000);
		// 	dialogScope.formSubmitUrl = $scope.formSubmitUrl;
		// 	dialogScope.requiredData = $scope.requiredData;

		// 	dialogScope.addChild = function () {
		// 		console.log(dialog_ctrl + 'Creating new child...');						
		// 		var newChild = {};
		// 		newChild.type = dialogScope.childrenType;
		// 		if (newChild.type == 'races') {
		// 			newChild.name = '';
		// 			newChild.date = '';
		// 			newChild.place = '';
		// 			newChild.season_id = 'item._id';
		// 		}
		// 		dialogScope.children.push(newChild);
		// 	}


		// 	dialogScope.init = function() {
		// 		if (item) {
		// 			console.log(dialog_ctrl + 'Dialog scope started.');				
		// 			dialogScope.item = item;
		// 			dialogScope.title = 'Изменить данные: ' + item.name;

		// 			dialogScope.children = [];
		// 			dialogScope.childrenType = item.children_type;
		// 			GetDataSrvc.loadItems(dialogScope.childrenType, 
		// 														{parent_id: item._id}, 
		// 														function(result) { 
		// 															if (result && result.length>0) {
		// 																console.log(dialog_ctrl + 'Loaded children:');
		// 																console.log(result);
		// 																dialogScope.children = result;
		// 															} else {
		// 																dialogScope.addChild(dialogScope.childrenType);
		// 															}
		// 														});

		// 		} else {
		// 			dialogScope.item = {};
		// 			dialogScope.title = 'Создать новую запись';
		// 			dialogScope.children = [];
		// 			dialogScope.addChild(dialogScope.childrenType);
		// 		}
	
		// 	}

		// 	dialogScope.addChildClick = function() {
		// 		console.log(dialog_ctrl + 'addChildClick');
		// 		dialogScope.addChild(dialogScope.childrenType);
		// 	}

		// 	dialogScope.saveChangesClick = function() {
		// 		console.log(dialog_ctrl + 'Result object: ');
		// 		console.log(dialogScope.item);

		// 		EditDataSrvc.saveItem($scope.dataType, dialogScope.item, dialogScope.children, 
		// 			function(){ 
		// 				callDataReload();
		// 				$('#modal').modal('hide');
		// 				// location.reload(); 
		// 			});
		// 	}

		// 	dialogScope.cancelClick = function() {
		// 		$('#modal').modal('hide');

		// 	}

		// 	var openDialog = function(html) {
		// 		$('.modal').delay(5000).remove();
		// 		$('.modal-backdrop').delay(5000).remove();				
		// 		var dialogDom = $compile(html)(dialogScope);
		// 		$(dialogDom).modal();
		// 	}

		// 	EditDataSrvc.getEditFormTemplate($scope.dataType, openDialog);
		// }



