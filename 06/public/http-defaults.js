angular.module('notesApp', [])
  .controller('LoginCtrl', ['$http', function ($http) {
    const self = this;
    self.user = {};
    self.message = 'Please Login';

    self.login = () => {
      $http.post('/api/login', self.user)
        .then(res => self.message = res.data.msg)
    }
  }])
  .config(['$httpProvider', function ($httpProvider) {

    // Every POST data becomes jQuery Style
    $httpProvider.defaults.transformRequest.push(data => {
      let requestStr;
      if (data) {
        data = JSON.parse(data);
        for (let key in data) {
          if (requestStr) {
            requestStr += `&${key}=${data[key]}`
          } else {
            requestStr = `${key}=${data[key]}`
          }
        }
      }
      return requestStr
    });

    // Set the content type to be FORM type for all POST requests
    // This does not add it for get requests.
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  }]);
