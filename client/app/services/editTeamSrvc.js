appModule.factory('EditTeamSrvc', ['$rootScope', '$http', function($rootScope, $http) {
  var log_ctrl = ' - EditTeamSrvc: ';
  console.log('');
  console.log('EditTeam Service started');

  var editTeamService = {};

  editDriverService.getEditFormTemplate = function(callback) {
    $http.get('/app/views/team_edit_form.html').success(function(html) {
                                                callback(html)
                                               });
  }

  editDriverService.deleteTeam = function(team, callback) {
    console.log(log_ctrl + 'Delete Driver called');
    $http({
      url: '/admin/deleteTeam', 
      method: "GET",
      params: {id: team._id}
    }).success(
    function(data) {
      console.log(log_ctrl + 'Deleting result:');
      console.log(data);
      callback();
    });
  }

  return editDriverService;
}]);
