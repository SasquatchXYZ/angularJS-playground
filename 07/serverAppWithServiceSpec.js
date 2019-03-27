describe('Server App Integration', () => {

  beforeEach(module('serverApp2'));

  let ctrl, mockBackend;

  beforeEach(inject(($controller, $httpBackend) => {
    mockBackend = $httpBackend;
    mockBackend.expectGET('/api/note')
      .respond(404, {msg: 'Not Found'});
    ctrl = $controller('MainCtrl');
    // At this point, a server request will have been made...
  }));

  it('should handle error while loading items', () => {
    // Initially, before the server responds the items should be empty...
    expect(ctrl.items).toEqual([]);

    // Simulate a server response
    mockBackend.flush();

    // No items from the server, only an error.  So items should still be empty
    expect(ctrl.items).toEqual([]);

    // And check the error message...
    expect(ctrl.errorMessage).toEqual('Not Found')
  });

  // Ensure that all expects set on the $httpBackend were actually called...
  afterEach(() => mockBackend.verifyNoOutstandingExpectation());

  // Ensure that all requests to the server have actually responded (using flush())...
  afterEach(() => mockBackend.verifyNoOutstandingRequest())

});
