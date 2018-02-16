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
          AllowAdminCreateUserOnly: false
        },
        AutoVerifiedAttributes: ["email", "phone_number"],
        AliasAttributes: ["email", "phone_number"],
        DeviceConfiguration: {
          ChallengeRequiredOnNewDevice: true,
          DeviceOnlyRememberedOnUserPrompt: false
        },
        MfaConfiguration: "ON",
        Policies: {
          PasswordPolicy: {
            MinimumLength: 10,
            RequireLowercase: false,
            RequireNumbers: false,
            RequireSymbols: false,
            RequireUppercase: false
          }
        },
        Schema: [{
          AttributeDataType: "String",
          DeveloperOnlyAttribute: false,
          Mutable: true,
          Name: "password",
          Required: false
        }],
        SmsConfiguration: {
          ExternalId: `${formattedName}-external-id`,
          SnsCallerArn: {
            "Fn::GetAtt": [`MixinPool${formattedName}SNSRole`, "Arn"]
          }
        },
        SmsAuthenticationMessage: "Your verification code is {####}",
        SmsVerificationMessage: "Your verification code is {####}",
        EmailVerificationSubject: "Verficiation Code",
        EmailVerificationMessage: "Your verification code is {####}",
        UserPoolTags: (0, _utils.extractTags)(tags)
      }
    }
  };
};

exports.default = buildPool;