"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getStore = getStore;
exports.setStore = setStore;
/**
 * Author: chuanjie
 * Date: 2018-12-1
 */

var store = null;

function getStore() {
    return store;
}

function setStore(s) {
    store = s;
}