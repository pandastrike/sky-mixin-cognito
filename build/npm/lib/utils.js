"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.namePool = exports.formatCF = undefined;

var _fairmont = require("fairmont");

var formatCF, namePool;

exports.formatCF = formatCF = function (name) {
  return (0, _fairmont.capitalize)((0, _fairmont.camelCase)((0, _fairmont.plainText)(name)));
};

exports.namePool = namePool = function (name) {
  return `MixinUserPool${formatCF(name)}`;
};

exports.formatCF = formatCF;
exports.namePool = namePool;