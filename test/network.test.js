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
    network.createZone({}, (error, data) => {
      expect(data).toMatchObject({ message: "success" });
    });
  });

  test("Delete zones", () => {
    network.deleteZone({}, (error, data) => {
      expect(data).toMatchObject({ message: "success" });
    });
  });

  test("List zones", () => {
    network.listZones({}, (error, data) => {
      expect(data).toMatchObject({ message: "success" });
    });
  });

  test("Change record sets", () => {
    network.changeRecordSets({}, (error, data) => {
      expect(data).toMatchObject({
        ChangeInfo: {
          Comment: "Web server for example.com",
          Id: "/change/C2682N5HXP0BZ4",
          Status: "PENDING",
          SubmittedAt: "2019-08-12"
        }
      });
    });
  });
});
