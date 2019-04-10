angular.module('dynamicFormApp')
  .directive('formElement', [function () {

    return {
      restrict: 'E',
      require: '^form',
      scope: true,
      compile: function ($element, $attrs) {
        const expectedInputAttrs = {
          'required': 'required',
          'ng-minlength': 'nmMinlength',
          'ng-patter': 'ngPattern'
          // More here to be implemented
        };

        // Start extracting content from HTML
        let validationKeys = $element.find('validation');
        let presentValidationKeys = {};
        let inputName = $attrs.name;
        angular.forEach(validationKeys, (validationKey) => {
          validationKey = angular.element(validationKey);
          presentValidationKeys[validationKey.attr('key')] = validationKey.text()
        });

        // Start Generating final element HTML
        let elementHtml = '<div>' + '<label>' + $attrs.label + '</label>';
        elementHtml += '<input type="' + $attrs.type + '" name="' + inputName + '" ng-model="' + $attrs.bindTo + '"';

        $element.removeAttr('type');
        $element.removeAttr('name');
        for (let j in expectedInputAttrs) {
          if ($attrs[expectedInputAttrs[j]] !== undefined) {
            elementHtml += ' ' + j + '="' + $attrs[expectedInputAttrs[j]] + '"';
          }
          $element.removeAttr(j)
        }
        elementHtml += '>';

        elementHtml += '<span ng-repeat="(key, text) in validators" ' +
          ' ng-show="hasError(key)"' + ' ng-bind="text"></span>';

        elementHtml += '</div>';
        $element.html(elementHtml);

        return function ($scope, $element, $attrs, formCtrl) {
          $scope.validators = angular.copy(presentValidationKeys);
          $scope.hasError = function (key) {
            return !!formCtrl[inputName]['$error'][key]
          }
        }
      }
    }
  }]);
