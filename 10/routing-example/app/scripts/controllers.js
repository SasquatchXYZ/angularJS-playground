angular.module('fifaApp')

  .controller('MainCtrl', ['UserService', function (UserService) {
    const self = this;
    self.userService = UserService;

    // Checks if the user is logged in when the application loads
    // User Service will automatically update isLoggedIn after this call finishes
    UserService.session()
  }])

  .controller('TeamListCtrl', ['FifaService', function (FifaService) {
    const self = this;
    self.teams = [];

    FifaService.getTeams()
      .then(res => self.teams = res.data)
  }])

  .controller('LoginCtrl', ['UserService', '$location', function (UserService, $location) {
    const self = this;
    self.user = {
      username: '',
      password: ''
    };

    self.login = () => {
      UserService.login(self.user)
        .then(success => $location.path('/team'), error => self.errorMessage = error.data.msg)
    }
  }])

  .controller('TeamDetailsCtrl', ['$location', '$routeParams', 'FifaService',
    function ($location, $routeParams, FifaService) {
      const self = this;
      self.team = {};

      FifaService.getTeamDetails($routeParams.code)
        .then(res => self.team = res.data, error => $location.path('/login'))
    }]);
