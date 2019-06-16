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
  .option("-i, --in-id <type>", "Instance Id")
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
    ec2
      .stop({
        InstanceIds: [program.inId]
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    break;
  case "start":
    ec2
      .start({
        InstanceIds: [program.inId]
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    break;
  case "reboot":
    ec2
      .reboot({
        InstanceIds: [program.inId]
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    break;
  case "destroy":
    ec2
      .destroy({
        InstanceIds: [program.inId]
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    break;

  default:
    break;
}
