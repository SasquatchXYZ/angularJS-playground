describe('timeAgo Filter', function () {

  beforeEach(module('filtersApp'));

  let filter;
  beforeEach(inject(function (timeAgoFilter) {
    filter = timeAgoFilter;
  }));

  it('should respond based on timestamp', function () {
    // The presence of new Date().getTime() makes it slightly hard to unit test deterministically.
    // Ideally, we would inject a dateProvider into the timeAgo filter, but we are trying to keep it simple here.
    // So we will assume that our tests are fast enough to execute in mere milliseconds.

    let currentTime = new Date().getTime();
    currentTime -= 10000;

    expect(filter(currentTime)).toEqual('seconds ago');
    const fewMinutesAgo = currentTime - 1000 * 60;
    expect(filter(fewMinutesAgo)).toEqual('minutes ago');
    const fewHoursAgo = currentTime - 1000 * 60 * 68;
    expect(filter(fewHoursAgo)).toEqual('hours ago');
    const fewDaysAgo = currentTime - 1000 * 60 * 60 * 26;
    expect(filter(fewDaysAgo)).toEqual('days ago');
    const fewMonthsAgo = currentTime - 1000 * 60 * 60 * 24 * 32
    expect(filter(fewMonthsAgo)).toEqual('months ago');
  })
});
