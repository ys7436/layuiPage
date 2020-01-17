<template>
  <div id="app" @click="isDo">
    <headers></headers>
    <transition name="slideUp" mode="out-in">
      <router-view></router-view>
    </transition>
    <footers></footers>
    <div class="amap-page-container">
      <el-amap
        vid="amap"
        :zoom="zoom"
        :center="center"
        class="amap-demo">
        <el-amap-polygon
          v-for="(polygon, index) in polygons"
          :key="'polygon' + index"
          :vid="polygon.id"
          :ref="`polygon_${polygon.id}`"
          :path="polygon.path"
          :draggable="polygon.draggable"
          :extData="polygon.id"
          :editable="polygon.paths"
          :events="polygon.events">
        </el-amap-polygon>
      </el-amap>
    </div>
  </div>
</template>
<script>
import Headers from './components/Header'
import Footers from './components/Footer'
import { mapActions } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      zoom: 15,
      polygonIndex: '',
      center: [121.5273285, 31.21515044],
      polygons: [],
      lastTime: null, /* !!!: 最后一次点击的时间 */
      currentTime: null, /* !!!: 当前点击的时间 */
      timeOut: 2 * 60 * 60 * 1000 /* !!!: 超时时间2小时 */
    }
  },
  components: {
    Headers,
    Footers
  },
  mounted () {
    const path = [
      {
        draggable: true,
        paths: true,
        path: [[121.5273285, 31.21515044], [121.5293285, 31.21515044], [121.5293285, 31.21915044], [121.5273285, 31.21515044]],
        id: 0
      },
      {
        draggable: true,
        paths: false,
        path: [[121.533766, 31.212728], [121.536783, 31.216655], [121.542375, 31.214783], [121.535744, 31.220288], [121.539156, 31.226527], [121.534279, 31.220187], [121.52305, 31.217958], [121.533723, 31.216949]],
        id: 1
      }
    ]
    this.polygons = path.map(item => {
      item.events = {
        click: (e) => {
          this.polygonPath(e)
        },
        end: (e) => {
          this.polygonEnd(e)
        }
      }
      return item
    })
  },
  methods: {
    ...mapActions(['localClear']),
    isDo () {
      this.currentTime = new Date().getTime()
      if (this.currentTime - this.lastTime > this.timeOut) {
        this.localClear(this)
      } else {
        this.lastTime = new Date().getTime()
      }
    },
    polygonPath (e) {
      this.polygonIndex = e.target.getExtData()
      this.polygons[this.polygonIndex].paths = !this.polygons[this.polygonIndex].paths
      this.polygons[this.polygonIndex].draggable = !this.polygons[this.polygonIndex].draggable
    },
    polygonEnd (e) {
      if (this.polygonIndex === 0 || this.polygonIndex) {
        if (!this.polygons[this.polygonIndex].paths) {
          const key = this.$refs
          console.log(Object.keys(key))
          // console.log(this.$refs.polygon_0[index].$$getPath())
        }
      }
    }
  },
  created () {
    this.lastTime = new Date().getTime()
  }
}
</script>
<style lang="scss">
  .amap-page-container {
    height: 600px;
  }
  @import './assets/css/global.css';
  .error {
    color: #f00
  }
  .gray {
    color: #999;
  }
  .svg {
    height: 38px;
    position: relative;
    padding: 0 !important;
    cursor: pointer;
  }
  .text-center{
    text-align: center;
  }
  .text-left {
    text-align: left;
  }
  @for $i from 0 through 5 {
    .pd#{$i} {
      padding: $i * 10 + px !important;
    }
    .pr#{$i} {
      padding-right: $i * 10 + px !important;
    }
    .pl#{$i} {
      padding-left: $i * 10 + px !important;
    }
    .mr#{$i} {
      margin-right: $i * 10 + px !important;
    }
  }
  .text-right {
    text-align: right;
  }
  .orange {
    color: #ff5722;
  }
  .pull-right {
    float: right !important;
  }
  .slideUp-enter-active {
    transition: all 0.2s linear 0.1s;
  }
  .slideUp-enter {
    transform: translate(-50px, 0);
    opacity: 0;
  }
  .slideUp-leave-active {
    transition: all 0.2s linear;
    opacity: 0;
    transform: translate(50px, 0);
    z-index: 100;
  }
</style>
