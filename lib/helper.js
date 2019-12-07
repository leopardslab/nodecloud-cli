const detectInstalled = require("detect-installed");
const fs = require("fs");
const figlet = require("figlet");
const chalk = require("chalk");
const path = "./.nc.config.js";
const Table = require("cli-table3");

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

let tablerForArray = data => {
  if (!Array.isArray(data)) {
    return "";
  }
  let finalTable = new Table({
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
  });

  let firstItem = data[0];
  let head = ["#"];
  if (typeof firstItem == "object") {
    for (prop in firstItem) head.push(prop);
    finalTable.push(head);
    // making the body
    data.forEach((item, index) => {
      let temp = [index];
      for (prop in item) {
        temp.push(item[prop]);
      }
      finalTable.push(temp);
    });
  } else {
    head.push("");
    finalTable.push(head);
    data.forEach((item, index) => {
      finalTable.push([index, item]);
    });
  }
  // console.log(finalTable);
  return finalTable.toString();
};

let tablerForObject = data => {
  let finalTable = new Table({
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
  });
  let head = [];
  let body = [];

  // making the head of the table
  for (prop in data) head.push(prop);
  finalTable.push(head);

  // making the body of the table
  for (prop in data) {
    if (typeof data[prop] == "object") {
      if (Array.isArray(data[prop])) body.push(tablerForArray(data[prop]));
      else {
        body.push(tablerForObject(data[prop]));
      }
    } else {
      body.push(data[prop]);
    }
  }
  finalTable.push(body);
  return finalTable.toString();
};

let tabler = data => {
  if (Array.isArray(data)) {
    return tablerForArray(data);
  } else if (typeof data == "object") {
    return tablerForObject(data);
  } else {
    console.log(
      chalk.bgYellow("Sorry, the output data cannot be displayed in a table")
    );
    return data;
  }
  console.log(data);
};

/**
 * Logs the values with colors according to the type
 * @param {*} data
 * @param {*} error
 */

let logger = (data, error, pretty) => {
  let message = JSON.parse(data);
  if (pretty) {
    message = tabler(message);
  } else {
    message = JSON.stringify(message);
  }
  if (error) {
    console.log(chalk.red(chalk.bgWhite(message)));
  } else {
    console.log(chalk.green(chalk.bgWhite(message)));
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
      } else {
        resolve(false);
      }
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
