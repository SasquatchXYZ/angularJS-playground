// The PageObjects are ideally in separate files to allow for reuse across all the tests,
// but are listed here together for ease of understanding

function TeamsListPage() {

  this.open = function () {
    browser.get('/')
  };

  this.getTeamsListRows = function () {
    return element.all(by.repeater('team in teamListCtrl.teams'))
  };

  this.getRankForRow = function (row) {
    return element(
      by.repeater('team in teamListCtrl.teams')
        .row(row).column('team.rank')
    )
  };

  this.getNameForRow = function (row) {
    return element(
      by.repeater('team in teamListCtrl.teams')
        .row(row).column('team.name')
    )
  };

  this.isLoginLinkVisible = function () {
    return element(by.css('.login-link')).isDisplayed()
  };

  this.isLogoutLinkVisibile = function () {
    return element(by.css('.logout-link')).isDisplayed()
  }

}

describe('Routing Test With PageObjects', function () {

  it('should show teams on the first page', function () {

    const teamsListPage = new TeamsListPage();

    teamsListPage.open();

    expect(teamsListPage.getTeamsListRows().count()).toEqual(5);

    expect(teamsListPage.getRankForRow(0).getText())
      .toEqual('1');
    expect(teamsListPage.getNameForRow(0).getText())
      .toEqual('Spain');

    expect(teamsListPage.getRankForRow(4).getText())
      .toEqual('5');
    expect(teamsListPage.getNameForRow(4).getText())
      .toEqual('Uruguay');

    // Check that the login link is shown and logout link is hidden
    expect(teamsListPage.isLoginLinkVisible()).toBe(true);
    expect(teamsListPage.isLogoutLinkVisibile()).toBe(false)

  })

});
