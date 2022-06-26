const awsMock = require("../test/Awsmock.js");

class Core {
  constructor() {
    // const nodecloud = require("nodecloud");
    // const optionsProvider = {
    //   overrideProviders: true
    // };
    // this._core = nodecloud.getProviders(optionsProvider);
    this._core = { aws: new awsMock() };
  }

  ncProviders() {
    return this._core;
  }
}

module.exports = Core;
