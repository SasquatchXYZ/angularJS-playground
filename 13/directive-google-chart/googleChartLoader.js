angular.module('googleChartApp')
  .factory('googleChartLoaderPromise', ['$q', '$rootScope', '$window',
    ($q, $rootScope, $window) => {
      // Create a Deferred Object
      const deferred = $q.defer();

      // Load Google Charts API asynchronously
      $window.google.load('visualization', '1',
        {
          packages: ['corechart'],
          callback: () => {
            // When loaded, trigger the resolve, bt inside an $apply
            // as the event happens outside of AngularJS life cycle
            $rootScope.$apply(() => deferred.resolve())
          }
        });
      // Return the promise object for the directive to chain onto
      return deferred.promise
    }]);
