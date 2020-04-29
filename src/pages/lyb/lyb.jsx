import { connect } from '@tarojs/redux'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './lyb.scss'

class Lyb extends Component {

  componentWillMount () { }

  componentDidMount () { 
    setTimeout(() => {
      this.$store.commit('lyb', {name: '陆益标',age: '18'})
    },3000)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '陆益标'
  }

  render () {
    const {lyb} = this.props
    console.log(this.props, 'this.props')
    return (
      <View className='login'>
        <Text>姓名: {lyb.name}；</Text>
        <Text>年龄: {lyb.age}</Text>
      </View>
    )
  }
}


export default connect(state => state.reducers)(Lyb)