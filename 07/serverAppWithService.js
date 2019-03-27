angular.module('serverApp2', [])
  .controller('MainCtrl', ['NoteService', function (NoteService) {
    const self = this;
    self.items = [];
    self.errorMessage = '';

    NoteService.query().then(response => {
      self.items = response.data
    }, errResponse => {
      self.errorMessage = errResponse.data.msg
    })

  }])
  .factory('NoteService', ['$http', $http => {
    return {
      query: () => $http.get('/api/note')
    }
  }]);
