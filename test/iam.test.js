const Iam = require("../lib/iam");
const Awsmock = require("./Awsmock");

const options = {
  apiVersion: "2016-11-15"
};

const ncProviders = new Awsmock();

describe("IAM Services", () => {
  let iam = new Iam({ type: "aws" }, ncProviders, options);
  test("Create group", () => {
    iam.createGroup({}, () => {
      expect({ one: 1, two: 2 }).toMatch({ one: 1, two: 2 });
    });
  });

  test("Delete group", () => {
    iam.deleteGroup({}, () => {
      expect({ one: 1, two: 2 }).toMatch({ one: 1, two: 2 });
    });
  });

  test("Attache resource to group", () => {
    iam.attachResoure({}, () => {
      expect({ one: 1, two: 2 }).toMatch({ one: 1, two: 2 });
    });
  });

  test("Dettach resource from group", () => {
    iam.detachResource({}, () => {
      expect({ one: 1, two: 2 }).toMatch({ one: 1, two: 2 });
    });
  });
});
