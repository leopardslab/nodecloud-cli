const Compute = require("../lib/compute");
const Awsmock = require("./Awsmock");

const options = {
  apiVersion: "2016-11-15"
};

const ncProviders = { aws: new Awsmock(options), gcp: "", azure: "" };

describe("Compute Services", () => {
  let compute = new Compute({ type: "aws" }, ncProviders, options);

  test("Create instance", () => {
    compute.createInstance(
      {
        params: {
          ImageId: "ami-090f10efc254eaf55",
          InstanceType: "t2.micro",
          MinCount: 1,
          MaxCount: 1
        },
        instanceParams: {
          Key: "Name",
          Value: "Test"
        }
      },
      (error, data) => {
        expect(data).toMatchObject({ InstanceID: "i-028ed83d848a49343" });
      }
    );
  });

  test("List instances", () => {
    compute.listInstances({}, (error, data) => {
      expect(data).toMatchObject({
        Instances: [
          { InstanceID: "i-028ed83d848a49343" },
          { InstanceID: "i-024ed86d748a48378" }
        ]
      });
    });
  });

  test("Stop instance", () => {
    compute.stopInstance({}, (error, data) => {
      expect(data).toMatchObject({ InstanceID: "i-028ed83d848a49343" });
    });
  });

  test("Start instance", () => {
    compute.startInstance({}, (error, data) => {
      expect(data).toMatchObject({ InstanceID: "i-028ed83d848a49343" });
    });
  });

  test("Reboot instance", () => {
    compute.rebootInstance({}, (error, data) => {
      expect(data).toMatchObject({ InstanceID: "i-028ed83d848a49343" });
    });
  });

  test("Destroy instance", () => {
    compute.destroyInstance({}, (error, data) => {
      expect(data).toMatchObject({ InstanceID: "i-028ed83d848a49343" });
    });
  });
});
