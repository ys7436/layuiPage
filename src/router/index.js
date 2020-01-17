import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import jwt from 'jsonwebtoken'
import moment from 'moment'
/* !!!: 懒加载 */
const Login = () => import(/* webpackChunkName: 'login' */ './../views/login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ './../views/reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ './../views/forget.vue')
const Home = () => import(/* webpackChunkName: 'home' */ './../views/Home.vue')
const Index = () => import(/* webpackChunkName: 'index' */ './../views/channels/index.vue')
const Template1 = () => import(/* webpackChunkName: 'Template1' */ './../views/channels/Template1.vue')
const Center = () => import(/* webpackChunkName: 'center' */ './../views/Center.vue')
const Users = () => import(/* webpackChunkName: 'Users' */ './../views/Users.vue')
const Msg = () => import(/* webpackChunkName: 'Msg' */ './../components/user/Msg.vue')
const Others = () => import(/* webpackChunkName: 'Others' */ './../components/user/Others.vue')
const Posts = () => import(/* webpackChunkName: 'Posts' */ './../components/user/Posts.vue')
const Settings = () => import(/* webpackChunkName: 'Settings' */ './../components/user/Settings.vue')
const UserCenter = () => import(/* webpackChunkName: 'UserCenter' */ './../components/user/Center.vue')
const MyInfo = () => import(/* webpackChunkName: 'MyInfo' */ './../components/user/common/MyInfo.vue')
const Accounts = () => import(/* webpackChunkName: 'MyInfo' */ './../components/user/common/Accounts.vue')
const Password = () => import(/* webpackChunkName: 'Password' */ './../components/user/common/Password.vue')
const PicUpLoad = () => import(/* webpackChunkName: 'PicUpLoad' */ './../components/user/common/PicUpLoad.vue')
const MyCollection = () => import(/* webpackChunkName: 'MyCollection' */ './../components/user/common/MyCollection.vue')
const MyPost = () => import(/* webpackChunkName: 'MyPost' */ './../components/user/common/MyPost.vue')
const NotFound = () => import(/* webpackChunkName: '404' */ './../views/404.vue')
const Confirm = () => import(/* webpackChunkName: 'confirm' */ './../views/Confirm.vue')
const Reset = () => import(/* webpackChunkName: 'reset' */ './../views/Reset.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        name: 'index',
        // alias: '/a', // 起一个别名输入/a依然跳转到这个路由
        component: Index
      },
      {
        path: '/index/:catalog',
        name: 'catalog',
        component: Template1
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg,
    beforeEnter: (to, from, next) => {
      if (from.name === 'login') {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget,
    beforeEnter: (to, from, next) => {
      if (from.name === 'login') {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/center',
    component: Center,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'center',
        component: UserCenter
      },
      {
        path: 'set',
        component: Settings,
        children: [
          {
            path: '',
            name: 'info',
            component: MyInfo
          },
          {
            path: 'pic',
            name: 'pic',
            component: PicUpLoad
          },
          {
            path: 'password',
            name: 'password',
            component: Password
          },
          {
            path: 'accounts',
            name: 'accounts',
            component: Accounts
          }
        ]
      },
      {
        path: 'posts',
        component: Posts,
        children: [
          {
            path: '',
            name: 'mypost',
            component: MyPost
          },
          {
            path: 'mycollection',
            name: 'mycollection',
            component: MyCollection
          }
        ]
      },
      {
        path: 'others',
        name: 'others',
        component: Others
      },
      {
        path: 'msg',
        name: 'msg',
        component: Msg
      }
    ]
  },
  {
    path: '/user',
    name: 'home',
    component: Users
  },
  {
    path: '/404',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: Confirm
  },
  {
    path: '/reset',
    name: 'reset',
    component: Reset
  }
]

const router = new VueRouter({
  // mode: 'history', // 一共有两种模式 hash history 尽量使用hash
  linkExactActiveClass: 'layui-this',
  routes
})
router.beforeEach((to, from, next) => {
  // login页不需要鉴权路由跳转 有两种办法
  // if (to.name === 'login') {
  //   next()
  //   return
  // }
  /* !!!: 先查本地存储 */
  /* !!!: 未登录，跳转到login */
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token && userInfo) {
    // 判断时效性
    const payload = jwt.decode(token)
    // 如果当前时间是在过期时间之前的 说明token没有过期
    if (moment().isBefore(moment(payload.exp * 1000))) {
      store.commit('setUserInfo', userInfo)
      store.commit('setToken', token)
      store.commit('setIsLogin', true)
    } else {
      localStorage.removeItem('userInfo')
      localStorage.removeItem('token')
      store.commit('setUserInfo', '')
      store.commit('setToken', '')
      store.commit('setIsLogin', false)
    }
  }
  if (to.matched.some(recode => recode.meta.requiresAuth)) {
    const isLogin = store.state.isLogin
    if (isLogin) {
      /* !!!: 已经登录 */
      next()
    } else {
      next('/login')
    }
  } else {
    // 公共页面、不需要用户登录 直接到这个页面
    next()
  }
})

export default router
