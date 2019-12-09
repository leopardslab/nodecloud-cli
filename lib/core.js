class Core {
  constructor() {
    const nodecloud = require("nodecloud");
    const optionsProvider = {
      overrideProviders: false
    };
    this._core = nodecloud.getProviders(optionsProvider);
  }

  ncProviders() {
    return this._core;
  }
}

module.exports = Core;
