const detectInstalled = require("detect-installed");
const fs = require("fs");
const figlet = require("figlet");
const chalk = require("chalk");
const path = "./.nc.config.js";
const Table = require("cli-table3");

const tableConfig = {
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
    throw new Error(
      chalk.bgYellow("tableForData can only takes data in array format!")
    );
    return "";
  }
  let table = new Table(tableConfig);
  let head = ["#"];
  let firstItem = data[0];

  // check if the array consists of objects
  if (typeof firstItem == "object") {
    // making the header
    for (prop in firstItem) head.push(prop);
    table.push(head);
    // making the body
    data.forEach((item, index) => {
      let temp = [index + 1];
      for (prop in item) {
        if (typeof item[prop] == "object") {
          temp.push(tablerForObject(item[prop]));
        } else {
          temp.push(item[prop]);
        }
      }
      table.push(temp);
    });
  } else {
    // If the items of the array is not objects, there cannot be the header for the table
    head.push("");
    table.push(head);
    data.forEach((item, index) => {
      table.push([index + 1, item]);
    });
  }
  return table.toString();
};

let tablerForObject = data => {
  let table = new Table(tableConfig);
  let head = [];
  let body = [];

  // making the head of the table
  for (prop in data) {
    head.push(prop);
  }
  table.push(head);

  // making the body of the table
  for (prop in data) {
    if (typeof data[prop] == "object") {
      if (Array.isArray(data[prop])) {
        body.push(tablerForArray(data[prop]));
      } else {
        body.push(tablerForObject(data[prop]));
      }
    } else {
      body.push(data[prop]);
    }
  }
  table.push(body);
  return table.toString();
};

let tabler = data => {
  if (Array.isArray(data)) {
    return tablerForArray(data);
  } else if (typeof data == "object") {
    return tablerForObject(data);
  } else {
    throw new Error(
      chalk.bgYellow(
        "Sorry, the output data cannot be displayed in table format"
      )
    );
    return data;
  }
};

/**
 * Logs the values with colors according to the type
 * @param {*} data
 * @param {*} error
 */

let logger = (data, error, table) => {
  console.log(data);
  let message = JSON.parse(data);
  if (table) {
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
