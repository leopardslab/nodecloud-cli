
const emoji = require("node-emoji");
class Network {
  constructor(program, nodecloud, options) {
    this._program = program;
    if (program.type == "AWS" || "aws") {
      if (program.service === "dns") {
        this._network = nodecloud.aws.dns(options);
      } else if (program.service === "lb") {
        this._network = nodecloud.aws.loadbalancer(options);
      } else {
        throw new Error(emoji.get("x")+"  Please select a service type");
      }
    } else if (program.type == "GCP" || "gcp") {
      if (program.service == "dns") {
        this._network = nodecloud.gcp.dns(options);
      } else {
        throw new Error(emoji.get("x")+"  Please select a service type");
      }
      throw new Error("Network for GCP is not available");
    } else if (program.type == "Azure" || "azure") {
      //this._network = nodecloud.azure.network(options);
      throw new Error(emoji.get("x")+"  Network for Azure is not available");
    } else {
      throw new Error(emoji.get("x")+"  Please specify a provider by flag -p --provider");
    }
  }

  create(option, cb) {
    this._network
      .create(option)
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }

  delete(option, cb) {
    this._network
      .delete(option)
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }

  list(option, cb) {
    this._network
      .list(option)
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }

  addTags(option, cb) {
    this._network
      .addTags(option)
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }

  removeTags(option, cb) {
    this._network
      .removeTags(option)
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
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
