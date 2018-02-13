"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fairmont = require("fairmont");

var _frictionless = require("./frictionless");

var _frictionless2 = _interopRequireDefault(_frictionless);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Panda Sky - Cognito Presets
// The configuration within Cognito resources is complex.  To guide developers toward their use-case goals and simplify the mixin interface, this mixin provides "presets."  The following code expands these named presets into a opinionated Cognito congfiguration that meet their needs.
var Expand;

Expand = function (pool, tags, deployment) {
  var name, type;
  ({ name, type } = pool);
  switch (type) {
    case "frictionless":
      return (0, _frictionless2.default)(name, tags, deployment);
    default:
      throw new Error(`Unknown type preset ${type}. Unable to continue.`);
  }
};

exports.default = Expand;