"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("../../utils");

var buildPool;

buildPool = function (name, tags) {
  var formattedName;
  formattedName = (0, _utils.formatCF)(name);
  return {
    [`${(0, _utils.namePool)(name)}`]: {
      Type: "AWS::Cognito::UserPool",
      DependsOn: [`MixinPool${formattedName}SNSRole`],
      DeletionPolicy: "Retain",
      Properties: {
        UserPoolName: name,
        AdminCreateUserConfig: {
          AllowAdminCreateUserOnly: true
        },
        AutoVerifiedAttributes: ["email", "phone_number"],
        DeviceConfiguration: {
          ChallengeRequiredOnNewDevice: true,
          DeviceOnlyRememberedOnUserPrompt: false
        },
        MfaConfiguration: "ON",
        Schema: [{
          Name: "email",
          AttributeDataType: "String",
          DeveloperOnlyAttribute: false,
          Mutable: true,
          Required: true
        }, {
          Name: "phone_number",
          AttributeDataType: "String",
          DeveloperOnlyAttribute: false,
          Mutable: true,
          Required: true
        }],
        SmsConfiguration: {
          ExternalId: `${formattedName}-external-id`,
          SnsCallerArn: {
            "Fn::GetAtt": [`MixinPool${formattedName}SNSRole`, "Arn"]
          }
        },
        UserPoolTags: (0, _utils.extractTags)(tags)
      }
    }
  };
};

exports.default = buildPool;