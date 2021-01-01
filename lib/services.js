const Core = require("./core");
const Init = require("./init");
const { logger, logofied } = require("./helper");
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
  if (program.about) {
    logofied("NodeCloud CLI");
  }
  if (program.init) {
    let Initialize = new Init(program, spinner);
    Initialize.selectProvider();
  } else if (!program.about) {
    core = new Core();
    ncProviders = core.ncProviders();
  }
  if (program.compute) {
    let compute = new Compute(program, ncProviders, options);
    switch (program.compute) {
      case "create":
        compute.createInstance(
          {
            params: {
              ImageId: program.image,
              InstanceType: program.instance,
              MinCount: 1,
              MaxCount: 1
            },
            instanceParams: {
              Key: "Name",
              Value: program.name
            }
          },
          (error, data) => {
            if (error) {
              logger(error, true, program.table);
            }
            logger(data, error, program.table);
          }
        );
        break;
      case "list":
        compute.listInstances({}, (error, data) => {
          if (error) {
            logger(error, true, program.table);
          }
          logger(data, error, program.table);
        });
        break;
      case "stop":
        compute.stopInstance(
          {
            InstanceIds: [program.id]
          },
          (error, data) => {
            if (error) {
              logger(error, true, program.table);
            }
            logger(data, error, program.table);
          }
        );
        break;
      case "reboot":
        compute.rebootInstance(
          {
            InstanceIds: [program.id]
          },
          (error, data) => {
            if (error) {
              logger(error, true, program.table);
            }
            logger(data, error, program.table);
          }
        );
        break;
      case "start":
        compute.startInstance(
          {
            InstanceIds: [program.id]
          },
          (error, data) => {
            if (error) {
              logger(error, true, program.table);
            }
            logger(data, error, program.table);
          }
        );
        break;
      case "destroy":
        compute.destroyInstance(
          {
            InstanceIds: [program.id]
          },
          (error, data) => {
            if (error) {
              logger(error, true, program.table);
            }
            logger(data, error, program.table);
          }
        );
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
        storage.createStorage(
          {
            Bucket: program.name,
            ACL: "public-read"
          },
          (error, data) => {
            logger(data, error, program.table);
          }
        );
        break;
      case "list":
        storage.listStorage({}, (error, data) => {
          if (error) {
            logger(error, true, program.table);
          }
          logger(data, error, program.table);
        });
        break;
      case "upload":
        storage.uploadToStorage({}, (error, data) => {
          if (error) {
            logger(error, true, program.table);
          }
          logger(data, error, program.table);
        });
        break;
      case "delete":
        storage.deleteStorage(
          {
            Bucket: program.name
          },
          (error, data) => {
            if (error) {
              logger(error, true, program.table);
            }
            logger(data, error, program.table);
          }
        );
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
            logger(error, true, program.table);
          }
          logger(data, error, program.table);
        });
        break;
      case "query":
        database.query(option, (error, data) => {
          if (error) {
            logger(error, true, program.table);
          }
          logger(data, error, program.table);
        });
        break;
      case "delete":
        database.delete(option, (error, data) => {
          if (error) {
            logger(error, true, program.table);
          }
          logger(data, error, program.table);
        });
        break;
      case "update":
        database.updateItem(option, (error, data) => {
          if (error) {
            logger(error, true);
          }
          logger(data, error, program.table);
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
        iam.createGroup(
          {
            GroupName: program.name
          },
          (error, data) => {
            if (error) {
              logger(error, true, program.table);
            }
            logger(data, error, program.table);
          }
        );
        break;
      case "delete":
        iam.deleteGroup(
          {
            GroupName: program.name
          },
          (error, data) => {
            if (error) {
              logger(error, true, program.table);
            }
            logger(data, error, program.table);
          }
        );
        break;
      case "attach":
        iam.attachResoure(
          {
            GroupName: program.name,
            PolicyArn: `arn:aws:iam::aws:policy/${program.arName}`
          },
          (error, data) => {
            if (error) {
              logger(error, true, program.table);
            }
            logger(data, error, program.table);
          }
        );
        break;
      case "detach":
        iam.detachResource(
          {
            GroupName: program.name,
            PolicyArn: `arn:aws:iam::aws:policy/${program.arName}`
          },
          (error, data) => {
            if (error) {
              logger(error, true);
            }
            logger(data, error, program.table);
          }
        );
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
              logger(error, true);
            }
            logger(data, error, program.table);
          }
        );
        break;
      case "list":
        network.list({}, (error, data) => {
          if (error) {
            logger(error, true);
          }
          logger(data, error, program.table);
        });
        break;
      case "delete":
        network.delete(
          {
            LoadBalancerName: program.name
          },
          (error, data) => {
            if (error) {
              logger(error, true);
            }
            logger(data, error, program.table);
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
              logger(error, true);
            }
            logger(data, error, program.table);
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
              logger(error, true);
            }
            logger(data, error, program.table);
          }
        );
        break;
      case "createz":
        network.createZone(
          { CallerReference: program.cr, Name: program.name },
          (error, data) => {
            if (error) {
              logger(error, true);
            }
            logger(data, error, program.table);
          }
        );
        break;
      case "listz":
        network.listZones({}, (error, data) => {
          if (error) {
            logger(error, true);
          }
          logger(data, error, program.table);
        });
        break;
      case "deletez":
        network.deleteZone(
          { Id: `/hostedzone/${program.id}` },
          (error, data) => {
            if (error) {
              logger(error, true);
            }
            logger(data, error, program.table);
          }
        );
        break;
      case "record":
        network.changeRecordSets({}, (error, data) => {
          if (error) {
            logger(error, true);
          }
          logger(data, error, program.table);
        });
        break;
      default:
        throw new Error("Please select a valid command for Database");
        break;
    }
  }
}

module.exports = Services;
