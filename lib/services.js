const figlet = require("figlet");
const chalk = require("chalk");
const Core = require("./core");
const Init = require("./init");
//import services

const Compute = require("./compute");
const Storage = require("./storage");
const Iam = require("./iam");
const Database = require("./database");
const Network = require("./network");
let core = null;
let ncProviders = null;

const options = {
  apiVersion: "2016-11-15",
  region: "eu-central-1"
};

function Services(program, spinner) {
  if (program.init) {
    let Initialize = new Init(program, spinner);
    Initialize.selectProvider();
  } else {
    core = new Core();
    ncProviders = core.ncProviders();
  }
  if (program.compute) {
    let compute = new Compute(program, ncProviders, options);
    switch (program.compute) {
      case "create":
        compute.createInstance({}, (error, data) => {
          console.log(`${JSON.stringify(data)}`);
        });
        break;
      case "list":
        compute.listInstances({}, (error, data) => {
          console.log(`${JSON.stringify(data)}`);
        });
        break;
      case "stop":
        compute.stopInstance({}, (error, data) => {
          console.log(` ${JSON.stringify(data)}`);
        });
        break;
      case "reboot":
        compute.rebootInstance({}, (error, data) => {
          console.log(`${JSON.stringify(data)}`);
        });
        break;
      case "start":
        compute.startInstance({}, (error, data) => {
          console.log(`${JSON.stringify(data)}`);
        });
        break;
      case "destroy":
        compute.destroyInstance({}, (error, data) => {
          console.log(`${JSON.stringify(data)}`);
        });
        break;

      default:
        throw new Error("Please select a valid command for Compute");
        break;
    }
  }

  if (program.storage) {
    let storage = new Storage(program, ncProviders, options);
    switch (program.storage) {
      case "create":
        storage.createStorage(options, (error, data) => {
          console.log(`list:  ${JSON.stringify(data)}`);
        });
        break;
      case "list":
        storage.listStorage((error, data) => {
          console.log(`list:  ${JSON.stringify(data)}`);
        });
        break;
      case "upload":
        storage.uploadToStorage((error, data) => {
          console.log(`list:  ${JSON.stringify(data)}`);
        });
        break;
      case "delete":
        storage.deleteStorage((error, data) => {
          console.log(`list:  ${JSON.stringify(data)}`);
        });
        break;

      default:
        throw new Error("Please select a valid command for Storage");
        break;
    }
  }

  if (program.database) {
    let database = new Database(program, ncProviders, options);
    switch (program.database) {
      case "create":
        database.createNewItem(option, (error, data) => {
          if (error) {
            console.log("error", data);
          }
          console.log(data);
        });
        break;
      case "query":
        database.query(option, (error, data) => {
          if (error) {
            console.log("error", data);
          }
          console.log(data);
        });
        break;
      case "delete":
        database.delete(option, (error, data) => {
          if (error) {
            console.log("error", data);
          }
          console.log(data);
        });
        break;
      case "update":
        database.updateItem(option, (error, data) => {
          if (error) {
            console.log("error", data);
          }
          console.log(data);
        });
        break;

      default:
        throw new Error("Please select a valid command for Database");
        break;
    }
  }

  if (program.iam) {
    let iam = new Iam(program, ncProviders, options);
    switch (program.iam) {
      case "create":
        iam.createGroup(option, (error, data) => {
          if (error) {
            console.log("error", data);
          }
          console.log(data);
        });
        break;
      case "delete":
        iam.deleteGroup(option, (error, data) => {
          if (error) {
            console.log("error", data);
          }
          console.log(data);
        });
        break;
      case "attach":
        iam.attachResoure(option, (error, data) => {
          if (error) {
            console.log("error", data);
          }
          console.log(data);
        });
        break;
      case "detach":
        iam.detachResource(option, (error, data) => {
          if (error) {
            console.log("error", data);
          }
          console.log(data);
        });
        break;

      default:
        throw new Error("Please select a valid command for IAM");
        break;
    }
  }

  if (program.network) {
    let network = new Network(program, ncProviders, options);
    switch (program.network) {
      case "create":
        network.create(
          {
            AvailabilityZones: ["eu-central-1b"],
            Listeners: [
              {
                InstancePort: program.port,
                InstanceProtocol: "HTTP",
                LoadBalancerPort: program.port--,
                Protocol: "HTTP"
              }
            ],
            LoadBalancerName: program.name
          },
          (error, data) => {
            if (error) {
              console.log("error", data);
            }
            console.log(data);
          }
        );
        break;
      case "list":
        network.list({}, (error, data) => {
          if (error) {
            console.log("error", data);
          }
          console.log(data);
        });
        break;
      case "delete":
        network.delete(
          {
            LoadBalancerName: program.name
          },
          (error, data) => {
            if (error) {
              console.log("error", data);
            }
            console.log(data);
          }
        );
        break;
      case "tag":
        network.addTags(
          {
            LoadBalancerNames: [program.name],
            Tags: [
              {
                Key: program.key,
                Value: program.value
              }
            ]
          },
          (error, data) => {
            if (error) {
              console.log("error", data);
            }
            console.log(data);
          }
        );
        break;
      case "detag":
        network.removeTags(
          {
            LoadBalancerNames: [program.name],
            Tags: [
              {
                Key: program.key
              }
            ]
          },
          (error, data) => {
            if (error) {
              console.log("error", data);
            }
            console.log(data);
          }
        );
        break;
      case "createz":
        network.createZone(
          { CallerReference: program.cr, Name: program.name },
          (error, data) => {
            if (error) {
              console.log("error", data);
            }
            console.log(data);
          }
        );
        break;
      case "listz":
        network.listZones({}, (error, data) => {
          if (error) {
            console.log("error", data);
          }
          console.log(data);
        });
        break;
      case "deletez":
        network.deleteZone(
          { Id: `/hostedzone/${program.id}` },
          (error, data) => {
            if (error) {
              console.log("error", data);
            }
            console.log(data);
          }
        );
        break;
      case "record":
        network.changeRecordSets({}, (error, data) => {
          if (error) {
            console.log("error", data);
          }
          console.log(data);
        });
        break;
      default:
        throw new Error("Please select a valid command for Database");
        break;
    }
  }
}

module.exports = Services;
