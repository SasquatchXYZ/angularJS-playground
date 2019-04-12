exports.config = {
  // The address of a running Selenium server
  seleniumAddress: 'http://localhost:444/wd/hub',

  // The URL where the server we are testing is running
  baseUrl: 'http://localhost:8000/',

  // Capabilities to be passed to the WebDriver instance
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patters are relative to the location of the spec file.  They may include glob patters.
  specs: ['*Spec*.js'],

  // Options to be passed to Jasmine-node
  jasmineNOdeOpts: {
    showColors: true // Use colors in the command-line report
  }
};
