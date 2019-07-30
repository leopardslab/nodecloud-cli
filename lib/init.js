const fs = require("fs");
const npm = require("npm-programmatic");
const inquirer = require("inquirer");
const { getRegion } = require("./regions");
const { checkPlugin } = require("./helper");

const questions = [];

class Init {
  constructor(program, spinner) {
    this._provider = null;
    this._spinner = spinner;
    this._program = program;
  }

  /**
   * installs the nodecloud plugin
   * @param {*} plugin
   */
  installPlugin(plugin) {
    return new Promise(function(resolve, reject) {
      checkPlugin(plugin).then(function(exist) {
        if (exist) {
          return;
        }
        npm
          .install([`${plugin.package}`], {
            global: true,
            save: true
          })
          .then(function() {
            resolve(true);
          })
          .catch(function(err) {
            reject(err);
          });
      });
    });
  }

  /**
   *  writeFile checks if .nc.config.js exist and write file
   * @param {*} data
   */
  writeFile(data) {
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

  /**
   *  generates the .nc.config.js file
   * @param {*} providers
   */
  createConfigFile(providers) {
    let instance = this;
    let data = `
    const ${providers.require} = require('${providers.package}');
 
    const providers = [
      ${providers.provider}
    ];
    
    module.exports = providers;
  `;

    instance
      .writeFile(data)
      .then(function(response) {
        if (response.state) {
          if (response.exists) {
            instance._spinner.warn("Configuration file exist");
          } else {
            instance._spinner.succeed(
              "Configuration file generated successfully"
            );
          }
          instance
            .installPlugin(providers)
            .then(status => {
              if (!status) {
                instance._spinner.fail(
                  `Installing package ${providers.package} failed`
                );
              }
              instance._spinner.succeed(
                `Installed ${providers.package} successfully`
              );
            })
            .catch(err => {
              instance._spinner.fail(err);
            });
        }
      })
      .catch(function(err) {
        instance._spinner.fail("Configuration file generation Failed");
      });
  }

  providerSelection({ providers }) {
    switch (providers) {
      case "AWS":
        this.createConfigFile({
          package: "nodecloud-aws-plugin@1.0.0-beta.0",
          require: "nodeCloudAwsPlugin",
          provider: `{
              name: "aws",
              tag: "aws",
              plugin: nodeCloudAwsPlugin
            }`
        });
        break;
      case "GCP":
        this.createConfigFile({
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
        this.createConfigFile({
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
        this.createConfigFile({
          package: "nodecloud-aws-plugin@1.0.0-beta.0",
          require: "nodeCloudAwsPlugin",
          provider: `{
              name: "aws",
              tag: "aws",
              plugin: nodeCloudAwsPlugin
            }`
        });
    }
  }

  selectProvider() {
    inquirer
      .prompt([
        {
          message: "Select cloud service provider",
          type: "list",
          name: "providers",
          choices: ["AWS", "GCP", "Azure"]
        }
      ])
      .then(answers => {
        this._provider = answers.providers;
        this.providerSelection(answers.providers);
      })
      .catch(err => {
        this._spinner.fail(err);
      });
  }

  selectRegion() {
    inquirer
      .prompt([
        {
          message: "Select region for cloud service provider",
          type: "list",
          name: "regions",
          choices: getRegion(this._provider)
        }
      ])
      .then(answers => {
        console.log("provider", this._provider);

        console.log("regions", answers.regions);
      })
      .catch(err => {
        this._spinner.fail(err);
      });
  }
}

module.exports = Init;
