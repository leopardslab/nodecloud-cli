
const emoji = require("node-emoji");
class Iam {
  constructor(program, nodecloud, options) {
    if (program.type == "AWS" || "aws") {
      this._iam = nodecloud.aws.iam(options);
    } else if (program.type == "GCP") {
      throw new Error(
        emoji.get("x")+"  Identity & Access Management (IAM) for GCP is not available"
      );
      // this._iam = nodecloud.gcp.iam(options);
    } else if (program.type == "Azure") {
      //this._iam = nodecloud.azure.iam(options);
      throw new Error(
        emoji.get("x")+"  Identity & Access Management (IAM) for Azure is not available"
      );
    } else {
      throw new Error(emoji.get("x")+"  Please specify a provider by flag -p --provider");
    }
  }

  createGroup(options, cb) {
    this._iam
      .createGroup(options)
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }

  deleteGroup(options, cb) {
    this._iam
      .deleteGroup(options)
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }

  attachResoure(options, cb) {
    this._iam
      .attachGroupPolicy(options)
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }

  detachResource(options, cb) {
    this._iam
      .detachGroupPolicy(options)
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }
}

module.exports = Iam;
