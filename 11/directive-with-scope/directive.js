angular.module('stockMarketApp')
  .directive('stockWidget', [function () {
    return {
      templateUrl: 'test/stock.html',
      restrict: 'A',
      scope: {
        stockData: '='
      },
      link: function ($scope, $element, $attrs) {
        $scope.getChange = function (stock) {
          return Math.ceil(((stock.price - stock.previous) / stock.previous) * 100)
        }
      }
    }
  }]);
