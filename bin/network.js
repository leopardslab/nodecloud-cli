class Network {
  constructor(program, nodecloud, options) {
    this._program = program;
    if (program.type == "AWS" || "aws") {
      this._network = nodecloud.aws.dns(options);
    } else if (program.type == "GCP" || "gcp") {
      //this._network = nodecloud.gcp.dns(options);
      throw new Error("Network for GCP is not available");
    } else if (program.type == "Azure" || "azure") {
      //this._network = nodecloud.azure.network(options);
      throw new Error("Network for Azure is not available");
    } else {
      throw new Error("Please specify a provider by flag -p --provider");
    }
  }

  createZone(options, cb) {
    this._network
      .createZone(options)
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }

  deleteZone(options, cb) {
    this._network
      .deleteZone(options)
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }

  listZones(options, cb) {
    this._network
      .listZones(options)
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }

  changeRecordSets(options, cb) {
    this._network
      .changeRecordSets(options)
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }
}
module.exports = Network;
