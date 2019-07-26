class Database {
  constructor(program, nodecloud, options) {
    if (program.type == "AWS" || "aws") {
      this._database = nodecloud.aws.compute(options);
    } else if (program.type == "GCP" || "gcp") {
      this._database = nodecloud.gcp.compute(options);
    } else if (program.type == "Azure" || "azure") {
      this._database = nodecloud.azure.compute(options);
    } else {
      throw new Error("Please specify a provider by flag -p --provider");
    }
  }

  createNewItem(options, cb) {}
  query(options, cb) {}
  delete(options, cb) {}
  updateItem(options, cb) {}
}

module.exports = Database;
