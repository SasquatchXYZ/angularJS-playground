angular.module('serverApp', [])
  .controller('MainCtrl', ['$http', function ($http) {
    const self = this;
    self.items = [];
    self.errorMessage = '';

    $http.get('/api/note').then(response => {
      self.items = response.data;
    }, errResponse => {
      self.errorMessage = errResponse.data.msg
    })

  }]);
