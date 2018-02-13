"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("../../utils");

var buildAuthorizer;

// If the user pool already exists, it's not in our template and must be referenced by its ARN.
buildAuthorizer = function (name, poolARN) {
  var dependencies, providers;
  dependencies = ["API"];
  if (poolARN) {
    providers = [poolARN];
  } else {
    dependencies.push((0, _utils.namePool)(name));
    providers = [{
      "Fn::GetAtt": [(0, _utils.namePool)(name, "Arn")]
    }];
  }
  return {
    [`MixinPool${(0, _utils.formatCF)(name)}Authorizer`]: {
      Type: "AWS::ApiGateway::Authorizer",
      DependsOn: dependencies,
      Properties: {
        Type: "COGNITO_USER_POOLS",
        IdentitySource: "method.request.header.Authorization",
        Name: name,
        ProviderARNs: providers,
        RestApiId: {
          Ref: "API"
        }
      }
    }
  };
};

exports.default = buildAuthorizer;