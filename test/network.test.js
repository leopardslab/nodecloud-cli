const Network = require("../lib/network");
const Awsmock = require("./Awsmock");

const options = {
  apiVersion: "2016-11-15"
};

const ncProviders = new Awsmock();

describe("Network Services", () => {
  let network = new Network(
    { type: "aws", service: "dns" },
    ncProviders,
    options
  );
  test("Create zones", () => {
    network.createZone({}, data => {
      expect(data).toMatch({ one: 1, two: 2 });
    });
  });

  test("Delete zones", () => {
    network.deleteZone({}, data => {
      expect(data).toMatch({ one: 1, two: 2 });
    });
  });

  test("List zones", () => {
    network.listZones({}, data => {
      expect(data).toMatch({ one: 1, two: 2 });
    });
  });

  test("Change record sets", () => {
    network.changeRecordSets({}, data => {
      expect(data).toMatch({ one: 1, two: 2 });
    });
  });
});
