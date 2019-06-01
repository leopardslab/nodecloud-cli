const detectInstalled = require("detect-installed");

detectInstalled("nodecloud-gcp-plugins").then(exists => {
  console.log(exist); // => true
});
