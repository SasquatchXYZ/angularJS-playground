angular.module('notesApp', [])
  .controller('MainCtrl', [function () {
    const self = this;
    self.tab = 'first';

    self.open = function (tab) {
      self.tab = tab
    }
  }])
  .controller('SubCtrl', ['ItemService', function (ItemService) {
    const self = this;
    self.list = function () {
      return ItemService.list()
    };

    self.add = function () {
      ItemService.add({
        id: self.list().length + 1,
        label: `Item ${self.list().length}`
      })
    }
  }])
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
  }]);
