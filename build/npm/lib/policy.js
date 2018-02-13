"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fairmont = require("fairmont");

var _sundog = require("sundog");

var _sundog2 = _interopRequireDefault(_sundog);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Panda Sky Mixin: Cognito Lambda permission policy
// This mixin grants the API Lambdas access to User Pools, allowing the developer to conduct user login/out.
// That IAM Role permission is rolled into your CloudFormation stack after being generated here.
var Policy;

Policy = (() => {
  var _ref = _asyncToGenerator(function* (config, global, SDK) {
    var exists, i, len, n, names, pool, resources;
    // Grant total access to the user pools listed in this mixin.  If we are adding the pool to the template we have to reference it.  If it already exists, we have to lookup its ARN ourselves.

    // TODO: Consider limiting the actions on those pools and/or how to specify limitations within the mixin configuration.
    exists = yield (0, _utils._exists)(SDK);
    names = (0, _fairmont.collect)((0, _fairmont.project)("name", config.pools));
    resources = [];
    for (i = 0, len = names.length; i < len; i++) {
      n = names[i];
      if (pool = yield exists(n)) {
        resources.push(pool.ARN);
      } else {
        resources.push(JSON.stringify({
          "Fn::GetAtt": [(0, _utils.namePool)(n), "Arn"]
        }));
      }
    }
    return [{
      Effect: "Allow",
      Action: ["cognito-idp:*"],
      Resource: resources
    }];
  });

  return function Policy(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = Policy;