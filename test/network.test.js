const Network = require("../lib/network");
const Awsmock = require("./Awsmock");

const options = {
  apiVersion: "2016-11-15"
};

const ncProviders = { aws: new Awsmock(options), gcp: "", azure: "" };

describe("Network Services", () => {
  let network = new Network(
    { type: "aws", service: "dns" },
    ncProviders,
    options
  );
  test("Create zones", () => {
    network.createZone({}, data => {
      expect(data).toMatch({ message: "success" });
    });
  });

  test("Delete zones", () => {
    network.deleteZone({}, data => {
      expect(data).toMatch({ message: "success" });
    });
  });

  test("List zones", () => {
    network.listZones({}, data => {
      expect(data).toMatch({ message: "success" });
    });
  });

  test("Change record sets", () => {
    network.changeRecordSets({}, data => {
      expect(data).toMatch({ message: "success" });
    });
  });
});
