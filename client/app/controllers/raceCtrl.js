function raceCtrl($scope, $rootScope, $compile, GetDataSrvc, EditDataSrvc) {
		var log_ctrl = ' - raceCtrl: ';
		console.log('');
		console.log('raceCtrl started');

		$scope.race = {};
		$scope.members = [];
		$scope.results = [];

		$scope.drivers = [];
		$scope.teams = [];
		$scope.rules = [];



		function addNewMember() {
			console.log(log_ctrl + 'Creating new empty member.');
			var member = {};
			member.driver_id = '';
			member.team_id = '';
			member.toDelete = false;
			member.type = 'members';
			$scope.members.push(member);

			console.log(log_ctrl + 'member length: ' + $scope.members.length);
			console.log(log_ctrl + 'members:');
			console.log($scope.members);
		}


		$scope.getDriverById = function (id) {
			for (var i = 0; i < $scope.drivers.length; i++) {
				if ($scope.drivers[i]._id == id) {
					return $scope.drivers[i];
				}
			}
		}

		$scope.getTeamById = function (id) {
			for (var i = 0; i < $scope.teams.length; i++) {
				if ($scope.teams[i]._id == id) {
					return $scope.teams[i];
				}
			}
		}




		$scope.init = function(item, dataType) {
			console.log(log_ctrl + 'init()');
			console.log(log_ctrl + '===================================================');
			$scope.dataType = dataType;

			console.log(log_ctrl + 'Data dataType: ');
			console.log(dataType);

			console.log(log_ctrl + 'Data object: ');
			console.log(item);

			$scope.race = item;

			GetDataSrvc.loadItems('drivers', 
														{deleted: false}, 
														function(result) { 
															if (result && result.length>0) {
																console.log(log_ctrl + 'Loaded drivers:');
																console.log(result);
																$scope.drivers = result;
															} else {
																console.log(log_ctrl + 'Could not load drivers');
															}
														});


			GetDataSrvc.loadItems('teams', 
														{deleted: false}, 
														function(result) { 
															if (result && result.length>0) {
																console.log(log_ctrl + 'Loaded teams:');
																console.log(result);
																$scope.teams = result;
															} else {
																console.log(log_ctrl + 'Could not load teams');
															}
														});

			$scope.title = 'Изменить данные: ' + $scope.race.name;

			console.log(log_ctrl + 'Loading members: ');
			GetDataSrvc.loadItems('members', 
				{race_id: $scope.race._id}, 
				function(result) { 
					if (result && result.length>0) {
						console.log(log_ctrl + 'Loaded members:');
						console.log(result);
						$scope.members = result;
					} else {
						addNewMember();
					}
				});


			console.log(log_ctrl + 'Loading race results: ');
			GetDataSrvc.loadItems('results', 
				{season_id: $scope.race._id}, 
				function(results) {
					console.log(log_ctrl + 'Loading race results is completed:'); 
					console.log(results); 

					if (results && results.length>0) {
						console.log(log_ctrl + 'Loaded race results:');
						console.log(results);
						$scope.results = results;

					} else {
						GetDataSrvc.loadItems('rules', 
							{season_id: $scope.race.season_id, deleted: false}, 
							function(rules) { 
								if (rules && rules.length>0) {
									console.log(log_ctrl + 'Loaded rules:');
									console.log(rules);
									// $scope.rules = result;

									for (var i = 0; i < rules.length; i++) {
										var result = {};
										result.type = 'results';
										result.race_id = $scope.race._id;
										result.rule_id = rules[i]._id;
										result.name = rules[i].name;
										result.points = rules[i].points;
										$scope.results.push(result);
									};


								} else {
									console.log(log_ctrl + 'Could not load rules');
								}
							});
						
					}


				});
		};

		// Button Clicks
		// -----------------------------------------------

			$scope.addMemberClick = function() {
				console.log(log_ctrl + 'addMemberClick');
				addNewMember();
			}


			$scope.deleteChildClick = function(child) {
				console.log(log_ctrl + 'deleteChildClick');
				child.toDelete = !child.toDelete;
			}


			$scope.saveChangesClick = function() {
				console.log(log_ctrl + 'Save button clicked.');
				console.log(log_ctrl + '=================================================');

				console.log(log_ctrl + ' - Result object to save: ');
				console.log($scope.race);

				console.log(log_ctrl + ' --- Members: ');
				console.log($scope.members);

				console.log(log_ctrl + ' --- Results: ');
				console.log($scope.results);

				console.log(log_ctrl + 'Saving the race...');
				EditDataSrvc.saveItem('races', $scope.race, false, 
					function(savedRace){ 
						$('#modal').modal('hide');
						console.log(log_ctrl + 'Saving results:');
						console.log(savedRace);

						var items = [];
						items = $scope.members.concat($scope.results);

						if (items.length>0) {
							for (var i = 0; i < items.length; i++) {
								var item = items[i];

								if (item.toDelete && item.type) {
									// Deleting race
									console.log(log_ctrl + '- Deleting item: ');
									console.log(item);
									deleteItemRequest();							
									EditDataSrvc.deleteItem(item.type, item, function(){});

								} else {
									// Saving race
									item.season_id = savedRace._id;
									console.log(log_ctrl + 'Sending save item request: ');
									EditDataSrvc.saveItem(item.type, item, false, function(){});
								}
							};
						}

						// location.reload(); 
					});

				console.log(log_ctrl + '=================================================');
			}

			$scope.cancelClick = function() {
				$('#modal').modal('hide');

			}


}
