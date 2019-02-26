import axios from 'axios'

let baseURL = location.protocol + '//' + location.host
if (baseURL.indexOf('.') === -1) {
  baseURL = 'www.caimijiaoyu.com'
}
// 创建axios 实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: baseURL, // api的base_url
  timeout: 10000 // 请求超时时间
})

// request 拦截器
service.interceptors.request.use(
  config => {
    // 这里可以自定义一些config 配置
    if (!config.data) {
        config.data = {}
    }
    if (window.isWeixin) {
      config.data.source = 'weixin'
  }
    config.$vm = config.data.$vm
    delete config.data.$vm
    return config
  },
  error => {
    //  这里处理一些请求出错的情况

    console.log(error)
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 这里处理一些response 正常放回时的逻辑
    console.log(res, '请求的结果')
    switch (res.code) {
      case 400:
        if (window.isWeixin) {
          // 去获取微信授权
          window.location.href = baseURL + '/index/index/weixin_login?redirect_url=' + encodeURIComponent(window.location.href)
        }
        if (window.isApp) {
          // 唤起App登录
          window.jBridgeProxy.callHandler('login', {}, () => {
          })
        }
        break
      case 300:
        if (window.isWeixin) {
          // 去获取微信授权
          window.location.href = baseURL + '/index/index/weixin_auth?redirect_url=' + encodeURIComponent(window.location.href)
        }
        break
    }
    return res
  },
  error => {
    // 这里处理一些response 出错时的逻辑

    return Promise.reject(error)
  }
)

export default service
