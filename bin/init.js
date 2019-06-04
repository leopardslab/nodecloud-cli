const inquirer = require("inquirer");
const ora = require("ora");
const fs = require("fs");
const detectInstalled = require("detect-installed");
const { exec } = require("child_process");

const questions = [
  {
    message: "Select cloud service provider",
    type: "list",
    name: "providers",
    choices: ["AWS", "GCP", "Azure"]
  }
];

function installPlugin({ libname }) {
  detectInstalled("nodecloud-gcp-plugins").then(exists => {
    if (exists) return;
    exec(
      `git clone https://github.com/cloudlibz/${libname}`,
      (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(stdout);
      }
    );
  });
}

function createConfig(providers) {
  const spinner = ora().start("Generating Configurations");
  let data = `
   const providers = [
     ${providers}
   ]
   module.exports = providers;`;
  fs.writeFile(".nc.config.js", data, { flag: "wx" }, function(err) {
    if (err) {
      spinner.fail("Unable to generate configuration file");
    }
    spinner.succeed("Provider configuration generated sucessfully");
    installPlugin(providers);
  });
}

function providerSelection({ providers }) {
  switch (providers) {
    case "AWS":
      createConfig(
        JSON.stringify({
          name: "aws",
          tag: "aws",
          libname: "nodecloud-aws-plugin"
        })
      );
    case "GCP":
      createConfig(
        JSON.stringify({
          name: "google",
          tag: "google",
          libname: "nodecloud-gcp-plugin",
          configFile: {
            projectId: "",
            keyFilename: ""
          }
        })
      );
    case "Azure":
      createConfig(
        JSON.stringify({
          name: "Azure",
          tag: "azure",
          libname: "nodecloud-azure-plugin"
        })
      );
  }
}

module.exports = function() {
  inquirer.prompt(questions).then(providerSelection);
};
