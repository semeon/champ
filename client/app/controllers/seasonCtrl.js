function seasonCtrl($scope, $rootScope, $compile, GetDataSrvc, EditDataSrvc) {
		var log_ctrl = ' - itemCtrl: ';
		console.log('');
		console.log('itemCtrl started');

		$scope.formId = Math.round(new Date().getTime() / 1000);
		$scope.formSubmitUrl = $scope.formSubmitUrl;
		$scope.requiredData = $scope.requiredData;

		$scope.deleteChildRequests = [];


		function addChild() {
			console.log(log_ctrl + 'Creating new child. Type: ' + $scope.childrenType);						
			var newChild = {};
			if ($scope.dataType == 'seasons') {
				newChild.name = '';
				newChild.date = '';
				newChild.place = '';
				$scope.children.push(newChild);

				newChild.toDelete = false;
			}
		}


		$scope.init = function(item) {
			console.log(log_ctrl + 'init()');
			$scope.dataType = dataType;

			console.log(log_ctrl + 'Data dataType: ');
			console.log(dataType);

			$scope.item = {};
			$scope.childrenType = '';
			$scope.children = [];


			// Edit existing item
			if (item) {
				console.log(log_ctrl + 'Edit mode. Item: ');
				console.log(item);

				$scope.item = item;
				$scope.title = 'Изменить данные: ' + item.name;

				if (item.children_type) {
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
																		addChild();
																	}
																});
				}


			// Create a new item
			} else {
				console.log(log_ctrl + 'Creating new item...');
				$scope.title = 'Создать новую запись';
				addChild();
			}


		};

		// Button Clicks
		// -----------------------------------------------

			$scope.addChildClick = function() {
				console.log(log_ctrl + 'addChildClick');
				addChild($scope.childrenType);
			}

			$scope.deleteChildClick = function(child) {
				console.log(log_ctrl + 'deleteChildClick');
				child.toDelete = !child.toDelete;
			}


			$scope.saveChangesClick = function() {
				console.log(log_ctrl + 'Save button clicked.');
				console.log(log_ctrl + '=================================================');

				console.log(log_ctrl + 'Item dataType: ');
				console.log($scope.dataType);

				console.log(log_ctrl + 'Result object to save: ');
				console.log($scope.item);

				console.log(log_ctrl + 'Children object: ');
				console.log($scope.children);

				console.log(log_ctrl + 'Children dataType: ');
				console.log($scope.childrenType);


				var childrenToDelete = [];

				var childrenToSave = [];
				if ($scope.children.length>0) {
					for (var i = 0; i < $scope.children.length; i++) {
						var child = $scope.children[i];

						if (child.toDelete && child.type) {
							// Deleting child
							console.log(log_ctrl + '- Deleting child: ');
							console.log(child);							
							EditDataSrvc.deleteItem(child.type, child, function(){});

						} else {
							// Saving child
							console.log(log_ctrl + 'Children dataType: ');
							// EditDataSrvc.saveItem($scope.dataType, $scope.item, false, function(){});

							childrenToSave.push(child);
						}
					};
					childrenToSave = $scope.children;
				} else {
					childrenToSave = false;
				}


				console.log(log_ctrl + 'Children to save: ');
				console.log(childrenToSave);

				console.log(log_ctrl + 'Saving the object: ');
				EditDataSrvc.saveItem($scope.dataType, $scope.item, childrenToSave, 
					function(){ 
						$('#modal').modal('hide');
						// callDataReload();
						//location.reload(); 
					});

				// console.log(log_ctrl + 'Save request sent..');
				console.log(log_ctrl + '=================================================');

				//$('#modal').modal('hide');
				// callDataReload();
				// location.reload(); 

			}

			$scope.cancelClick = function() {
				$('#modal').modal('hide');

			}


}
