appModule.factory('EditDriverSrvc', ['$rootScope', '$http', function($rootScope, $http) {
  var log_ctrl = ' - EditDriverSrvc: ';
  console.log('');
  console.log('EditDriver Servic started');

  var editDriverService = {};

  editDriverService.getEditFormTemplate = function(callback) {
    $http.get('/app/views/driver_edit_form.html').success(function(driverFormHtml) {
                                                callback(driverFormHtml)
                                               });
  }

  editDriverService.deleteDriver = function(driver, callback) {
    console.log(log_ctrl + 'Delete Driver called');
    $http({
      url: '/admin/deleteDriver', 
      method: "GET",
      params: {id: driver._id}
    }).success(
    function(data) {
      console.log(log_ctrl + 'Deleting result:');
      console.log(data);
      callback();
    });
  }

  return editDriverService;
}]);
