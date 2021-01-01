class Storage {
  constructor(program, nodecloud, options) {
    this._program = program;
    if (program.type == "AWS" || "aws") {
      this._storage = nodecloud.aws.bucket(options);
    } else if (program.type == "GCP" || "gcp") {
      this._storage = nodecloud.gcp.storage(options);
    } else if (program.type == "Azure" || "azure") {
      this._storage = nodecloud.azure.blob(options);
    } else {
      throw new Error("Please specify a provider by flag -p --provider");
    }
  }

  createStorage(options, cb) {
    this._storage
      .create(options)
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }

  listStorage(options, cb) {
    this._storage
      .list({})
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }

  uploadToStorage(options, cb) {
    this._storage
      .upload(options)
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }

  deleteStorage(options, cb) {
    this._storage
      .delete(options)
      .then(res => {
        cb(false, res);
      })
      .catch(err => {
        cb(true, err);
      });
  }
}

module.exports = Storage;
