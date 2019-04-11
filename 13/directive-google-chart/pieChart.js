angular.module('googleChartApp')
  .directive('pieChart', ['googleChartLoaderPromise', (googleChartLoaderPromise) => {
    const convertToPieChartDataTableFormat = (firstColumnName, secondColumnName, data) => {
      const pieChartArray = [[firstColumnName, secondColumnName]];

      data.forEach(point => {
        pieChartArray.push([point.label, point.value])
      });
      // for (let i = 0; i < data.length; i++) {
      //   pieChartArray.push([data[i].label, data[i].value])
      // }
      return google.visualization.arrayToDataTable(pieChartArray)
    };

    return {
      restrict: 'A',
      scope: {
        chartData: '=',
        chartConfig: '='
      },
      link: ($scope, $element) => {

        googleChartLoaderPromise.then(() => {
          const chart = new google.visualization.PieChart($element[0]);

          $scope.$watch('chartData', (newVal, oldVal) => {
            const config = $scope.chartConfig;

            if (newVal) {
              chart.draw(
                convertToPieChartDataTableFormat(
                  config.firstColumnHeader,
                  config.secondColumnHeader,
                  newVal
                ),
                {title: $scope.chartConfig.title}
              )
            }
          }, true)
        })
      }
    }
  }]);
