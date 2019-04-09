angular.module('stockMarketApp')
  .directive('tabs', [function () {
    return {
      restrict: 'E',
      transclude: true,
      scope: true,
      template: '<div class="tab-headers">' +
        ' <div ng-repeat="tab in tabs"' +
        '      ng-Click="selectTab($index)"' +
        '      ng-class="{selected: isSelectedTab($index)}">' +
        '   <span ng-bind="tab.title"></span>' +
        ' </div>' +
        '</div>' +
        '<div ng-transclude></div>',
      controller: function ($scope) {
        let currentIndex = 0;
        $scope.tabs = [];
        this.registerTab = function (title, scope) {
          if ($scope.tabs.length === 0) {
            scope.selected = true
          } else {
            scope.selected = false
          }
          $scope.tabs.push({title: title, scope: scope})
        };

        $scope.selectTab = function (index) {
          currentIndex = index;
          for (let j = 0; j < $scope.tabs.length; j++) {
            $scope.tabs[j].scope.selected = currentIndex === j
          }
        };

        $scope.isSelectedTab = function (index) {
          return currentIndex === index
        }
      }
    }
  }])
