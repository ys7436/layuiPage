import { extend, configure } from 'vee-validate'
import { required, email, min, length, confirmed } from 'vee-validate/dist/rules'
import { i18n } from './i18n'

configure({
  defaultMessage: (field, values) => {
    values._field_ = i18n.t(`fields.${field}`)
    return i18n.t(`validation.${values._rule_}`, values)
  }
})

extend('required', required)
extend('email', email)
extend('min', min)
extend('length', length)
extend('confirmed', confirmed)
// extend('passwords', {
//   validate (value) {
//     return /^.*(?=.{6,})(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*? ]).*$/.test(value)
//   },
//   message: '最少6位，包括至少1字母、特殊字符、数字'
// })
