import request from '@/utils/request.js'

export default {
  getInvateRules (data) {
    return request({
      url: 'getInvateRules',
      method: 'post',
      data
    })
  },
  getStudyPlan: function (data) {
    return request({
      url: '/index/user/study_list',
      data,
      method: 'post'
    })
  },
  // 上传图片
  upLoadImage (data) {
    return request({
      url: '/index/user/upload_image',
      method: 'post',
      data
    })
  },
  // 修改用户信息
  editUserInfo (data) {
    return request({
      url: '/index/user/edit_info',
      method: 'post',
      data
    })
  },
  /**
   * 发送短信验证码
   * @param {*} data
   */
  smsCode: function (data) {
    return request({
      url: '/index/index/sms_code',
      method: 'post',
      data
    })
  },
  /**
   * 绑定账号
   * @param {*} data
   */
  bind: function (data) {
    return request({
      url: '/index/index/weixin_bind',
      method: 'post',
      data
    })
  },
  /**
   * 获取个人中心页用户信息
   */
  getUserInfo: function (data) {
    return request({
      url: '/index/user/get_user_info',
      method: 'post',
      data
    }).then(res => {
      window.$appStore.user = Object.assign({}, res.data)
      return res
    })
  },
  /**
   * 任务列表
   */
  getTaskList (data) {
    return request({
      url: '/index/user/task_list',
      method: 'post',
      data
    })
  },
  /**
   * 小黄鱼明细(积分变更记录)
   */
  getIntegralList (data) {
    return request({
      url: '/index/user/integral_list',
      method: 'post',
      data
    })
  },
  // 我的成就
  myAchieve (data) {
    return request({
      url: '/index/user/my_level',
      method: 'post',
      data
    })
  },
  // 分享
  share (data) {
    return request({
      url: '/index/course/compose.html',
      method: 'post',
      data
    })
  },
  // 发送修改手机号验证码
  telSms (data) {
    return request({
      url: '/index/user/sms_code',
      method: 'post',
      data
    })
  },
  // 更换手机号
  telEdit (data) {
    return request({
      url: '/index/user/edit_mobile',
      method: 'post',
      data
    })
  },
  // 上课提醒
  remind(data){
    console.log(data)
    return request({
      url: '/index/user/study_remind',
      method: 'post',
      data
    }, true)
  },
  // singlePoetry (data) {
  //   return request({
  //     url: '/singlePoetry',
  //     method: 'post',
  //     data
  //   })
  // }
}
