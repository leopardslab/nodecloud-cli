#!/usr/bin/env node
const program = require("commander");
const figlet = require("figlet");
const chalk = require("chalk");
const Init = require("./init");

program
  .version("0.0.1", "-v, --version")
  .option("-a, --about", "View about section of  NodeCloud CLI")
  .option("-i, --init", "Initialize provider")
  .option("-f, --config", "Configure")
  .option("-c, --compute <type>", "Compute")
  .option("-s, --storage <type>", "Storage")
  .option("-d, --database <type>", "Database")
  .option("-n, --network <type>", "Network")
  .option("-vn, --vm-name <type>", "VM name")
  .option("-id, --in-id <type>", "Instance Id")
  .option("-sn, --st-name <type>", "Storage Name")
  .option("-tb, --table <type>", "Table Name")
  .option("-al, --at-def list", "Key definistion")
  .option("-kl, --key-def list", "Key definistion")
  .parse(process.argv);

if (program.about) {
  figlet.text(
    "NodeCloud CLI",
    {
      font: "slant",
      horizontalLayout: "default",
      verticalLayout: "default"
    },
    function(err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(chalk.blue(data));
      console.log(chalk.blue("© Copyright 2019 Cloudlibz."));
    }
  );
}

if (program.init) {
  Init();
}

console.log(" collect: %j", program.compute);
