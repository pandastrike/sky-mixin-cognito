"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsYaml = require("js-yaml");

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Panda Sky Cognito Mixin - Preset "Frictionless"
// This preset is meant to assemble the configuration needed to allow a developer to build authentication / authorization into their API that relies entirely on the secret key stored within the end-user's device.  This facilitates a fast, non-manual login experience, after the device is added during.
var FrictionlessConfig;

FrictionlessConfig = function (name, tags) {
  var formattedName, poolName, snsTopic;
  formattedName = (0, _utils.formatCF)(name);
  poolName = (0, _utils.namePool)(name);
  snsTopic = `CognitoPool${formattedName}Caller`;
  return {
    name: name,
    description: _jsYaml2.default.safeDump({
      [`${poolName}`]: {
        Type: "AWS::Cognito::UserPool",
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
            AttributeDataType: "string",
            DeveloperOnlyAttribute: false,
            Mutable: true,
            Required: true
          }, {
            Name: "phone_number",
            AttributeDataType: "string",
            DeveloperOnlyAttribute: false,
            Mutable: true,
            Required: true
          }],
          SmsConfiguration: {
            SnsCallerArn: {
              Ref: `${formattedName}SNSTopic`
            }
          },
          UserPoolTags: tags
        }
      }
    }),
    ancillaryResources: [_jsYaml2.default.safeDump({
      [`MixinPool${formattedName}SNSTopic`]: {
        Type: "AWS::SNS::Topic",
        DeletionPolicy: "Retain",
        Properties: {
          DisplayName: snsTopic,
          TopicName: snsTopic
        }
      }
    }), _jsYaml2.default.safeDump({
      [`MixinPool${formattedName}SNSAccess`]: {
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
                Resource: [`arn:aws:sns:*:*:${snsTopic}`, `arn:aws:sns:*:*:${snsTopic}:*`]
              }]
            }
          }]
        }
      }
    })],
    authorizer: _jsYaml2.default.safeDump({
      [`MixinPool${formattedName}Authorizer`]: {
        Type: "AWS::ApiGateway::Authorizer",
        Properties: {
          Type: "COGNITO_USER_POOLS",
          IdentitySource: "method.request.header.Authorization",
          Name: name,
          ProviderARNs: [{
            Ref: poolName
          }],
          RestApiId: {
            Ref: "API"
          }
        }
      }
    })
  };
};

exports.default = FrictionlessConfig;