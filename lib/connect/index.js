'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = connect;

var _store = require('../store');

var _index = require('../helpers/index');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * Author: chuanjie
                                                                                                                                                                                                                   * Date: 2018-12-1
                                                                                                                                                                                                                   */

function connect(states, actions) {
    states = (0, _index.mapState)(states || {});
    actions = (0, _index.mapActions)(actions || {});
    return function connectComponent(Component) {
        var unSubscribe = null;
        // 绑定
        var _onLoad = Component.prototype.onLoad;
        var _onUnload = Component.prototype.onUnload;

        var onStateChange = function onStateChange() {
            var _this = this;

            var store = (0, _store.getStore)();
            var hasChanged = false;
            Object.keys(states).forEach(function (k) {
                var newV = states[k]();
                if (_this.data[k] !== newV) {
                    // 不相等
                    _this.setData(_defineProperty({}, k, newV));
                    hasChanged = true;
                }
            });
        };
        return function (_Component) {
            _inherits(_class, _Component);

            function _class() {
                _classCallCheck(this, _class);

                var _this2 = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

                _this2.computed = Object.assign(_this2.computed || {}, states, (0, _index.mapState)({
                    $state: function $state(state) {
                        return state;
                    }
                }));
                var protoMethod = {};
                var proto = _this2.__proto__.__proto__.__proto__;
                if (proto) {
                    Object.getOwnPropertyNames(proto || []).forEach(function (prop) {
                        if (prop !== 'constructor') {
                            protoMethod[prop] = proto[prop];
                        }
                    });
                }
                _this2.methods = Object.assign(_this2.methods || {}, actions, protoMethod);
                return _this2;
            }

            _createClass(_class, [{
                key: 'onLoad',
                value: function onLoad() {
                    var store = (0, _store.getStore)();
                    unSubscribe = store.subscribe(onStateChange.bind(this));
                    onStateChange.call(this);
                    _onLoad && _onLoad.apply(this, arguments);
                }
            }, {
                key: 'onUnload',
                value: function onUnload() {
                    unSubscribe && unSubscribe();
                    unSubscribe = null;
                    _onUnload && _onUnload.apply(this, arguments);
                }
            }]);

            return _class;
        }(Component);
    };
};