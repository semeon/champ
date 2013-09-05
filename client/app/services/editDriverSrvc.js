appModule.factory('EditDriverSrvc', ['$rootScope', '$http', '$compile', function($rootScope, $http, $compile) {
  var log_ctrl = ' - EditDriverSrvc: ';
  console.log('');
  console.log('EditDriver Servic started');

  var driverFormHtml = '';
  $http.get('/templates/driverForm').success(function(data) {
    driverFormHtml = data;
    // console.log(data);
  });

  var editDriverService = {};

  editDriverService.getEditFormTemplate = function(callback) {
    $http.get('/templates/driverForm').success(function(driverFormHtml) {
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
