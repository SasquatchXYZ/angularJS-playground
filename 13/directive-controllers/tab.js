angular.module('stockMarketApp')
  .directive('simpleStockRepeat', [function () {
    return {
      restrict: 'A',
      transclude: 'true',
      template: '<div ng-show="selected" ng-transclude></div>',
      require: '^tabs',
      scope: true,
      link: function ($scope, $element, $attr, tabCtrl) {
        tabCtrl.registerTab($attr.title, $scope)
      }
    }
  }]);
