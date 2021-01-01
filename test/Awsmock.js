class Awsmock {
  constructor(options) {
    this.config = {
      credentials: "Awsmock",
      loadFromPath: function() {
        return true;
      }
    };
    return {
      compute: this.compute,
      iam: this.iam,
      dns: this.dns,
      bucket: this.bucket
    };
  }

  compute() {
    let create = function(option1, option2) {
      return new Promise(function(resolve, reject) {
        if (option1 === undefined || option2 === undefined) {
          reject({ message: "fail" });
        }
        resolve({ InstanceID: "i-028ed83d848a49343" });
      });
    };

    let list = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({
          Instances: [
            { InstanceID: "i-028ed83d848a49343" },
            { InstanceID: "i-024ed86d748a48378" }
          ]
        });
      });
    };
    let stop = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({ InstanceID: "i-028ed83d848a49343" });
      });
    };
    let start = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({ InstanceID: "i-028ed83d848a49343" });
      });
    };
    let reboot = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({ InstanceID: "i-028ed83d848a49343" });
      });
    };
    let destroy = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({ InstanceID: "i-028ed83d848a49343" });
      });
    };

    return {
      create: create,
      list: list,
      stop: stop,
      start: start,
      reboot: reboot,
      destroy: destroy
    };
  }

  iam() {
    let createGroup = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({
          Group: {
            Arn: "arn:aws:iam::123456789012:group/Admins",
            CreateDate: "2019-09-10",
            GroupId: "AIDGPMS9RO4H3FEXAMPLE",
            GroupName: "Admins",
            Path: "/"
          }
        });
      });
    };
    let deleteGroup = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({ message: "success" });
      });
    };
    let attachGroupPolicy = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({ message: "success" });
      });
    };
    let detachGroupPolicy = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({ message: "success" });
      });
    };

    return {
      createGroup: createGroup,
      deleteGroup: deleteGroup,
      attachGroupPolicy: attachGroupPolicy,
      detachGroupPolicy: detachGroupPolicy
    };
  }

  dns() {
    let create = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({ message: "success" });
      });
    };

    let deleteFunction = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({ message: "success" });
      });
    };

    let list = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({ message: "success" });
      });
    };

    let addTags = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({ message: "success" });
      });
    };

    let removeTags = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({ message: "success" });
      });
    };

    let createZone = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({ message: "success" });
      });
    };
    let deleteZone = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({ message: "success" });
      });
    };
    let listZones = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({ message: "success" });
      });
    };
    let changeRecordSets = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({
          ChangeInfo: {
            Comment: "Web server for example.com",
            Id: "/change/C2682N5HXP0BZ4",
            Status: "PENDING",
            SubmittedAt: "2019-08-12"
          }
        });
      });
    };

    return {
      create: create,
      delete: deleteFunction,
      list: list,
      addTags: addTags,
      removeTags: removeTags,
      createZone: createZone,
      deleteZone: deleteZone,
      listZones: listZones,
      changeRecordSets: changeRecordSets
    };
  }

  bucket() {
    let create = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({
          Location: "http://examplebucket.s3.amazonaws.com/"
        });
      });
    };

    let list = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({
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
    };

    let upload = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({
          Location: "http://examplebucket.s3.amazonaws.com/1b2cf535f277"
        });
      });
    };

    let deleteFunction = function(options) {
      return new Promise(function(resolve, reject) {
        if (options === undefined) {
          reject({ message: "fail" });
        }
        resolve({ message: "success" });
      });
    };

    return {
      create: create,
      list: list,
      upload: upload,
      delete: deleteFunction
    };
  }
}

module.exports = Awsmock;
