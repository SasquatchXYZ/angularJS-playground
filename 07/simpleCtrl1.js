angular.module('notesApp', [])
  .controller('SimpleCtrl', ['$location', function ($location) {
    const self = this;
    self.navigate = function () {
      $location.path('/some/where/else')
    }
  }]);
