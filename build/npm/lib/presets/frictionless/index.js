"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsYaml = require("js-yaml");

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _pool = require("./pool");

var _pool2 = _interopRequireDefault(_pool);

var _snsRole = require("./sns-role");

var _snsRole2 = _interopRequireDefault(_snsRole);

var _client = require("./client");

var _client2 = _interopRequireDefault(_client);

var _authorizer = require("./authorizer");

var _authorizer2 = _interopRequireDefault(_authorizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Panda Sky Cognito Mixin - Preset "Frictionless"
// This preset is meant to assemble the configuration needed to allow a developer to build authentication / authorization into their API that relies entirely on the secret key stored within the end-user's device.  This facilitates a fast, non-manual login experience, after the device is added during.
var FrictionlessConfig;

FrictionlessConfig = function (name, tags, deployment) {
  var output;
  output = { name };
  if (!deployment) {
    output.description = _jsYaml2.default.safeDump((0, _pool2.default)(name, tags));
    output.ancillaryResources = [_jsYaml2.default.safeDump((0, _snsRole2.default)(name)), _jsYaml2.default.safeDump((0, _client2.default)(name))];
    output.authorizer = _jsYaml2.default.safeDump((0, _authorizer2.default)(name));
  } else {
    output.authorizer = _jsYaml2.default.safeDump((0, _authorizer2.default)(name, deployment.ARN));
  }
  return output;
};

exports.default = FrictionlessConfig;