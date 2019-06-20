#!/usr/bin/env node
const program = require("commander");
const nodeCloud = require("../../nodecloud/lib");
const optionsProvider = {
  overrideProviders: false
};

const ncProviders = nodeCloud.getProviders(optionsProvider);
const options = {
  apiVersion: "2016-11-15",
  region: "eu-central-1"
};

const dynamo = ncProviders.aws.nosql(options);

program
  .version("0.0.1")
  .option("-d, --database <type>", "Database")
  .option("-t, --type <type>", "Database Type")
  .option("-b, --table <type>", "Table Name")
  .option("-a, --at-def list", "Instance Id")
  .option("-k, --key-def list", "Instance Id")
  .parse(process.argv);

switch (program.database) {
  case "create":
    dynamo
      .createItem(params)
      .then(res => {
        console.log(`All done ! ${res}`);
      })
      .catch(err => {
        console.log(`Oops something happened ${err}`);
      });
    break;
  case "query":
    dynamo
      .query(params)
      .then(res => {
        console.log(`All done ! ${res}`);
      })
      .catch(err => {
        console.log(`Oops something happened ${err}`);
      });
    break;
  case "delete":
    dynamo
      .deleteItem(params)
      .then(res => {
        console.log(`All done ! ${res}`);
      })
      .catch(err => {
        console.log(`Oops something happened ${err}`);
      });
    break;
  case "update":
    dynamo
      .updateItem(params)
      .then(res => {
        console.log(`All done ! ${res}`);
      })
      .catch(err => {
        console.log(`Oops something happened ${err}`);
      });
    break;
  default:
    break;
}
