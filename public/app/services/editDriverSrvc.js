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

  editDriverService.getFormTemplate = function() {
    return driverFormHtml;
  }

  editDriverService.showDialog = function(driver) {
    var dialogScope = $rootScope.$new(true);

    dialogScope.driver = driver;

    console.log(driver);

    var dialogDom = $compile(driverFormHtml)(dialogScope);
    $(dialogDom).modal();
  }



  return editDriverService;
}]);
