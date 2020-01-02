const detectInstalled = require("detect-installed");
const fs = require("fs");
const figlet = require("figlet");
const chalk = require("chalk");
const path = "./.nc.config.js";
const emoji = require('node-emoji')

/**
 * Display text as CLI logo
 * @param {*} text
 */
let logofied = text => {
  figlet.text(
    text,
    {
      font: "slant",
      horizontalLayout: "default",
      verticalLayout: "default"
    },
    function(err, data) {
      if (err) {
        logger(err, true);
        return;
      }
      console.log(chalk.blue(data));
      console.log(
        chalk.green(`Sustainable Computing Research Group ${emoji.get('heart')}`) +
          chalk.blue(` (SCoRe) ${emoji.get('heart')}`)
      );
    }
  );
};

/**
 * Logs the values with colors according to the type
 * @param {*} data
 * @param {*} error
 */
let logger = (data, error) => {
  if (error) {
    console.log(chalk.red(`${emoji.get('warning')} \n ${JSON.stringify(data, null, 2)}`));
  } else {
    console.log(chalk.green(`${emoji.get('warning')} ${JSON.stringify(data, null, 2)}`));
  }
};

/**
 * checkPlugin check whether the plugin installed
 * @param {*} plugin
 */
let checkPlugin = plugin => {
  return new Promise(function(resolve, reject) {
    detectInstalled(plugin).then(exists => {
      if (exists) {
        resolve(true);
      }
      resolve(false);
    });
  });
};

/**
 * checkNcConfig check whether the configfile exist
 * @param {*} plugin
 */
let checkNcConfig = plugin => {
  return new Promise(function(resolve, reject) {
    try {
      if (fs.existsSync(path)) {
        resolve(true);
      }
      resolve(false);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * write Meta data for plugin
 * @param {*} plugin
 */
let writeMetaData = (plugin, region) => {
  let meta = {
    plugin: []
  };
  let json = JSON.stringify(meta);

  return new Promise(function(resolve, reject) {
    fs.exists("ncmeta.json", function(exists) {
      if (exists) {
        fs.readFile("ncmeta.json", function readFileCallback(err, data) {
          if (err) {
            reject(err);
          } else {
            meta = JSON.parse(data); //now it an object
            meta.plugin.push({ name: plugin, region: region }); //add some data
            json = JSON.stringify(meta); //convert it back to json
            fs.writeFile("ncmeta.json", json, "utf8", err => {
              if (err) reject(err);
              resolve(true);
            }); // write it back
          }
        });
      } else {
        fs.writeFile("ncmeta.json", json, "utf8", err => {
          if (err) reject(err);
          resolve(true);
        });
      }
    });
  });
};

module.exports = {
  checkPlugin: checkPlugin,
  checkNcConfig: checkNcConfig,
  writeMetaData: writeMetaData,
  logger: logger,
  logofied: logofied
};
