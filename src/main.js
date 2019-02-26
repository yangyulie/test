import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MINT from 'mint-ui'

Vue.use(MINT)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // if (window.navigator.userAgent.indexOf('caimi') > -1) {
  //   next()
  // } else {
  //   alert('请在app端打开')
  //   console.error('你知道的太多了,在网页端打开是不可能的')
  // }
  next()
})

router.afterEach((to, from) => {
  window.document.title = to.meta.title
})

Vue.use(function (Vue, options) {
  Vue.mixin({
    beforeCreate (options) {
      let store =
        this.$options.$appStore ||
        (this.$options.parent && this.$options.parent.$appStore)
      if (!store) {
        store = {
          // 是否需要绑定手机
          get needBind () {
            return !!sessionStorage.getItem('needBind')
          },
          set needBind (value) {
            if (!value) {
              sessionStorage.removeItem('needBind')
            }
          },
          // 是否有邀请人
          get inviterId() {
          	return sessionStorage.getItem('inviterId')
          },
          myUser () {
            const user = Object.assign(
              {},
              store.user || window.$appStore.user || {
                avatar:
                  location.protocol + '//' + location.host + '/' + location.pathname + 'static/imgs/default_head.png'
              }
            )
            user.nickname = '我'
            return user
          }
        }
      }
      this.$appStore = this.$options.$appStore = store
    }
  })
})
Vue.prototype.setData = function (data) {
  Object.getOwnPropertyNames(data).forEach(k => {
    console.log('setData', k)
    this[k] = data[k]
  })
}
// App 跳转页面
Vue.prototype.jumpToPage = function (route, cb) {
  if (route.type === 'html') {
    if (!/^https?:/i.test(route.url)) {
      route.url = location.protocol + '//' + location.host + '/' + location.pathname + location.search + '#' + route.url
    }
  }
  window.jBridgeProxy.callHandler('jumpToPage', route, cb)
}
// App 分享
Vue.prototype.openSharePage = function (type, cb) {
  window.jBridgeProxy.callHandler('jumpToPage', {
    url: '/caimi/mine/share',
    type: 'native',
    param: {
      type: type,
    }
  }, cb)
}
Vue.prototype.isLogin = function (cb) {
  window.jBridgeProxy.callHandler('isLogin', {}, (b) => {
    if (b) {
      cb && cb(b)
    } else {
      window.jBridgeProxy.callHandler('login', {}, () => {
        })
    }
  })
}
Vue.prototype.getPayList = function (cb) {
	window.jBridgeProxy.callHandler('getPayList', {}, cb)
}
Vue.prototype.appPay = function (data, cb) {
	window.jBridgeProxy.callHandler('pay', data, cb)
}

function url_params_decode (str) {
  if (str) {
    let arr = (/^[?#]/.test(str) ? str.substr(1) : str).split('&')
    if (arr.length) {
      let obj = {}
      for (let i = arr.length; i;) {
        let a = arr[--i].split('=')
        let v = decodeURIComponent(a[1])
        if (/^[+-]?\d*\.?\d+(e|e\+\d+)?$/g.test(v)) {
          v = parseFloat(v)
        }
        obj[a[0]] = v
      }
      return obj
    }
  }
  return null
}

window.$appStore = {}
const agent = navigator.userAgent.toLowerCase()
window.isApp = agent.indexOf('caimi') !== -1
window.isWeixin = agent.indexOf('micromessenger') !== -1
if (window.isWeixin) {
  (function() {
    // TODO: 微信分享
    let n = document.createElement('script')
    n.src = 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js'
    n.onload = () => {
      wx.ready(function () { // 需在用户可能点击分享按钮前就先调用
        const shareData = {
          title: '', // 分享标题
          desc: '', // 分享描述
          link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          success: function () {
            // 设置成功
          }
        }
        wx.updateAppMessageShareData(shareData)
        wx.updateTimelineShareData(shareData)
      })
    }
    document.getElementsByTagName('head')[0].appendChild(n)
  })()
}

const query = url_params_decode(location.search) || {}
if (query.inviter_id) {
	sessionStorage.setItem('inviterId', query.inviter_id)
}
if (query.popup_page) {
  sessionStorage.setItem('needBind', 1)
  location.href = location.href.replace(/[?&]popup_page=\w+/, '')
} else {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
