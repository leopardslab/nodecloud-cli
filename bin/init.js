const inquirer = require("inquirer");
const ora = require("ora");
const fs = require("fs");
const emoji = require("node-emoji");
const detectInstalled = require("detect-installed");
const { exec } = require("child_process");
const spinner = ora();

const questions = [
  {
    message: "Select cloud service provider",
    type: "list",
    name: "providers",
    choices: ["AWS", "GCP", "Azure"]
  }
];

function move(libname, path) {
  return new Promise(function(resolve, reject) {
    fs.rename(libname, `${path}\\${libname}`, function(error) {
      if (error) reject(false);
      resolve(true);
    });
  });
}

function clonePlugin(libname, path) {
  return new Promise(function(resolve, reject) {
    exec(
      `git clone https://github.com/cloudlibz/${libname}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(false);
          return;
        }
        move(libname, path)
          .then(function(state) {
            resolve(true);
          })
          .catch(function(err) {
            reject(false);
          });
      }
    );
  });
}

function getNpmPath() {
  return new Promise(function(resolve, reject) {
    exec(`npm config get prefix`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout.trim() + `\\node_modules`);
    });
  });
}

function installPlugin({ libname }) {
  detectInstalled(libname).then(exists => {
    if (exists) {
      spinner.warn(`${libname} plugin exist`);
      return;
    }
    getNpmPath()
      .then(function(path) {
        clonePlugin(libname, path)
          .then(function(path) {
            spinner.succeed(`Successfully installed ${libname}`);
          })
          .catch(function(error) {
            spinner.fail(`Error installing ${libname}`);
          });
      })
      .catch(function(error) {
        spinner.fail(`Error installing ${libname}`);
      });
  });
}

function witeDataToConfig(data) {
  return new Promise(function(resolve, reject) {
    fs.exists(".nc.config.js", function(exists) {
      if (!exists) {
        fs.writeFile(".nc.config.js", data, function(err) {
          if (err) {
            resolve({ state: false, exists: false });
          }
          resolve({ state: true, exists: false });
        });
      } else {
        resolve({ state: true, exists: true });
      }
    });
  });
}

function createConfig(providers) {
  spinner.start("Generating Configurations");
  let data = `
   const providers = [
     ${providers}
   ]
   module.exports = providers;`;
  witeDataToConfig(data)
    .then(function(response) {
      if (response.state) {
        if (response.exists) {
          spinner.warn("Configuration file exist");
        } else {
          spinner.succeed("Configuration file generated successfully");
        }
        installPlugin(JSON.parse(providers));
      }
    })
    .catch(function(err) {
      spinner.fail("Configuration file generation Failed");
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
      break;
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
      break;
    case "Azure":
      createConfig(
        JSON.stringify({
          name: "Azure",
          tag: "azure",
          libname: "nodecloud-azure-plugin"
        })
      );
      break;
    default:
      createConfig(
        JSON.stringify({
          name: "aws",
          tag: "aws",
          libname: "nodecloud-aws-plugin"
        })
      );
  }
}

module.exports = function() {
  inquirer.prompt(questions).then(providerSelection);
};
