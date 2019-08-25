const Iam = require("../lib/iam");
const Awsmock = require("./Awsmock");

const options = {
  apiVersion: "2016-11-15"
};

const ncProviders = { aws: new Awsmock(options), gcp: "", azure: "" };

describe("IAM Services", () => {
  let iam = new Iam({ type: "aws" }, ncProviders, options);
  test("Create group", () => {
    iam.createGroup({}, (error, data) => {
      expect(data).toMatchObject({
        Group: {
          Arn: "arn:aws:iam::123456789012:group/Admins",
          CreateDate: "2019-09-10",
          GroupId: "AIDGPMS9RO4H3FEXAMPLE",
          GroupName: "Admins",
          Path: "/"
        }
      });
    });
  });

  test("Delete group", () => {
    iam.deleteGroup({}, (error, data) => {
      expect(data).toMatchObject({ message: "success" });
    });
  });

  test("Attache resource to group", () => {
    iam.attachResoure({}, () => (error, data) => {
      expect(data).toMatchObject({ message: "success" });
    });
  });

  test("Dettach resource from group", () => {
    iam.detachResource({}, (error, data) => {
      expect(data).toMatchObject({ message: "success" });
    });
  });
});
