"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fairmont = require("fairmont");

var _utils = require("./utils");

var _presets = require("./presets");

var _presets2 = _interopRequireDefault(_presets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Panda Sky Mixin: Cognito
// This mixin allocates the requested Cognito user pools, clients, and authorizers into your CloudFormation stack. User pools and clients are retained after stack deletion, so here we scan for them in Cognito before adding them to a new CFo template.
var process;

process = (() => {
  var _ref = _asyncToGenerator(function* (SDK, config) {
    var c, deployment, env, exists, i, len, output, p, pools, tags;
    exists = yield (0, _utils._exists)(SDK);
    // Start by extracting out the Cognito Mixin configuration:
    ({ env, tags = [] } = config);
    c = config.aws.environments[env].mixins.cognito;
    c = (0, _fairmont.isObject)(c) ? c : {};
    c.tags = (0, _fairmont.cat)(c.tags || [], tags);
    // Expand the preset name to the full configuraiton template.
    ({ pools = [], tags } = c);
    output = [];
    for (i = 0, len = pools.length; i < len; i++) {
      p = pools[i];
      // Don't ask for resources that already exist.
      deployment = yield exists(p.name);
      output.push((0, _presets2.default)(p, tags, deployment));
    }
    return {
      pools: output
    };
  });

  return function process(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = process;