'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStore = exports.setStore = exports.connect = undefined;

var _index = require('./connect/index');

var _index2 = _interopRequireDefault(_index);

var _store = require('./store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Author: chuanjie
 * Date: 2018-12-1
 */

exports.connect = _index2.default;
exports.setStore = _store.setStore;
exports.getStore = _store.getStore;