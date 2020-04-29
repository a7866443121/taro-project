

export default function(Taro){

  return {
    adminLogin (params) {
      return Taro.$plugins.http.post('/authority/adminLogin', params)
    }
  }
}