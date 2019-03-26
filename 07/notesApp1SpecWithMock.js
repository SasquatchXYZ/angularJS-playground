describe('ItemCtrl with Global Mock', function () {

  let ctrl;

  beforeEach(module('notesApp1'));
  beforeEach(module('notesApp1Mocks'));

  beforeEach(inject(function ($controller) {
    ctrl = $controller('ItemCtrl')
  }));

  it('should load mocked out items', function () {
    expect(ctrl.items).toEqual([{id: 1, label: 'Mock'}])
  })

});
