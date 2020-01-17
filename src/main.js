import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AMap from 'vue-amap'
/* vee-validate版本2：已废弃 */
/* Veelidate: 表单验证依赖 */
// import Veelidate, { Validator } from 'vee-validate'
/* !!!: 汉化提示方法1 */
// import zh from 'vee-validate/dist/locale/zh_CN'
// /* !!!: 汉化提示方法2 */
// import './local/index'

// Vue.use(Veelidate)
/* !!!: 汉化提示方法1 */
// Validator.localize('zh-CN', zh)

/* !!!: 汉化提示方法2 */
// const validator = new Validator()
// validator.localize('zh-CN')
import '@/utils/veevalidate-i18n'
/* !!!: 调用全局组件 */
import Alert from './components/modules/alert'
import Pop from './components/modules/pop'
Vue.config.productionTip = false
Vue.use(Alert)
Vue.use(Pop)
/* !!!: 初始化高德地图 */
Vue.use(AMap)
AMap.initAMapApiLoader({
  key: '58ef0a93b37985026fad62cfc8c2f66b',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar',
    'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation'],
  v: '1.4.4'
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
