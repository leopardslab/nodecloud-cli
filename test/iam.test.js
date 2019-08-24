const Iam = require("../lib/iam");
const Awsmock = require("./Awsmock");

const options = {
  apiVersion: "2016-11-15"
};

const ncProviders = { aws: new Awsmock(options), gcp: "", azure: "" };

describe("IAM Services", () => {
  let iam = new Iam({ type: "aws" }, ncProviders, options);
  test("Create group", () => {
    iam.createGroup({}, data => {
      expect(data).toMatch({
        Group: { Arn: "arn:aws:iam::123456789012:group/Admins" }
      });
    });
  });

  test("Delete group", () => {
    iam.deleteGroup({}, data => {
      expect(data).toMatch({ message: "success" });
    });
  });

  test("Attache resource to group", () => {
    iam.attachResoure({}, () => data => {
      expect(data).toMatch({ message: "success" });
    });
  });

  test("Dettach resource from group", () => {
    iam.detachResource({}, data => {
      expect(data).toMatch({ message: "success" });
    });
  });
});
