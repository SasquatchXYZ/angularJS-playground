angular.module('sliderApp')
  .directive('noUiSlider', [function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      link: ($scope, $element, $attr, ngModelCtrl) => {

        $element.noUiSlider({
          // We might not have the initial value in ngModelCtrl yet
          start: 0,
          range: {
            // $attrs by default gives us string values, nouiSlider expects numbers, so convert...
            min: Number($attr.rangeMin),
            max: Number($attr.rangeMax)
          }
        });

        // When data changes inside AngularJS Notify the third party directive of the change....
        ngModelCtrl.$render = () => {
          $element.val(ngModelCtrl.$viewValue)
        };

        // When data changes outside of Angular JS
        $element.on('set', (args) => {
          // Also tell AngularJS that it needs to update the UI
          $scope.$apply(() => {
            // Set the data within AngularJS
            ngModelCtrl.$setViewValue($element.val())
          })
        })
      }
    }
  }]);

// Without Arrow Functions...
/*angular.module('sliderApp')
  .directive('noUiSlider', [function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      link: function ($scope, $element, $attr, ngModelCtrl) {

        $element.noUiSlider({
          // We might not have the initial value in ngModelCtrl yet
          start: 0,
          range: {
            // $attrs by default gives us string values, nouiSlider expects numbers, so convert...
            min: Number($attr.rangeMin),
            max: Number($attr.rangeMax)
          }
        });

        // When data changes inside AngularJS Notify the third party directive of the change....
        ngModelCtrl.$render = function () {
          $element.val(ngModelCtrl.$viewValue)
        };

        // When data changes outside of Angular JS
        $element.on('set', function (args) {
          // Also tell AngularJS that it needs to update the UI
          $scope.$apply(function () {
            // Set the data within AngularJS
            ngModelCtrl.$setViewValue($element.val())
          })
        })
      }
    }
  }]);*/
