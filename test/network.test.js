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

  test("Create networks", () => {
    network.create({}, (error, data) => {
      expect(data).toMatchObject({ message: "success" });
    });
  });
  test("Delete networks", () => {
    network.delete({}, (error, data) => {
      expect(data).toMatchObject({ message: "success" });
    });
  });
  test("List networks", () => {
    network.list({}, (error, data) => {
      expect(data).toMatchObject({ message: "success" });
    });
  });
  test("Add tags", () => {
    network.addTags({}, (error, data) => {
      expect(data).toMatchObject({ message: "success" });
    });
  });
  test("Rmove tags", () => {
    network.removeTags({}, (error, data) => {
      expect(data).toMatchObject({ message: "success" });
    });
  });
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
