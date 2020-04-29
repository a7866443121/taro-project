import Taro from "@tarojs/taro";

/**
 * @description 获取当前页url
 */
export const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages()
  let currentPage = pages[pages.length - 1]
  let url = currentPage.route
  return url
}

/**
 * @description 跳转到登陆界面
 */
export const pageToLogin = () => {
  let path = getCurrentPageUrl()
  if (!path.includes('login')) {
    Taro.navigateTo({
      url: "/pages/login/login"
    });
  }
}

/**
 * @description 跳转到登陆界面
 * @description 显示一个吐司
 * @param {String} 显示文案
 * @param {String} 显示图标
 * @param {Number} 存在的时间
 */
export const toast = (msg = ' ', icon ='none', duration = 2000) =>{
  Taro.showToast({
    title: msg,
    icon: icon,
    duration: duration
  }).then(m => console.log(m))
}

/**
 * @description 跳转到指定界面
 * @param {String} 界面地址
 * @param {Boolean} 是否打开新页面
 */
export const to = (url, isReplace = false) => {
  if (isReplace) {
    Taro.redirectTo({
      url: url
    })
  } else {
    Taro.navigateTo({
      url: url
    });
  }
}