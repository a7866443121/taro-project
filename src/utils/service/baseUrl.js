const CURRENT = 'dev'
const PROFILES = {
  'dev': {
    'domain': 'https://tapichhadmin.chehaha.net/api',
    'imgUrl':'http://192.168.8.218:8009',
    'wechat': 'http://dk.chehaha.net' // 把 <ip dev> 写进本地 hosts 文件, ip 表示对应后端开发的地址
  },
  'test': {
    'domain': 'https://tapiadjustedassessor.chehaha.net/api',
    'imgUrl': 'https://tupload.chehaha.net',
    'wechat': 'https://twechat.chehaha.net' 
  },
  'prod': {
    'domain': 'https://apiadjustedassessor.chehaha.net/api',
    'imgUrl': 'https://upload.chehaha.net',
    'wechat': 'https://wechat.chehaha.net' 
  }
}

export default PROFILES[CURRENT]