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

const ec2 = ncProviders.aws.compute(options);

program
  .version("0.0.1")
  .option("-c, --compute <type>", "Compute")
  .option("-r, --region <type>", "Region")
  .option("-vn, --vm-name <type>", "VM name")
  .parse(process.argv);

switch (program.compute) {
  case "create":
    const params = {
      ImageId: "ami-090f10efc254eaf55",
      InstanceType: "t2.micro",
      MinCount: 1,
      MaxCount: 1
    };
    const instanceParams = {
      Key: "Name",
      Value: program.vmName
    };

    ec2
      .create(params, instanceParams)
      .then(res => {
        console.log(`All done ! ${res}`);
      })
      .catch(err => {
        console.log(`Oops something happened ${err}`);
      });
    break;
  case "list":
    ec2
      .list({ DryRun: false })
      .then(res => {
        console.log(res.Reservations);
      })
      .catch(err => {
        console.log(err);
      });
    break;
  case "stop":
    console.log("stop");
    break;
  case "":
    console.log("create");
    break;
  case "value":
    break;

  default:
    break;
}
