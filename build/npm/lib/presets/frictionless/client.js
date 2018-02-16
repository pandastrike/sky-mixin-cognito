"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("../../utils");

var buildClient;

buildClient = function (name) {
  var formattedName;
  formattedName = (0, _utils.formatCF)(name);
  return {
    [`${(0, _utils.nameClient)(name)}`]: {
      Type: "AWS::Cognito::UserPoolClient",
      DeletionPolicy: "Retain",
      Properties: {
        ClientName: name,
        ExplicitAuthFlows: ["USER_PASSWORD_AUTH"],
        GenerateSecret: false,
        UserPoolId: {
          Ref: `${(0, _utils.namePool)(name)}`
        }
      }
    }
  };
};

exports.default = buildClient;