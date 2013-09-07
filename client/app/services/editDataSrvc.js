appModule.factory('EditDataSrvc', ['$http', function($http) {
  var log_ctrl = ' - EditDataSrvc: ';
  console.log('');
  console.log('EditDataSrvc started');

  var editDataSrvc = {};

  editDataSrvc.getEditFormTemplate = function(dataType, callback) {
    var url = '/app/views/' + dataType + '_edit_form.html';

    if (!url) {
      console.error(log_ctrl + 'Error: cannot find form template URL for dataType ' + dataType);
      return;
    }

    $http.get(url).success(function(html) {
                            callback(html)
                          });
  }

  editDataSrvc.deleteItem = function(dataType, obj, callback) {
    var url = '/data/' + dataType + '/delete';

    if (!url) {
      console.error(log_ctrl + 'Error: cannot create delete URL for dataType ' + dataType);
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

  editDataSrvc.saveItem = function(dataType, objId, data, callback) {
    var url = '/data/' + dataType + '/save';

    if (!url) {
      console.error(log_ctrl + 'Error: cannot create delete URL for dataType ' + dataType);
      return;
    }
    console.log(log_ctrl + 'Save called for ' + dataType);
    console.log(log_ctrl + 'url: ' + url);

    $http({
      url: url, 
      method: "POST",
      data: {id: objId, data: data}
    }).success(
      function(err) {
        console.log(log_ctrl + 'Saving result:');
        console.log(data);
        callback();
      });
  }




  return editDataSrvc;
}]);
