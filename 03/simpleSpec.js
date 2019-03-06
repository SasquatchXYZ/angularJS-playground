// A test suite in Jasmine
describe('My function', function () {

  let t;
  // Similar to setup
  beforeEach(function () {
    t = true
  });

  afterEach(function () {
    t = null
  });

  it('should perform action 1', function () {
    expect(t).toBeTruthy();
  });

  it('should perform action 2', function () {
    const expectedValue = true;
    expect(t).toEqual(expectedValue)
  })
});
