"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("../../utils");

var buildSNSRole;

buildSNSRole = function (name) {
  var formattedName;
  formattedName = (0, _utils.formatCF)(name);
  return {
    [`MixinPool${formattedName}SNSRole`]: {
      Type: "AWS::IAM::Role",
      DeletionPolicy: "Retain",
      Properties: {
        AssumeRolePolicyDocument: {
          Version: "2012-10-17",
          Statement: [{
            Effect: "Allow",
            Principal: {
              Service: ["cognito-idp.amazonaws.com"]
            },
            Action: ["sts:AssumeRole"]
          }]
        },
        Policies: [{
          PolicyName: `${formattedName}SNSAccess`,
          PolicyDocument: {
            Version: "2012-10-17",
            Statement: [{
              Effect: "Allow",
              Action: ["sns:*"],
              Resource: "*"
            }]
          }
        }]
      }
    }
  };
};

exports.default = buildSNSRole;