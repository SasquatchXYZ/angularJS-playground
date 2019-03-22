angular.module('notesApp', [])
  .controller('MainCtrl', ['$http', function ($http) {
    const self = this;
    self.items = [];
    self.newTodo = {};

    const fetchTodos = function () {
      return $http.get('/api/note').then(res => {
        self.items = res.data;
      }, err => console.error('Error while fetching notes'))
    };

    fetchTodos();

    self.add = function () {
      $http.post('/api/note', self.newTodo)
        .then(fetchTodos)
        .then(res => self.newTodo = {})
    };

  }])
