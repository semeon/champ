function seasonCtrl($scope, $rootScope, $compile, GetDataSrvc, EditDataSrvc) {
		var log_ctrl = ' - seasonCtrl: ';
		console.log('');
		console.log('seasonCtrl started');

		$scope.season = {};
		$scope.races = [];
		$scope.rules = [];


		function addNewRace() {
			console.log(log_ctrl + 'Creating new empty race.');
			var race = {};
			race.name = '';
			race.date = new Date();
			race.place = '';
			race.type = 'races';
			race.toDelete = false;
			$scope.races.push(race);
		}

		function addNewRule() {
			console.log(log_ctrl + 'Creating new empty rule.');
			var rule = {};
			rule.name = '';
			rule.points = 0;
			rule.type = 'rules';
			rule.toDelete = false;
			$scope.rules.push(rule);
		}


		$scope.init = function(item, dataType) {
			console.log(log_ctrl + 'init()');
			$scope.dataType = dataType;

			console.log(log_ctrl + 'Data dataType: ');
			console.log(dataType);


			// Edit existing item
			if (item) {
				console.log(log_ctrl + 'Edit mode. Item: ');
				console.log(item);

				$scope.season = item;
				$scope.title = 'Изменить данные: ' + $scope.season.name;

				console.log(log_ctrl + 'Loading races: ');
				GetDataSrvc.loadItems('races', 
															{season_id: $scope.season._id}, 
															function(result) { 
																if (result && result.length>0) {
																	console.log(log_ctrl + 'Loaded races:');
																	console.log(result);
																	$scope.races = result;
																} else {
																	addNewRace();
																}
															});

				GetDataSrvc.loadItems('rules', 
															{season_id: $scope.season._id}, 
															function(result) { 
																if (result && result.length>0) {
																	console.log(log_ctrl + 'Loaded races:');
																	console.log(result);
																	$scope.rules = result;
																} else {
																	addNewRule();
																}
															});

			// Create a new season
			} else {
				console.log(log_ctrl + 'Creating new season...');
				$scope.title = 'Создать новую запись';
				addNewRace();
				addNewRule();
			}


		};

		// Button Clicks
		// -----------------------------------------------

			$scope.addRaceClick = function() {
				console.log(log_ctrl + 'addRaceClick');
				addNewRace();
			}

			$scope.addRuleClick = function() {
				console.log(log_ctrl + 'addRaceClick');
				addNewRule();
			}

			$scope.deleteChildClick = function(child) {
				console.log(log_ctrl + 'deleteChildClick');
				child.toDelete = !child.toDelete;
			}


			$scope.saveChangesClick = function() {
				console.log(log_ctrl + 'Save button clicked.');
				console.log(log_ctrl + '=================================================');

				console.log(log_ctrl + ' - Result object to save: ');
				console.log($scope.season);

				console.log(log_ctrl + ' --- Races: ');
				console.log($scope.races);

				console.log(log_ctrl + ' --- Rules: ');
				console.log($scope.rules);

				console.log(log_ctrl + 'Saving the season...');
				EditDataSrvc.saveItem($scope.dataType, $scope.season, false, 
					function(savedSeason){ 
						$('#modal').modal('hide');
						console.log(log_ctrl + 'Saving results:');
						console.log(savedSeason);

						var items = [];
						items = $scope.races.concat($scope.rules);

						// console.log(log_ctrl + '- $scope.races: ');
						// console.log($scope.races);

						// console.log(log_ctrl + '- $scope.rules: ');
						// console.log($scope.rules);

						// console.log(log_ctrl + '- items: ');
						// console.log(items);


						if (items.length>0) {
							for (var i = 0; i < items.length; i++) {
								var item = items[i];

								if (item.toDelete && item.type) {
									// Deleting race
									console.log(log_ctrl + '- Deleting item: ');
									console.log(item);
									EditDataSrvc.deleteItem(item.type, item, function(){});

								} else {
									// Saving race
									item.season_id = savedSeason._id;
									console.log(log_ctrl + 'Sending save item request: ');
									EditDataSrvc.saveItem(item.type, item, false, function(){});
								}
							};
						}

						location.reload(); 
					});

				console.log(log_ctrl + '=================================================');
			}

			$scope.cancelClick = function() {
				$('#modal').modal('hide');

			}


}
