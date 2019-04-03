angular.module('stockMarketApp')
  .directive('stockWidget', [function () {
    return {
      templateUrl: 'test/stock.html',
      restrict: 'AE'
    }
  }]);
