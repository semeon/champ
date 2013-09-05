appModule.factory('EditDataSrvc', ['$rootScope', '$http', function($rootScope, $http) {
  var log_ctrl = ' - EditDataSrvc: ';
  console.log('');
  console.log('EditDataSrvc started');

  var editDataSrvc = {};

  editDataSrvc.getEditFormTemplate = function(dataType, callback) {

    var url = '';

    if (dataType == 'driver') { 
      url = '/app/views/driver_edit_form.html';
    } else if (dataType == 'team') {
      url = '/app/views/team_edit_form.html';
    }
    
    $http.get(url).success(function(html) {
                            callback(html)
                          });
  }



  editDataSrvc.deleteItem = function(dataType, obj, callback) {

    var url = '';
    
    if (dataType == 'driver') { 
      url = '/admin/deleteDriver';

    } else if (dataType == 'team') {
      url = '/admin/deleteTeam';

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
