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

    if (driver) {
      dialogScope.driver = driver;
      dialogScope.title = 'Изменить данные пилота: ' + driver.name;

    } else {
      dialogScope.driver = {};
      dialogScope.title = 'Добавить пилота';
     
    }

    dialogScope.saveChangesClick = function(formId) {
      console.log(log_ctrl + formId + ' submit click');
      $('#' + formId).submit();
    }

    dialogScope.deleteDriverClick = function(drvId) {
      console.log(log_ctrl + 'Delete Driver called');
      $http({
          url: '/admin/deleteDriver', 
          method: "GET",
          params: {id: drvId}
       }).success(
        function(data) {
          console.log(log_ctrl + 'Deleting result:');
          console.log(data);
          location.reload();
        });

    }


    var dialogDom = $compile(driverFormHtml)(dialogScope);
    $(dialogDom).modal();
  }



  return editDriverService;
}]);
