import request from '@/utils/request.js'

export default {
  getCourseList (data, url) {
    return request({
      url: url,
      method: 'post',
      data
    })
  },
  getCategory (params) {
    return request({
      url: '/index/course/course_category.html',
      method: 'post',
      data: params
    })
  },
  getCourse (params) {
    return request({
      url: '/index/course/course_list.html',
      method: 'post',
      data: params
    })
  },
  getDetail (params) {
    return request({
      url: '/index/course/subsection_detail.html',
      method: 'post',
      data: params
    })
  },
  getOtherAnswer (params) {
    return request({
      url: '/index/course/subsection_answer.html',
      method: 'post',
      data: params
    })
  },
  getQuestion (params) {
    return request({
      url: '/index/course/subsection_question.html',
      method: 'post',
      data: params
    })
  },
  // 答题
  answer (params) {
    return request({
      url: '/index/course/answer.html',
      method: 'post',
      data: params
    })
  },
  // 答题评论
  comment (params) {
    return request({
      url: '/index/course/comment.html',
      method: 'post',
      data: params
    })
  },
  praise (params) {
    return request({
      url: '/index/course/praise.html',
      method: 'post',
      data: params
    })
  }
}
// 这里我引入了requerst。js 然后 就按照这种格式 xxx(){ 然后return 把这个请求结果返回 然后你也可以在里面传入 url}
// 然后在你的页面里引入这个class。js文件
