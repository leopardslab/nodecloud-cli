#!/usr/bin/env node

const program = require("commander");
const figlet = require("figlet");
const chalk = require("chalk");

const Init = require("./init");

program
  .version("0.0.1", "-v, --version")
  .option("-a, --about", "View about section of  NodeCloud CLI")
  .option("-i, --init", "Add bbq sauce")
  .option("-c, --config", "Configure")
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
      console.log(
        chalk.green("Sustainable Computing Research Group") +
          chalk.blue(" (SCoRe)")
      );
    }
  );
}

if (program.init) {
  Init();
}
