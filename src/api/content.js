import axios from '@/utils/request'
/* !!!: qs 安装 cnpm install -s qs 主要用来读取接口参数 */
import qs from 'qs'

/* !!!: 获取文章列表 */
const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
}

/* !!!: 获取温馨提醒 */
const getTips = () => {
  return axios.get('/public/tips')
}

/* !!!: 获取本周热议 */
const getTop = () => {
  return axios.get('/public/topWeek')
}

/* !!!: 获取友情链接 */
const getLinks = () => {
  return axios.get('/public/links')
}

export {
  getList,
  getTips,
  getTop,
  getLinks
}
