export default function MapLoader () {
  return new Promise((resolve, reject) => {
    // 全局对象如果存在地图直接将结果抛出
    if (window.AMap) {
      resolve(window.AMap)
    } else {
      // 创建script标签并放入cdn链接
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = 'https://webapi.amap.com/maps?v=1.4.9&key=e24172927cec225f072741bc11cc6e86'
      script.onerror = reject
      document.head.appendChild(script)
    }
  })
}
