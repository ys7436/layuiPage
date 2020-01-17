import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {}
  },
  mutations: {
    /* !!!: 所有的同步方法集合 */
    setSid (state, value) {
      state.sid = value
    },
    setUserInfo (state, value) {
      state.userInfo = value
      if (value === '') return
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    setToken (state, value) {
      state.token = value
      if (value === '') return
      localStorage.setItem('token', value)
    },
    setIsLogin (state, value) {
      state.isLogin = value
    }
  },
  getters: {
    /* !!!: 扩展state属性，不能对state做修改 类似computed */
  },
  actions: { /* !!!: 数据业务逻辑,主要用来获取数据 需要dispatch('')调用此对象方法 */
    /* !!!: 所有的异步方法集合 */
    ajaxJson: (context, t) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(t)
        }, 1000)
      })
    },
    localClear: async ({ commit, dispatch }, that) => {
      localStorage.removeItem('userInfo')
      localStorage.removeItem('token')
      commit('setUserInfo', '')
      commit('setToken', '')
      commit('setIsLogin', false)
      // 过滤重复导航
      // that.$router.push({ name: 'index' }, () => {}, () => {})
      if (that.$route.name !== 'index' && that.$route.name !== 'login') {
        that.$router.push({ name: 'index' })
      } else if (that.$route.name !== 'login') {
        that.$router.push({ name: 'login' })
      }
    }
  },
  modules: { /* !!!: 平铺状态量 */
  }
})
