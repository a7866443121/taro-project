import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // 指定扩展的选项，如名称、actionsBlacklist、actionsCreators、序列化
    }) : compose

const middlewares = [
  thunkMiddleware
]

if (process.env.NODE_ENV === 'development' && process.env.TARO_ENV !== 'quickapp') {
  middlewares.push(require('redux-logger').createLogger())
}

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
)
const store = createStore(rootReducer, enhancer)
// 扩展一个commit方法，
store.commit = (type, payload) => {
  store.dispatch({
    type: 'reducers',
    reducer: type,
    payload: payload
  })
}

export default store