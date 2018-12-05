/**
 * Author: chuanjie
 * Date: 2018-12-1
 */

import { getStore } from '../store';
import { mapState, mapActions } from '../helpers/index';

export default function connect (states, actions) {
    states = mapState(states || {});
    actions = mapActions(actions || {});
    return function connectComponent(Component) {
        let unSubscribe = null;
        // 绑定
        const onLoad = Component.prototype.onLoad;
        const onUnload = Component.prototype.onUnload;

        const onStateChange = function () {
            const store = getStore();
            let hasChanged = false;
            Object.keys(states).forEach((k) => {
                const newV = states[k]();
                if (this.data[k] !== newV) {
                    // 不相等
                    this.setData({[k]: newV})
                    hasChanged = true;
                }
            });
        };
        return class extends Component {
            constructor () {
                super();
                this.computed = Object.assign(this.computed || {}, states, mapState({
                    $state(state) {
                        return state;
                    }
                }));
                const protoMethod = {}
                const proto = this.__proto__.__proto__.__proto__
                if (proto) {
                    Object.getOwnPropertyNames(proto || []).forEach(function (prop) {
                        if (prop !== 'constructor') {
                          protoMethod[prop] = proto[prop];
                        }
                    })
                }
                this.methods = Object.assign(this.methods || {}, actions, protoMethod);
            }
            onLoad() {
                const store = getStore();
                unSubscribe = store.subscribe(onStateChange.bind(this));
                onStateChange.call(this);
                onLoad && onLoad.apply(this, arguments);
            }
            onUnload () {
                unSubscribe && unSubscribe();
                unSubscribe = null;
                onUnload && onUnload.apply(this, arguments);
            }
        };
    };
};