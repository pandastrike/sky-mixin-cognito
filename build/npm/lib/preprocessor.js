"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sundog = require("sundog");

var _sundog2 = _interopRequireDefault(_sundog);

var _pandaSerialize = require("panda-serialize");

var _fairmont = require("fairmont");

var _warningMessages = require("./warning-messages");

var _warningMessages2 = _interopRequireDefault(_warningMessages);

var _converter = require("./converter");

var _converter2 = _interopRequireDefault(_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Panda Sky Mixin: Cognito
// This mixin allocates the requested Cognito authorizers and user pools into your CloudFormation stack. User pools are retained after stack deletion, so here we scan for them in Cognito before adding them to a new CFo template.
var process;

process = function (_AWS_, config) {
  return [];
};

exports.default = process;