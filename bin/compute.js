class Compute {
  constructor(program, ncProviders, options) {
    if (program.type == "AWS" || "aws") {
      this._compute = ncProviders.aws.compute(options);
    } else if (program.type == "GCP") {
      this._compute = ncProviders.gcp.compute(options);
    } else if (program.type == "Azure") {
      this._compute = ncProviders.azure.compute(options);
    } else {
      throw new Error("Please specify a provider by flag -p --provider");
    }
  }

  createInstance(options, cb) {
    this._compute
      .create(options)
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }

  listInstances(cb) {
    this._compute
      .list({})
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }

  stopInstance(options, cb) {
    this._compute
      .stop(options)
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }

  startInstance(options, cb) {
    this._compute
      .start(options)
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }

  rebootInstance(options, cb) {
    this._compute
      .reboot(options)
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }

  destroyInstance(options, cb) {
    this._compute
      .destroy(options)
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }
}

module.exports = Compute;
