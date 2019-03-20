function ItemService() {
  const items = [
    {id: 1, label: 'Item 0'},
    {id: 2, label: 'Item 1'}
  ];
  this.list = () => items;
  this.add = item => items.push(item)
}

angular.module('notesApp', [])
  .service('ItemService', [ItemService])
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
      // console.log(self);
      ItemService.add({
        id: self.list().length + 1,
        label: `Item ${self.list().length}`
      })
    }
  }]);
