angular.module('stockMarketApp')
  .directive('validZip', [function () {
    const zipCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/g;

    return {
      restrict: 'A',
      require: 'ngModel',
      link: function ($scope, $element, $attrs, ngModelCtrl) {
        ngModelCtrl.$validators.zip = function (value) {
          return zipCodeRegex.test(value)
        }
      }
      // link: ($scope, $element, $attrs, ngModelCtrl) => {
      //   ngModelCtrl.$validators.zip = (value) => zipCodeRegex.test(value)
      // }
    }
  }]);
