appModule.factory('EditDataSrvc', ['$http', function($http) {
  var log_ctrl = ' - EditDataSrvc: ';
  console.log('');
  console.log('EditDataSrvc started');

  var editFormUrls = {};
  editFormUrls['drivers'] = '/app/views/driver_edit_form.html';
  editFormUrls['teams']  = '/app/views/team_edit_form.html';
  editFormUrls['seasons'] = '/app/views/season_edit_form.html';

  var deleteUrls = {};
  deleteUrls['drivers'] = '/admin/drivers/delete';
  deleteUrls['teams'] = '/admin/teams/delete';
  deleteUrls['seasons'] = '/admin/seasons/delete';

  var editDataSrvc = {};

  editDataSrvc.getEditFormTemplate = function(dataType, callback) {
    var url = editFormUrls[dataType];
    $http.get(url).success(function(html) {
                            callback(html)
                          });
  }

  editDataSrvc.deleteItem = function(dataType, obj, callback) {
    var url = deleteUrls[dataType];

    if (!url) {
      console.error(log_ctrl + 'Error: cannot find delete url URL for dataType ' + dataType);
      return;
    }
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
