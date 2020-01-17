<template>
  <div class="fly-panel">
    <h3 class="fly-panel-title">温馨通道</h3>
    <div class="fly-panel-main layui-row">
      <ul class="layui-clear quick">
        <li class="layui-col-xs6" v-for="(item, index) in lists" :key="'item' + index">
          <a target="_blank" :href="item.link">{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getTips } from '../../api/content'
export default {
  name: 'Tips',
  data () {
    return {
      lists: []
    }
  },
  mounted () {
    getTips().then((res) => {
      if (res.code === 200) {
        this.lists = res.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  $boder-color: #ddd;
  .fly-panel-main {
    padding: 15px;
  }
  .quick {
    border: 1px solid $boder-color;
    border-bottom: 0;
    border-right: 0;
    .layui-col-xs6 {
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      border: 1px solid $boder-color;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border-left: 0;
      border-top: 0;
      a {
        display: block;
      }
    }
  }
</style>
