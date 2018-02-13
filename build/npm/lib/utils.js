"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.namePool = exports.formatCF = exports.extractTags = undefined;

var _fairmont = require("fairmont");

var extractTags, formatCF, namePool;

// Sky accepts tags as an array, but Cognito's CloudFormation template wants them as dictionary.
exports.extractTags = extractTags = function (tags = []) {
  var i, len, out, tag;
  out = {};
  for (i = 0, len = tags.length; i < len; i++) {
    tag = tags[i];
    out[tag.Key] = tag.Value;
  }
  out["DeployTool"] = "Panda Sky";
  return out;
};

exports.formatCF = formatCF = function (name) {
  return (0, _fairmont.capitalize)((0, _fairmont.camelCase)((0, _fairmont.plainText)(name)));
};

exports.namePool = namePool = function (name) {
  return `MixinUserPool${formatCF(name)}`;
};

exports.extractTags = extractTags;
exports.formatCF = formatCF;
exports.namePool = namePool;