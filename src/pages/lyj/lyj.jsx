import { connect } from '@tarojs/redux'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './lyj.scss'

class Lyj extends Component {

  componentWillMount () { }

  componentDidMount () { 
    setTimeout(() => {
      this.$store.commit('lyj', {name: '刘谊君',age: '19'})
    },3000)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '刘谊君'
  }

  render () {
    console.log(this.props)
    const {lyj} = this.props

    return (
      <View className='login'>
        <Text>姓名: {lyj.name}；</Text>
        <Text>年龄: {lyj.age}</Text>
      </View>
    )
  }
}


export default connect(state => state.reducers)(Lyj)