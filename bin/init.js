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

function installDependencies(path, cb) {
  exec(`cd ${path} && npm install`, (error, stdout, stderr) => {
    if (error) {
      console.log("error", error);
      cb(error, null);
    }
    cb(null, true);
  });
}

function move(libname, path) {
  return new Promise(function(resolve, reject) {
    fs.rename(libname, `${path}\\${libname}`, function(error) {
      if (error) reject(false);
      installDependencies(`${path}\\${libname}`, (error, status) => {
        if (error) {
          reject(false);
        }
        resolve(true);
      });
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

function installPlugin({ package }) {
  detectInstalled(package).then(exists => {
    if (exists) {
      spinner.warn(`${package} plugin exist`);
      return;
    }
    getNpmPath()
      .then(function(path) {
        clonePlugin(package, path)
          .then(function(path) {
            spinner.succeed(`Successfully installed ${package}`);
          })
          .catch(function(error) {
            spinner.fail(`Error installing ${package}`);
          });
      })
      .catch(function(error) {
        spinner.fail(`Error installing ${package}`);
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
   const ${providers.require} = require('${providers.package}');

   const providers = [
     ${providers.provider}
   ];
   
   module.exports = providers;
 `;
  witeDataToConfig(data)
    .then(function(response) {
      if (response.state) {
        if (response.exists) {
          spinner.warn("Configuration file exist");
        } else {
          spinner.succeed("Configuration file generated successfully");
        }
        installPlugin(providers);
      }
    })
    .catch(function(err) {
      spinner.fail("Configuration file generation Failed");
    });
}

function providerSelection({ providers }) {
  switch (providers) {
    case "AWS":
      createConfig({
        package: "nodecloud-aws-plugin",
        require: "nodeCloudAwsPlugin",
        provider: `{
            name: "aws",
            tag: "aws",
            plugin: nodeCloudAwsPlugin
          }`
      });
      break;
    case "GCP":
      createConfig({
        package: "nodecloud-gcp-plugin",
        require: "nodeCloudAwsPlugin",
        provider: `{
            name: "google",
            tag: "google",
            plugin: nodeCloudAwsPlugin,
            configFile: {
              projectId: "",
              keyFilename: ""
            }
          }`
      });
      break;
    case "Azure":
      createConfig({
        package: "nodecloud-azure-plugin",
        require: "nodeCloudAzurePlugin",
        provider: `{
            name: "azure",
            tag: "azure",
            plugin: nodeCloudAzurePlugin
          }`
      });
      break;
    default:
      createConfig({
        package: "nodecloud-aws-plugin",
        require: "nodeCloudAwsPlugin",
        provider: `{
            name: "aws",
            tag: "aws",
            plugin: nodeCloudAwsPlugin
          }`
      });
  }
}

module.exports = function() {
  inquirer.prompt(questions).then(providerSelection);
};
