const Compute = require("../lib/compute");
const Awsmock = require("./Awsmock");

const options = {
  apiVersion: "2016-11-15"
};

const ncProviders = { nodecloud: { aws: new Awsmock(), gcp: "", azure: "" } };

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
      data => {
        expect(data).toMatch({ InstanceID: "i-028ed83d848a49343" });
      }
    );
  });

  test("List instances", () => {
    compute.listInstances({}, data => {
      expect(data).toMatch({ Instances: [] });
    });
  });

  test("Stop instance", () => {
    compute.stopInstance({}, data => {
      expect(data).toMatch({ InstanceID: "i-028ed83d848a49343" });
    });
  });

  test("Start instance", () => {
    compute.startInstance({}, data => {
      expect(data).toMatch({ InstanceID: "i-028ed83d848a49343" });
    });
  });

  test("Reboot instance", () => {
    compute.rebootInstance({}, data => {
      expect(data).toMatch({ InstanceID: "i-028ed83d848a49343" });
    });
  });

  test("Destroy instance", () => {
    compute.destroyInstance({}, data => {
      expect({ one: 1, two: 2 }).toMatch({ InstanceID: "i-028ed83d848a49343" });
    });
  });
});
