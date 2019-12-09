const Storage = require("../lib/storage");
const Awsmock = require("./Awsmock");

const options = {
  apiVersion: "2016-11-15"
};

const ncProviders = { aws: new Awsmock(options), gcp: "", azure: "" };

describe("Storage Services", () => {
  let storage = new Storage({ type: "aws" }, ncProviders, options);
  test("Create storage", () => {
    storage.createStorage({}, (error, data) => {
      expect(data).toMatchObject({
        Location: "http://examplebucket.s3.amazonaws.com/"
      });
    });
  });

  test("Delete storage", () => {
    storage.deleteStorage({}, (error, data) => {
      expect(data).toMatchObject({ message: "success" });
    });
  });

  test("Upload storage", () => {
    storage.uploadToStorage({}, (error, data) => {
      expect(data).toMatchObject({ message: "success" });
    });
  });

  test("List storage", () => {
    storage.listStorage({}, (error, data) => {
      expect(data).toMatchObject({
        Buckets: [
          {
            CreationDate: "2019-08-12",
            Name: "examplebucket"
          },
          {
            CreationDate: "2019-08-12",
            Name: "examplebucket2"
          },
          {
            CreationDate: "2019-08-12",
            Name: "examplebucket3"
          }
        ],
        Owner: {
          DisplayName: "own-display-name",
          ID: "examplee7a2f25102679df27bb0ae12b3f85be6f290b936c4393484be31"
        }
      });
    });
  });
});
