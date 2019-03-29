angular.module('fifaApp', ['ngRoute'])
  .config($routeProvider => {
    $routeProvider
      .when('/', {
        templateUrl: 'views/team_details.html',
        controller: 'TeamListCtrl as teamListCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html'
      })
      .when('/team/:code', {
        templateUrl: 'views/team_details.html',
        controller: 'TeamDetailsCtrl as teamDetailsCtrl',
        resolve: {
          auth: ['$q', '$location', 'UserService', ($q, $location, UserService) => {
            return UserService.session().then(
              success => {
              },
              err => {
                $location.path('/login');
                $location.replace();
                return $q.reject(err)
              }
            )
          }]
        }
      });
    $routeProvider.otherwise({
      redirectTo: '/'
    })
  });
