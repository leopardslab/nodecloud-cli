const Storage = require("../lib/storage");
const Awsmock = require("./Awsmock");

const options = {
  apiVersion: "2016-11-15"
};

const ncProviders = new Awsmock();

describe("Storage Services", () => {
  let storage = new Storage({ type: "aws" }, ncProviders, options);
  test("Create storage", () => {
    storage.createStorage({}, () => {
      expect(data).toMatch({ one: 1, two: 2 });
    });
  });

  test("Delete storage", () => {
    storage.deleteStorage({}, () => {
      expect(data).toMatch({ one: 1, two: 2 });
    });
  });

  test("List storage", () => {
    storage.listStorage({}, () => {
      expect(data).toMatch({ one: 1, two: 2 });
    });
  });

  test("Upload to storage", () => {
    storage.uploadToStorage({}, () => {
      expect(data).toMatch({ one: 1, two: 2 });
    });
  });
});
