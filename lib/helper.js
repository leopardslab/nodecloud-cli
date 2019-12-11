const detectInstalled = require("detect-installed");
const fs = require("fs");
const figlet = require("figlet");
const chalk = require("chalk");
const path = "./.nc.config.js";
const Table = require("cli-table");

/**
 * Display logger output as table
 * @param {*} data
 */
let createTable = data => {
  let tableStyle = {
    chars: {
      top: "═",
      "top-mid": "╤",
      "top-left": "╔",
      "top-right": "╗",
      bottom: "═",
      "bottom-mid": "╧",
      "bottom-left": "╚",
      "bottom-right": "╝",
      left: "║",
      "left-mid": "╟",
      mid: "─",
      "mid-mid": "┼",
      right: "║",
      "right-mid": "╢",
      middle: "│"
    }
  };

  try {
    let table = new Table(tableStyle);
    let header = [];
    let body = [];

    // Creates header
    for (column in data) {
      header.push(column);
    }
    table.push(header);

    // Creates body
    for (const [key, value] of Object.entries(data)) {
      body.push(value);
    }
    table.push(body);

    return table.toString();
  } catch {
    throw new Error("This data cannot be displayed in table format:", data);
  }
};

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
        chalk.green("Sustainable Computing Research Group") +
          chalk.blue(" (SCoRe)")
      );
    }
  );
};

/**
 * Logs the values with colors according to the type
 * @param {*} data
 * @param {*} error
 */
let logger = (data, error, tableEnabled) => {
  let parsedData = JSON.parse(JSON.stringify(data));

  output = tableEnabled ? createTable(parsedData) : JSON.stringify(parsedData);

  if (error) {
    console.log(chalk.red(chalk.bgBlack(output)));
  } else {
    console.log(chalk.green(chalk.bgBlack(output)));
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
