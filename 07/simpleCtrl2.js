angular.module('simpleCtrl2App', [])
  .controller('SimpleCtrl2', ['$location', '$window', function ($location, $window) {
    const self = this;

    self.navigate1 = function () {
      $location.path('/some/where')
    };

    self.navigate2 = function () {
      $location.path('/some/where/else')
    }

  }]);
