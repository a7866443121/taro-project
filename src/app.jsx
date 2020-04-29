import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'
import store from './store/index'
import plugins from './utils/index'
import api from './api/index'

import './app.scss'



// 把redux挂载到全局
Component.prototype.$store = Taro.$store = store;
// 把工具函数挂载到全局
Component.prototype.$plugins = Taro.$plugins = plugins;
// 把api挂载到全局
Component.prototype.$api = Taro.$api = api;


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
  require('nerv-devtools')
}

class App extends Component {
  constructor () {
    // 从父级继承所有
    super(...arguments)
    // 自身的状态
    this.state = {}
  }
  // 组件挂载前
  componentWillMount(){

  }
  // 组件已经挂载
  componentDidMount () {
    
    
  }
  // 组件更新完毕后，只会在第一次初始化成功会进入componentDidmount,之后每次重新渲染后都会进入这个生命周期，
  // 这里可以拿到prevProps和prevState，即更新前的props和state。
  componentDidUpdate(){

  }
  // 组件卸载前
  componentWillUnmount () {
    
  }
  // 页面显示
  componentDidShow () {
    // 请求接口
    this.$api.adminLogin({
      loginAccount: 'liucheng',
      loginPassword: 111
    }).then(res => {
      console.log(res)
    })
  }
  // 页面隐藏
  componentDidHide () {}
  // 页面报错
  componentDidCatchError () {}

  config = {
    pages: [
      'pages/index/index',
      'pages/login/login',
      'pages/lyj/lyj',
      'pages/lyb/lyb'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
