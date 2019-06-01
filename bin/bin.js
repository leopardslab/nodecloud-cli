#!/usr/bin/env node

const program = require("commander");
const inquirer = require("inquirer");
const figlet = require("figlet");
const chalk = require("chalk");
const emoji = require("node-emoji");
const ora = require("ora");
const fs = require("fs");

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
  function doSomething(answers) {
    // Do whateva you want!
  }
  var questions = [
    {
      message: "Select cloud service provider",
      type: "list",
      name: "providers",
      choices: ["AWS", "GCP", "Azure", "Ali", "DigitalOcean"]
    },
    {
      message: "Select region",
      type: "list",
      name: "providers",
      choices: ["AWS", "GCP", "Azure", "Ali", "DigitalOcean"]
    }
  ];
  inquirer.prompt(questions, doSomething);
}

if (program.config) {
  fs.writeFile(".nc.config.js", "Hey there!", { flag: "wx" }, function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
}
