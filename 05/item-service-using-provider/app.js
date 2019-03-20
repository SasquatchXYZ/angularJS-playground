function ItemService(opt_items) {
  const items = opt_items || [];
  this.list = () => items;
  this.add = item => items.push(item)
}

angular.module('notesApp', [])
  .provider('ItemService', function () {
    let haveDefaultItems = true;

    this.disableDefaultItems = function () {
      haveDefaultItems = false
    };

    // This function gets our dependencies, not the provider above...
    this.$get = [function () {
      let optItems = [];

      if (haveDefaultItems) {
        optItems = [
          {id: 1, label: 'Item 0'},
          {id: 2, label: 'Item 1'}
        ]
      }
      return new ItemService(optItems)
    }]
  })

  .config(['ItemServiceProvider', function (ItemServiceProvider) {
    // To see how the provider can change configuration, change the value of
    // shouldHaveDefaults to true and try running the example.
    let shouldHaveDefaults = false;

    // Get configuration from server
    // Set shouldHaveDefaults somehow
    // Assume it magically happens for now...
    if (!shouldHaveDefaults) {
      ItemServiceProvider.disableDefaultItems()
    }
  }])

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
  }]);
