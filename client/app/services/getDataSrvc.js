appModule.factory('GetDataSrvc', ['$http', function($http) {
  var log_ctrl = ' - GetDataSrvc: ';
  console.log('');
  console.log('GetDataSrvc started');

  var getDataSrvc = {};


  getDataSrvc.loadCollection = function(dataType, callback) {
    var url = '/data/' + dataType;

    if (!url) {
      console.error(log_ctrl + 'Error: cannot create URL for dataType ' + dataType);
      return;
    }
    console.log(log_ctrl + 'loadCollection called for ' + dataType);
    $http({
      url: url, 
      method: "GET"
    }).success(
      function(data) {
        console.log(log_ctrl + 'Collection loaded:');
        console.log(data);
        callback(data);
      });
  }

  return getDataSrvc;
}]);
