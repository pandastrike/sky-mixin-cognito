"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsYaml = require("js-yaml");

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fairmont = require("fairmont");

var _sundog = require("sundog");

var _sundog2 = _interopRequireDefault(_sundog);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Panda Sky Mixin: Cognito Lambda environment variables
// This mixin grants the API Lambdas access to User Pools, allowing the developer to conduct user login/out.  This looks up the User Pool IDs and their Client IDs so that they may be stored within the Lambda's environment variable store.
var getEnvironmentVariables;

// TODO: For now, this will only store the first pool's User Pool and client IDs. Make this more generalized.
getEnvironmentVariables = (() => {
  var _ref = _asyncToGenerator(function* (config, global, SDK) {
    var Id, clientID, exists, names;
    exists = yield (0, _utils._exists)(SDK);
    names = (0, _fairmont.collect)((0, _fairmont.project)("name", config.pools));
    if (!names || (0, _fairmont.empty)(names)) {
      return {};
    } else {
      if (({ Id, clientID } = yield exists(names[0]))) {
        return {
          mixinCognitoPoolID: Id,
          mixinCognitoClientID: yield clientID
        };
      } else {
        return {
          mixinCognitoPoolID: JSON.stringify({
            Ref: (0, _utils.namePool)(names[0])
          }),
          mixinCognitoClientID: JSON.stringify({
            Ref: (0, _utils.nameClient)(names[0])
          })
        };
      }
    }
  });

  return function getEnvironmentVariables(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = getEnvironmentVariables;