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

  test("Create", () => {
    network.create({}, (error, data) => {
      expect(data).toMatchObject({ message: "success" });
    });
  });

  test("Delete", () => {
    network.delete({}, (error, data) => {
      expect(data).toMatchObject({ message: "success" });
    });
  });

  test("List", () => {
    network.list({}, (error, data) => {
      expect(data).toMatchObject({ message: "success" });
    });
  });

  test("Add tags", () => {
    network.addTags({}, (error, data) => {
      expect(data).toMatchObject({ message: "success" });
    });
  });

  test("Remove tags", () => {
    network.removeTags({}, (error, data) => {
      expect(data).toMatchObject({ message: "success" });
    });
  });

  test("Create zones", () => {
    network.createZone({}, (error, data) => {
      expect(data).toMatchObject({ message: "success" });
    });
  });

  test("Create zones fail", () => {
    network.createZone(undefined, (error, data) => {
      expect(data).toMatchObject({ message: "fail" });
    });
  });

  test("Delete zones", () => {
    network.deleteZone({}, (error, data) => {
      expect(data).toMatchObject({ message: "success" });
    });
  });

  test("Delete zones fail", () => {
    network.deleteZone(undefined, (error, data) => {
      expect(data).toMatchObject({ message: "fail" });
    });
  });

  test("List zones", () => {
    network.listZones({}, (error, data) => {
      expect(data).toMatchObject({ message: "success" });
    });
  });

  test("List zones fail", () => {
    network.listZones(undefined, (error, data) => {
      expect(data).toMatchObject({ message: "fail" });
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
