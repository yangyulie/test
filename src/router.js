import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/rule'
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/user',
      redirect: '/user/index'
    },
    {
      path: '/user/routerL',
      name: 'router',
      component: () => import('./views/user/routerL.vue'),
      meta: { title: '活动规则' }
    },
    {
      // 活动规则页
      path: '/rule',
      name: 'rule',
      component: () => import('./views/index/rule.vue'),
      meta: { title: '活动规则' }
    },
    {
      // 用户学习计划页
      path: '/user/studyPlan',
      name: 'studyPlan',
      meta: { title: '学习计划' },
      component: () => import('./views/user/studyPlan.vue')
    },
    {
      // 用户邀请记录页
      path: '/user/invatRecord',
      name: 'invatRecord',
      meta: { title: '我的鱼塘' },
      component: () => import('./views/user/invatRecord.vue')
    },
    {
      // 用户成就页
      path: '/user/achievements',
      name: 'achievements',
      meta: { title: '我的成就' },
      component: () => import('./views/user/achievements.vue')
    },
    {
      // 用户信息页面
      path: '/user/info',
      name: 'userInfo',
      meta: { title: '我的信息' },
      component: () => import('./views/user/userInfo.vue')
    },
    {
      // 个人中心首页
      path: '/user/index',
      name: 'userIndex',
      meta: { title: '个人中心' },
      component: () => import('./views/user/index.vue')
    },
    {
      // 手机号页面
      path: '/user/tel',
      name: 'tel',
      meta: { title: '手机号码' },
      component: () => import('./views/user/tel.vue')
    },
    {
      // 手机号修改
      path: '/user/telEdit',
      name: 'telEdit',
      meta: { title: '手机号码' },
      component: () => import('./views/user/telEdit.vue')
    },
    {
      // 设置页
      path: '/user/set',
      name: 'userSet',
      meta: { title: '设置' },
      component: () => import('./views/user/set.vue')
    },
    {
      // 提现说明页面
      path: '/user/cashDes',
      name: 'cashDes',
      meta: { title: '提现说明' },
      component: () => import('./views/user/cashWithDes.vue')
    },
    {
      // 邀请规则页面
      path: '/user/invatRules',
      name: 'invatRules',
      meta: { title: '邀请规则' },
      component: () => import('./views/user/invatRules.vue')
    },
    {
      // 免责声明页面
      path: '/user/disclaimer',
      name: 'disclaimer',
      meta: { title: '免责声明' },
      component: () => import('./views/user/disclaimer.vue')
    },
    {
      // 使用帮助页面
      path: '/user/userHelp',
      name: 'userHelp',
      meta: { title: '使用帮助' },
      component: () => import('./views/user/userHelp.vue')
    },
    {
      path: '/class',
      name: 'class',
      meta: { title: '课程' },
      component: () => import('./views/class/index.vue')
    },
    {
      path: '/class/outline',
      name: 'outline',
      meta: { title: '课程介绍' },
      component: () => import('./views/class/outline.vue')
    },
    {
      path: '/class/detail',
      name: 'detail',
      meta: { title: '课程介绍' },
      component: () => import('./views/class/detail.vue')
    },
    {
      path: '/class/answer',
      name: 'exercises',
      meta: { title: '回答练习题' },
      component: () => import('./views/class/answer.vue')
    },
    {
      path: '/class/comment',
      name: 'comment',
      meta: { title: '回复' },
      component: () => import('./views/class/comment.vue')
    },
    {
      path: '/wxAuth',
      name: 'wxAuth',
      meta: { title: '授权' },
      component: () => import('./views/index/wxAuth.vue')
    },
    {
      path: '/wxAuthBack',
      name: 'wxAuthBack',
      meta: { title: '授权成功' },
      component: () => import('./views/index/wxAuthBack.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: { title: '绑定' },
      component: () => import('./components/register.vue')
    },
    {
      path: '/com/tip',
      name: 'tip',
      meta: { title: '提示' },
      component: () => import('./components/tip.vue')
    },
    {
      path: '/index/showSharePage',
      name: 'showSharePage',
      meta: { title: '分享' },
      component: () => import('./views/index/showSharePage.vue')
    }
  ]
})
