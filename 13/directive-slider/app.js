angular.module('sliderApp', [])
  .controller('MainCtrl', [function () {
    const self = this;

    self.selectedValue = 2000;

    self.textValue = 4000;

    self.setSelectedValue = () => self.selectedValue = self.textValue
  }]);
