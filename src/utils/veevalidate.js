import { extend, localize } from 'vee-validate'
import { required, email, min, length, confirmed } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN'
extend('required', required)
extend('email', email)
extend('min', min)
extend('length', length)
extend('confirmed', confirmed)

localize('zh_CN', {
  messages: {
    ...zh,
    required: '请输入{_field_}'
  },
  names: {
    email12: '邮箱',
    password: '密码',
    name: '昵称',
    username: '账号',
    code: '验证码'
  },
  fields: {
    email12: {
      email: '请输入正确的{_field_}',
      required: '请输入{_field_}!!!'
    }
  }
})
