'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mapActions = exports.mapState = undefined;

var _store = require('../store');

var mapState = exports.mapState = function mapState(states) {
    var res = {};
    normalizeMap(states).forEach(function (_ref) {
        var key = _ref.key,
            val = _ref.val;

        res[key] = function mappedState() {
            var store = (0, _store.getStore)();
            var state = store.getState();
            return typeof val === 'function' ? val.call(this, state) : state[val];
        };
    });
    return res;
}; /**
    * Author: chuanjie
    * Date: 2018-12-1
    */

var mapActions = exports.mapActions = function mapActions(actions) {
    var res = {};
    normalizeMap(actions).forEach(function (_ref2) {
        var key = _ref2.key,
            val = _ref2.val;

        res[key] = function mappedAction() {
            var store = (0, _store.getStore)();
            var dispatchParam = void 0;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            if (typeof val === 'string') {
                // 如果是字符串代表是直接同步模式 一个 action 的名字而已
                dispatchParam = {
                    type: val,
                    // 修正一般情况下的参数 一般支持只传一个参数
                    // 如果真的是多个参数的话 那么 payload 就是参数组成的数组
                    payload: args.length > 1 ? args : args[0]
                };
            } else {
                // 如果说是函数 则先调用执行
                // 否则直接 dispatch 该值 例如说是个 promise
                dispatchParam = typeof val === 'function' ? val.apply(store, args) : val;
            }
            return store.dispatch.call(store, dispatchParam);
        };
    });
    return res;
};

function normalizeMap(map) {
    return Array.isArray(map) ? map.map(function (key) {
        return { key: key, val: key };
    }) : Object.keys(map).map(function (key) {
        return { key: key, val: map[key] };
    });
}