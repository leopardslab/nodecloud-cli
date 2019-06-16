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

const bucket = ncProviders.aws.bucket(options);

program
  .version("0.0.1")
  .option("-s, --storage <type>", "Storage")
  .option("-st, --service <type>", "Service")
  .option("-sn, --st-name <type>", "Storage Name")
  .parse(process.argv);

switch (program.storage) {
  case "create":
    console.log("create");
    break;
  case "list":
    console.log("list");
    break;
  case "upload":
    console.log("upload");
    break;
  case "delete":
    console.log("delete");
    break;
  default:
    break;
}
