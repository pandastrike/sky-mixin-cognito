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

var _presets = require("./presets");

var _presets2 = _interopRequireDefault(_presets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Panda Sky Mixin: Cognito
// This mixin allocates the requested Cognito user pools, clients, and authorizers into your CloudFormation stack. User pools and clients are retained after stack deletion, so here we scan for them in Cognito before adding them to a new CFo template.
var process;

process = (() => {
  var _ref = _asyncToGenerator(function* (_AWS_, config) {
    var c, env, exists, i, len, output, p, poolGet, pools, tags;
    ({
      AWS: {
        Cognito: { poolGet }
      }
    } = yield (0, _sundog2.default)(_AWS_));
    exists = (() => {
      var _ref2 = _asyncToGenerator(function* (name) {
        var e;
        try {
          return yield poolGet(name);
        } catch (error) {
          e = error;
          (0, _warningMessages2.default)(e);
          throw e;
        }
      });

      return function exists(_x3) {
        return _ref2.apply(this, arguments);
      };
    })();
    // Start by extracting out the Cognito Mixin configuration:
    ({ env, tags = [] } = config);
    c = config.aws.environments[env].mixins.cognito;
    c = (0, _fairmont.isObject)(c) ? c : {};
    c.tags = (0, _fairmont.cat)(c.tags || [], tags);
    // Expand the preset name to the full configuraiton template.
    ({ pools = [], tags } = c);
    pools = (0, _presets2.default)(pools, tags);
    // Scan for user pools that already exist.
    output = [];
    for (i = 0, len = pools.length; i < len; i++) {
      p = pools[i];
      if (yield exists(p.name)) {
        // Here, we only need the Gateway Authorizer resource.
        output.push(p.authorizer);
      } else {
        // Here, we need the whole Cognito resource stack.
        output.push(p);
      }
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