class Iam {
  constructor(program, nodecloud, options) {
    if (program.type == "AWS" || "aws") {
      this._iam = nodecloud.aws.iam(options);
    } else if (program.type == "GCP") {
      throw new Error(
        "Identity & Access Management (IAM) for GCP is not available"
      );
      // this._iam = nodecloud.gcp.iam(options);
    } else if (program.type == "Azure") {
      //this._iam = nodecloud.azure.iam(options);
      throw new Error(
        "Identity & Access Management (IAM) for Azure is not available"
      );
    } else {
      throw new Error("Please specify a provider by flag -p --provider");
    }
  }

  createGroup(options, cb) {
    this._iam
      .createGroup({
        GroupName: program.gpName
      })
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }

  deleteGroup(options, cb) {
    this._iam
      .deleteGroup({
        GroupName: program.gpName
      })
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }

  attachResoure(options, cb) {
    this._iam
      .attachGroupPolicy({
        GroupName: program.gpName,
        PolicyArn: `arn:aws:iam::aws:policy/${program.arName}`
      })
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }

  detachResource(options, cb) {
    this._iam
      .detachGroupPolicy({
        GroupName: program.gpName,
        PolicyArn: `arn:aws:iam::aws:policy/${program.arName}`
      })
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }
}

module.exports = Iam;
