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

const iam = ncProviders.aws.iam(options);

program
  .version("0.0.1")
  .option("-g, --iam <type>", "IAM")
  .option("-p, --gp-name <type>", "Group Name")
  .option("-r, --ar-name <type>", "Amazon Resource Name")
  .parse(process.argv);

switch (program.iam) {
  case "create":
    createGroup(program);
    break;
  case "delete":
    deleteGroup(program);
    break;
  case "attach":
    attachResoure(program);
    break;
  case "detach":
    detachResource(program);
    break;
  default:
    break;
}

function createGroup(program) {
  iam
    .createGroup({
      GroupName: program.gpName
    })
    .then(res => {
      console.log(`All done ! ${JSON.stringify(res, null, 2)}`);
    })
    .catch(err => {
      console.log(`Oops something happened ${err}`);
    });
}

function deleteGroup(program) {
  iam
    .deleteGroup({
      GroupName: program.gpName
    })
    .then(res => {
      console.log(`All done ! ${JSON.stringify(res, null, 2)}`);
    })
    .catch(err => {
      console.log(`Oops something happened ${err}`);
    });
}

function attachResoure(program) {
  iam
    .attachGroupPolicy({
      GroupName: program.gpName,
      PolicyArn: `arn:aws:iam::aws:policy/${program.arName}`
    })
    .then(res => {
      console.log(`All done ! ${JSON.stringify(res, null, 2)}`);
    })
    .catch(err => {
      console.log(`Oops something happened ${err}`);
    });
}

function detachResource(program) {
  iam
    .detachGroupPolicy({
      GroupName: program.gpName,
      PolicyArn: `arn:aws:iam::aws:policy/${program.arName}`
    })
    .then(res => {
      console.log(`All done ! ${JSON.stringify(res, null, 2)}`);
    })
    .catch(err => {
      console.log(`Oops something happened ${err}`);
    });
}
