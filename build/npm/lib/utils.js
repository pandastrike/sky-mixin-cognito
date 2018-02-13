"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.namePool = exports.formatCF = exports.extractTags = exports._exists = undefined;

var _fairmont = require("fairmont");

var _sundog = require("sundog");

var _sundog2 = _interopRequireDefault(_sundog);

var _warningMessages = require("./warning-messages");

var _warningMessages2 = _interopRequireDefault(_warningMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _addPoolARN, _exists, extractTags, formatCF, namePool;

// Sky accepts tags as an array, but Cognito's CloudFormation template wants them as dictionary.
exports.extractTags = extractTags = function (tags = []) {
  var i, len, out, tag;
  out = {};
  for (i = 0, len = tags.length; i < len; i++) {
    tag = tags[i];
    out[tag.Key] = tag.Value;
  }
  return out;
};

exports.formatCF = formatCF = function (name) {
  return (0, _fairmont.capitalize)((0, _fairmont.camelCase)((0, _fairmont.plainText)(name)));
};

exports.namePool = namePool = function (name) {
  return `MixinUserPool${formatCF(name)}`;
};

// The user pool ARN is not part of the pool data structure.  Add if possible.
_addPoolARN = (() => {
  var _ref = _asyncToGenerator(function* ({ whoAmI }, region) {
    var Account;
    ({ Account } = yield whoAmI());
    return function (pool) {
      if (pool) {
        pool.ARN = `arn:aws:cognito-idp:${region}:${Account}:userpool/${pool.Id}`;
        return pool;
      } else {
        return false;
      }
    };
  });

  return function _addPoolARN(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

// Does the user pool exist?  Return it with its ARN if it does or return false.
exports._exists = _exists = (() => {
  var _ref2 = _asyncToGenerator(function* (SDK) {
    var STS, addPoolARN, poolGet;
    ({
      AWS: {
        Cognito: { poolGet },
        STS
      }
    } = yield (0, _sundog2.default)(SDK));
    addPoolARN = yield _addPoolARN(STS, SDK.config.region);
    return (() => {
      var _ref3 = _asyncToGenerator(function* (name) {
        var e;
        try {
          return addPoolARN((yield poolGet(name)));
        } catch (error) {
          e = error;
          (0, _warningMessages2.default)(e);
          throw e;
        }
      });

      return function (_x4) {
        return _ref3.apply(this, arguments);
      };
    })();
  });

  return function _exists(_x3) {
    return _ref2.apply(this, arguments);
  };
})();

exports._exists = _exists;
exports.extractTags = extractTags;
exports.formatCF = formatCF;
exports.namePool = namePool;