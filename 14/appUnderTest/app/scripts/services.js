angular.module('fifaApp')
  .factory('FifaService', ['$http', $http => {
    return {
      getTeams: () => $http.get('/api/team'),
      getTeamDetails: code => $http.get(`/api/team/${code}`)
    }
  }])
  .factory('UserService', ['$http', $http => {
    const service = {
      isLoggedIn: false,

      session: () => {
        return $http.get('/api/session')
          .then(response => {
            service.isLoggedIn = true;
            return response
          })
      },

      login: user => {
        return $http.post('api/login', user)
          .then(response => {
            service.isLoggedIn = true;
            return response
          })
      }
    };
    return service
  }]);
