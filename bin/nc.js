#!/usr/bin/env node
const program = require("commander");
const Services = require("./services");
const ora = require("ora");
const Init = require("./init");

const spinner = ora();

program
  .version("0.0.1", "-v, --version")
  .option("-a, --about", "View about section of  NodeCloud CLI")
  .option("-i, --init", "Initialize provider")
  .option("-t, --type <type>", "Type")
  .option("-j, --service <type>", "Service")
  .option("-o, --config", "Configure NodeCloud")
  .option("-c, --compute <type>", "Compute")
  .option("-s, --storage <type>", "Storage")
  .option("-d, --database <type>", "Database")
  .option("-n, --network <type>", "Network")
  .option("-g, --iam <type>", "IAM")
  .option("-r, --cr <type>", "Caller Reference")
  .option("-z, --name <type>", "Name")
  .option("-p, --port <type>", "Port")
  .option("-y, --key <type>", "Key")
  .option("-u, --value <type>", "Value")
  .option("-h, --id <type>", "Id")
  .option("-z, --gp-name <type>", "Group Name")
  .option("-r, --ar-name <type>", "Amazon Resource Name")
  .option("-vn, --vm-name <type>", "VM name")
  .option("-id, --in-id <type>", "Instance Id")
  .option("-sn, --st-name <type>", "Storage Name")
  .option("-tb, --table <type>", "Table Name")
  .option("-al, --at-def list", "Key definistion")
  .option("-kl, --key-def list", "Key definistion")
  .parse(process.argv);

if (program.init) {
  let Initialize = new Init(program, spinner);
  Initialize.selectProvider();
}

Services(program, spinner);
