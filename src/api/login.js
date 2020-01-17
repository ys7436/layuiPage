import axios from '@/utils/request'
/* !!!: 获取验证码 */
const getCode = async (sid) => {
  // axios.request({
  //   method: 'delete',
  //   url: '/getCaptcha'
  // })
  return axios.get('/public/getCaptcha', {
    params: {
      sid: sid
    }
  })
}
/* !!!: 忘记密码发送邮箱 */
const forget = async (options) => {
  return axios.post('/login/forget', {
    ...options
  })
}
/* !!!: 登录 */
const login = async (option) => {
  return axios.post('/login/login', {
    ...option
  })
}
/* !!!: 注册 */
const reg = async (options) => {
  return axios.post('/login/reg', {
    ...options
  })
}

export {
  getCode,
  forget,
  login,
  reg
}
