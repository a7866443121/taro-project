import { connect } from '@tarojs/redux'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './login.scss'

class Login extends Component {

  componentWillMount () { }

  componentDidMount () { 
    setTimeout(() => {
      this.$store.commit('setName', '张大仙')
      
    },3000)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '登录'
  }

  render () {
    console.log(this.props, 'props');
    return (
      <View className='login'>
        <Text>登录: </Text>
        <Text>{this.props.setName.name}</Text>
      </View>
    )
  }
}


export default connect(state => state)(Login)