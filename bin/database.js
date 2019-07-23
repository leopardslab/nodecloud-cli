#!/usr/bin/env node
const program = require("commander");
const nodeCloud = require("../../nodecloud/lib");
const optionsProvider = {
  overrideProviders: false
};

const ncProviders = nodeCloud.getProviders(optionsProvider);
const options = {
  apiVersion: "2016-11-15",
  region: "eu-central-1"
};

const dynamo = ncProviders.aws.nosql(options);
const rdb = ncProviders.aws.rdbms(options);

program
  .version("0.0.1")
  .option("-d, --database <type>", "Database")
  .option("-t, --type <type>", "Database Type")
  .option("-b, --table <type>", "Table Name")
  .option("-a, --at-def list", "Instance Id")
  .option("-k, --key-def list", "Instance Id")
  .parse(process.argv);

switch (program.database) {
  case "create":
    createNewItem(program);
    break;
  case "query":
    Query(program);
    break;
  case "delete":
    Delete(program);
    break;
  case "update":
    updateItem(program);
    break;
  default:
    break;
}

function createNewItem(program) {
  dynamo
    .createItem({
      TableName: program.table,
      Item: {
        id: {
          S: "2"
        },
        title: {
          S: "ICC Cricket World Cup "
        },
        year: {
          S: "2019"
        }
      }
    })
    .then(res => {
      console.log(`All done ! ${res}`);
    })
    .catch(err => {
      console.log(`Oops something happened ${err}`);
    });
}

function Delete(program) {
  dynamo
    .deleteItem({
      TableName: program.table,
      Key: {
        id: {
          S: "1"
        }
      }
    })
    .then(res => {
      console.log(`All done ! ${res}`);
    })
    .catch(err => {
      console.log(`Oops something happened ${err}`);
    });
}

function Query(program) {
  dynamo
    .query({
      TableName: program.table,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": {
          S: "1"
        }
      }
    })
    .then(res => {
      console.log(`All done ! ${JSON.stringify(res, null, 2)}`);
    })
    .catch(err => {
      console.log(`Oops something happened ${err}`);
    });
}

function updateItem(program) {
  dynamo
    .updateItem({
      TableName: program.table,
      ExpressionAttributeNames: {
        "#T": "title",
        "#Y": "year"
      },
      ExpressionAttributeValues: {
        ":t": {
          S: "ICC World T20 "
        },
        ":y": {
          S: "2020"
        }
      },
      Key: {
        id: {
          S: "1"
        }
      },
      ReturnValues: "ALL_NEW",
      UpdateExpression: "SET #T = :t, #Y = :y"
    })
    .then(res => {
      console.log(`All done !  ${JSON.stringify(res, null, 2)}`);
    })
    .catch(err => {
      console.log(`Oops something happened ${err}`);
    });
}
