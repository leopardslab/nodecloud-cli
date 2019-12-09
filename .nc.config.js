const nodeCloudAwsPlugin = require("nodecloud-aws-plugin");

const providers = [
  {
    name: "aws",
    tag: "aws",
    plugin: nodeCloudAwsPlugin
  }
];

module.exports = providers;
