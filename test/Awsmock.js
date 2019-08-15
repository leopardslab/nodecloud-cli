class Awsmock {
  constructor() {
    this.compute = compute;
    this.iam = iam;
    this.dns = dns;
    this.bucket = bucket;
  }
}

class compute {
  create(option1, option2) {
    return new Promise(function(resolve, reject) {
      if (option1 === undefined || option2 === undefined) {
        reject({});
      }
      resolve({ InstanceID: "i-028ed83d848a49343" });
    });
  }

  list(options) {
    return new Promise(function(resolve, reject) {
      if (options === undefined) {
        reject({});
      }
      resolve([]);
    });
  }
  stop(options) {
    return new Promise(function(resolve, reject) {
      if (options === undefined) {
        reject({});
      }
      resolve({ InstanceID: "i-028ed83d848a49343" });
    });
  }
  start(options) {
    return new Promise(function(resolve, reject) {
      if (options === undefined) {
        reject({});
      }
      resolve({ InstanceID: "i-028ed83d848a49343" });
    });
  }
  reboot(options) {
    return new Promise(function(resolve, reject) {
      if (options === undefined) {
        reject({});
      }
      resolve({ InstanceID: "i-028ed83d848a49343" });
    });
  }
  destroy(options) {
    return new Promise(function(resolve, reject) {
      if (options === undefined) {
        reject({});
      }
      resolve({ InstanceID: "i-028ed83d848a49343" });
    });
  }
}

class iam {
  createGroup(options) {
    return new Promise(function(resolve, reject) {
      if (options === undefined) {
        reject({});
      }
      resolve({});
    });
  }
  deleteGroup(options) {
    return new Promise(function(resolve, reject) {
      if (options === undefined) {
        reject({});
      }
      resolve({});
    });
  }
  attachGroupPolicy(options) {
    return new Promise(function(resolve, reject) {
      if (options === undefined) {
        reject({});
      }
      resolve({});
    });
  }
  detachGroupPolicy(options) {
    return new Promise(function(resolve, reject) {
      if (options === undefined) {
        reject({});
      }
      resolve({});
    });
  }
}

class dns {
  createZone(options) {
    return new Promise(function(resolve, reject) {
      if (options === undefined) {
        reject({});
      }
      resolve({});
    });
  }
  deleteZone(options) {
    return new Promise(function(resolve, reject) {
      if (options === undefined) {
        reject({});
      }
      resolve({});
    });
  }
  listZones(options) {
    return new Promise(function(resolve, reject) {
      if (options === undefined) {
        reject({});
      }
      resolve([]);
    });
  }
  changeRecordSets(options) {
    return new Promise(function(resolve, reject) {
      if (options === undefined) {
        reject({});
      }
      resolve({});
    });
  }
}

class bucket {
  create(options) {
    return new Promise(function(resolve, reject) {
      if (options === undefined) {
        reject({});
      }
      resolve({});
    });
  }
  list(options) {
    return new Promise(function(resolve, reject) {
      if (options === undefined) {
        reject({});
      }
      resolve([]);
    });
  }
  delete(options) {
    return new Promise(function(resolve, reject) {
      if (options === undefined) {
        reject({});
      }
      resolve({});
    });
  }
}

module.exports = Awsmock;
