appModule.factory('EditDriverSrvc', ['$rootScope', '$http', function($rootScope, $http) {
  var log_ctrl = ' - EditDriverSrvc: ';
  console.log('');
  console.log('EditDriver Servic started');

  var driverFormHtml = '';
  $http.get('/templates/driverForm').success(function(data) {
    driverFormHtml = data;
    // console.log(data);
  })

  var editDriverService = {};

  editDriverService.getFormTemplate = function() {
    return driverFormHtml;
  }



  return editDriverService;
}]);
