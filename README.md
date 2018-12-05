# wexp-redux
该插件仅使用于`wexp`框架，`wexp-cli`版本要求`^1.0.5`

## 安装
```bash
$ npm i wexp-redux -S --production
```

## 用法

### API

| 可以被import的属性 | 类型 | 参数 | 描述 |
|-------------|----------|--------------|----------------------------------------------------------------|
| `connect` | `Function` | (func, func, array) | redux链接函数 |
| `setStore`   | `Function` | (obj) | 设置store的实例 |
| `getStore`     | `Function` | () | 获取store的实例 |


#### connect
前两个参数同react-redux, 为函数类型，其中第一个参数可以将state中的属性注入到组件的data中，第二个参数则是将action注入到组件的方法中

示例：
```javascript
@connect({
  getNum (state) {
    return state.crement.num
  },
  getSyncNum (state) {
    return state.crement.asyncNum
  }
}, {
  asyncInc,
  inCrement,
  desCrement
})
export default class Index extends wexp.page {}
```

#### setStore
相当于初始化，必须在项目初始化的时候去设置，可以在app.xu中调用

示例：
```javascript
const store = createStore(reducer, applyMiddleware(thunk, logger))
setStore(store)
```

### getStore
某些情况想直接使用store对象，可以来获取实例，通常不建议使用

示例：
```javascript
const store = getStore()
let state = store.getState()
let dispatch = store.dispatch
```
