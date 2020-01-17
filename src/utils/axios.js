/* !!!: 封装axios请求 返回重新封装的格式 对错误的统一处理 */
import axios from 'axios'
import errorHandle from './errorHandle'
import store from '../store'
import PublicConfig from '../config'
const CancelToken = axios.CancelToken
class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    this.pending = {}
  }
  /* !!!: 获取配置 */
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 100000
    }
    return config
  }
  removePending (key, isReauest = false) {
    if (this.pending[key] && isReauest) {
      this.pending[key]('取消重复请求')
    }
    delete this.pending[key]
  }
  /* !!!: 设定拦截器 */
  interceptors (instence) {
    // 发送请求拦截器
    instence.interceptors.request.use((config) => {
      // Do something before request is sent
      // console.log('config', config)
      // 公共路径不要携带token验证
      let isPublic = false
      PublicConfig.publicPath.map((path) => {
        isPublic = isPublic || path.test(config.url)
      })
      const token = store.state.token
      if (!isPublic && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      // 参数 c 代表形参（取消函数）执行c，取消这次请求
      let key = config.url + '&' + config.method
      this.removePending(key, true)
      config.cancelToken = new CancelToken((c) => {
        this.pending[key] = c
      })
      return config
    }, err => {
      // Do something with request error
      errorHandle(err)
      return Promise.reject(err)
    })

    /* !!!: 响应请求拦截器 */
    instence.interceptors.response.use((res) => {
      // Do something with response data
      // console.log('res', res)
      let key = res.config.url + '&' + res.config.method
      this.removePending(key)
      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
    }, (err) => {
      // Do something with response error
      errorHandle(err)
      return Promise.reject(err)
    })
  }
  /* !!!: 创建实例 */
  request (options) {
    const instence = axios.create()
    const newOpstions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instence)
    return instence(newOpstions)
  }
  get (url, config) {
    const options = Object.assign({
      method: 'get',
      url: url
    }, config)
    return this.request(options)
  }
  post (url, data) {
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }
}

// const instence = axios.create({
//   baseURL: process.env.NODE_ENV === 'development'
//     ? config.baseUrl.dev
//     : config.baseUrl.pro,
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8'
//   },
//   timeout: 10000
// })

export default HttpRequest
