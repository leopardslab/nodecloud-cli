const fs = require("fs");
const emoji = require("node-emoji");
const detectInstalled = require("detect-installed");
const { exec } = require("child_process");
const emoji = require('node-emoji')

function installDependencies(path, cb) {
  exec(`cd ${path} && npm install`, (error, stdout, stderr) => {
    if (error) {
      console.log("error ${emoji.get('interrobang')}", error);
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
