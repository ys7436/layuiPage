import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from 'vee-validate/dist/locale/zh_CN'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh_CN',
  messages: {
    'zh_CN': {
      fields: {
        email12: '邮箱',
        password: '密码',
        name: '昵称',
        username: '账号',
        code: '验证码'
      },
      validation: {
        ...zh.messages,
        required: '请输入{_field_}',
        email: '请输入正确的{_field_}!!!',
        confirmed: '两次密码不一致'
      }
    }
  }
})

export { i18n }
