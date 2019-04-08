angular.module('stockMarketApp')
  .directive('simpleStockRepeat', [function () {
    return {
      restrict: 'A',
      // Capture and replace the entire element instead of just its content.
      transclude: 'element',
      // A $transclude is passed in as the fifth argument to the link function.
      link: function ($scope, $element, $attrs, ctrl, $transclude) {
        const myArray = $scope.$eval($attrs.simpleStockRepeat);

        const container = angular.element('<div class="container"></div>');

        // Using forEach and arrow functions...
        myArray.forEach(stock => {
          const instance = $transclude($scope.$new(), (clonedElement, newScope) => {
            newScope.currentIndex = myArray.indexOf(stock);
            newScope.stock = stock;
          });

          container.append(instance)
        });

        // Normal Setup using For Loop (boring....)
        /*for (let j = 0; j < myArray.length; j++) {
          // Create an element instance with a new child scope using the clone linking function

          const instance = $transclude($scope.$new(), function (clonedElement, newScope) {
            // Expose custom variables for the instance
            newScope.currentIndex = j;
            newScope.stock = myArray[j];
          });

          // Add it to our container
          container.append(instance);
        }*/

        // With Transclude: 'element', the element gets replaced with a comment.  And our generated content after the
        // comment.
        $element.after(container)
      }
    }
  }]);
