angular.module('notesApp1', [])
  .factory('ItemService', [function () {
    const items = [
      {id: 1, label: 'Item 0'},
      {id: 2, label: 'Item 1'}
    ];

    return {
      list: function () {
        return items
      },
      add: function (item) {
        items.push(item)
      }
    }
  }])
  .controller('ItemCtrl', ['ItemService', function (ItemService) {
    const self = this;
    self.items = ItemService.list()
  }]);
