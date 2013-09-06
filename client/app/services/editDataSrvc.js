appModule.factory('EditDataSrvc', ['$rootScope', '$http', function($rootScope, $http) {
  var log_ctrl = ' - EditDataSrvc: ';
  console.log('');
  console.log('EditDataSrvc started');

  var editFormUrls = {};
  editFormUrls['driver'] = '/app/views/driver_edit_form.html'
  editFormUrls['team'] = '/app/views/team_edit_form.html'
  editFormUrls['season'] = '/app/views/season_edit_form.html'

  var deleteUrls = {};
  deleteUrls['driver'] = '/admin/deleteDriver'
  deleteUrls['team'] = '/admin/deleteTeam'
  deleteUrls['season'] = '/admin/deleteSeason'


  var editDataSrvc = {};

  editDataSrvc.getEditFormTemplate = function(dataType, callback) {
    var url = editFormUrls[dataType];
    $http.get(url).success(function(html) {
                            callback(html)
                          });
  }


  editDataSrvc.deleteItem = function(dataType, obj, callback) {

    var url = deleteUrls[dataType];

    console.log(log_ctrl + 'Delete called for ' + dataType);
    $http({
      url: url, 
      method: "GET",
      params: {id: obj._id}
    }).success(
      function(data) {
        console.log(log_ctrl + 'Deleting result:');
        console.log(data);
        callback();
      });
  }

  return editDataSrvc;
}]);
