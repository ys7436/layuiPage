<template>
  <div class="fly-panel" v-show="lists.length > 0">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a href="#signin" class="layui-hide-sm layui-show-xs-block fly-right" style="color: #FF5722;">去签到</a>
    </div>
    <list-item :lists="lists" :isShow="false"></list-item>
  </div>
</template>

<script>
import ListItem from './ListItem'
export default {
  name: 'Top',
  data () {
    return {
      page: 0,
      limit: 20,
      lists: [{
        uid: {
          name: '老子来也',
          isVip: 2
        },
        title: '这个是标题',
        content: '',
        created: '2019-12-11 10:05:05',
        catalog: 'ask',
        fav: 40,
        isEnd: 0,
        reads: 10,
        answer: 0,
        status: 0,
        isTop: 1,
        tags: [
          {
            name: '精华',
            class: 'layui-bg-red'
          }
        ]
      }] /* !!!: 请求数据 */
    }
  },
  components: {
    ListItem
  }
}
</script>

<style scoped>
</style>
