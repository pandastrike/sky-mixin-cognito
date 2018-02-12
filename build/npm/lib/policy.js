"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fairmont = require("fairmont");

var _utils = require("./utils");

// Panda Sky Mixin: Cognito Lambda permission policy
// This mixin grants the API Lambdas access to User Pools, allowing the developer to conduct user login/out.
// That IAM Role permission is rolled into your CloudFormation stack after being generated here.
var Policy;

Policy = function (config, global) {
  var i, len, n, names, region, resources;
  // Grant total access to the user pools listed in this mixin.
  // TODO: Consider limiting the actions on those pools and/or how to specify limitations within the mixin configuration.
  ({ region } = global.aws);
  names = (0, _fairmont.collect)((0, _fairmont.project)("name", config.pools));
  resources = [];
  for (i = 0, len = names.length; i < len; i++) {
    n = names[i];
    resources.push(JSON.stringify({
      "Fn::GetAtt": [(0, _utils.namePool)(n), "Arn"]
    }));
  }
  return [{
    Effect: "Allow",
    Action: ["cognito-idp:*"],
    Resource: resources
  }];
};

exports.default = Policy;