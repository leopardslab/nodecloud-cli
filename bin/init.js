const inquirer = require("inquirer");

export default function() {
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
