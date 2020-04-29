import { connect } from '@tarojs/redux'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtButton } from '../../components/taro'

class Index extends Component {
  constructor () {
    // 从父级继承所有
    super(...arguments)
    // 自身的状态
    this.state = {
      num: 1
    }
  }
  componentDidShow () { 
    setTimeout(() => {
      this.$store.commit('person', {name: '张大仙',age: '23'})
    },3000)
  }
  
  componentDidHide () { }
  add(){
    this.setState({
      num: this.state.num + 1 
    })
  }

  config = {
    navigationBarTitleText: '首页'
  }

  render () {
    const { person } = this.props
    console.log(this.props, 'this.props')
    return (
      <View className='index'>
        <AtButton type='primary' onClick={this.$plugins.to.bind(this, '../lyj/lyj')}>刘谊君</AtButton>
        <AtButton type='primary' onClick={this.$plugins.to.bind(this, '../lyb/lyb')}>陆益标</AtButton>
        <Text>你叫啥名字：</Text>
        <Text>{person.name}</Text>
        <Text>{person.age}</Text>
        <AtButton type='primary' onClick={this.add.bind(this)}>默认按钮</AtButton>
        <Text>{this.state.num}</Text>
      </View>
    )
  }
}

// 每个页面的固定写法，
export default connect(state => state.reducers)(Index)