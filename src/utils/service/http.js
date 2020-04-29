import Taro from '@tarojs/taro'
import profile from './baseUrl'
import interceptors from './interceptors'

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

class httpRequest {
  
  baseOptions(params, method = "POST") {
    // 没有传入，则默认
    let contentType = params.contentType || "application/json";
    const option = {
      url: profile[params.baseUrl] + params.url,
      data: params.data,
      method: method,
      header: {
        'content-type': contentType,
        'Authorization': Taro.getStorageSync('Authorization')
      }
    };
    return Taro.request(option);
  }

  get(url, data, baseUrl = 'domain') {
    let option = { url, baseUrl, data };
    return this.baseOptions(option);
  }
  // 接口地址， 参数, 接口前缀地址， 请求参数格式(默认表单提交)
  post(url, data, baseUrl = 'domain', contentType = 'application/x-www-form-urlencoded', ) {
    let params = { url, baseUrl, data, contentType };
    return this.baseOptions(params, "POST");
  }

  put(url, data = "", baseUrl = 'domain',) {
    let option = { url,baseUrl, data };
    return this.baseOptions(option, "PUT");
  }

  delete(url, data = "", baseUrl = 'domain',) {
    let option = { url,baseUrl, data  };
    return this.baseOptions(option, "DELETE");
  }

}

export default new httpRequest()