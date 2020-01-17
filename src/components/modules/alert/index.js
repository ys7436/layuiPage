/* !!!: 定义全局组件 */
import AlertComponent from './Alert'
const Alert = {}
Alert.install = function (Vue) {
  /* !!!: 把alert组件绑定到全局 */
  const Alertconstructor = Vue.extend(AlertComponent)
  const insance = new Alertconstructor()
  insance.$mount(document.createElement('div'))
  document.body.appendChild(insance.$el)
  // 4. 添加实例方法
  Vue.prototype.$alert = function (msg) {
    // 逻辑...
    insance.msg = msg
    insance.isShow = true
    insance.type = 'alert'
  }

  Vue.prototype.$confirm = function (msg, success, cancel) {
    // 逻辑...
    insance.msg = msg
    insance.isShow = true
    insance.type = 'confirm'
    if (typeof success !== 'undefined') {
      insance.success = success
    }
    if (typeof cancel !== 'undefined') {
      insance.cancel = cancel
    }
  }
}

export default Alert
