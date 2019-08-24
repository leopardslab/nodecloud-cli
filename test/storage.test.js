const Storage = require("../lib/storage");
const Awsmock = require("./Awsmock");

const options = {
  apiVersion: "2016-11-15"
};

const ncProviders = { aws: new Awsmock(options), gcp: "", azure: "" };

describe("Storage Services", () => {
  let storage = new Storage({ type: "aws" }, ncProviders, options);
  test("Create storage", () => {
    storage.createStorage({}, data => {
      expect(data).toMatch({ message: "success" });
    });
  });

  test("Delete storage", () => {
    storage.deleteStorage({}, data => {
      expect(data).toMatch({ message: "success" });
    });
  });

  test("List storage", () => {
    storage.listStorage({}, data => {
      expect(data).toMatch({ message: "success" });
    });
  });

  test("Upload to storage", () => {
    storage.uploadToStorage({}, data => {
      expect(data).toMatch({ message: "success" });
    });
  });
});
