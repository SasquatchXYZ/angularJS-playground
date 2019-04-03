angular.module('stockMarketApp', [])
  .controller('MainCtrl', [function () {
    const self = this;
    self.stocks = [
      {name: 'First Stock', price: 100, previous: 220},
      {name: 'Second Stock', price: 140, previous: 120}
    ];

    self.changeAllStocks = function () {
      for (let j = 0; j < 4; j++) {
        self.stocks[j] = {
          name: 'Controller Stock',
          price: 200,
          previous: 250
        }
      }
    };

    self.changeFirstStock = function () {
      self.stocks[0].name = 'Changed First Stock'
    }
  }]);
