<template>
  <div>
    <div class="fly-panel" style="margin-bottom: 0;">
      <div class="fly-panel-title fly-filter">
        <a @click.prevent="search()" :class="{'layui-this': status === '' && tag === ''}">综合</a>
        <span class="fly-mid"></span>
        <a @click.prevent="search(0)" :class="{'layui-this': status === '0' && tag === ''}">未结</a>
        <span class="fly-mid"></span>
        <a @click.prevent="search(1)" :class="{'layui-this': status === '1' && tag === ''}">已结</a>
        <span class="fly-mid"></span>
        <a @click.prevent="search(2)" :class="{'layui-this': status === '' && tag === '精华'}">精华</a>
        <span class="fly-filter-right layui-hide-xs">
            <a @click.prevent="search(3)" :class="{'layui-this': sort === 'created'}">按最新</a>
            <span class="fly-mid"></span>
            <a @click.prevent="search(4)" :class="{'layui-this': sort === 'answer'}">按热议</a>
          </span>
      </div>
      <list-item :lists="lists" :isEnd="isEnd" @nextPage="nextPage"></list-item>
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem'
import { getList } from '../../api/content'
export default {
  name: 'List',
  data () {
    return {
      isUpdata: false,
      current: '',
      isRepeat: false, /* !!!: 防止用户多次点击 */
      isEnd: false, /* !!!: 数据库已经无数据，显示没有更多了提示 */
      status: '', /* !!!: 1-已结 0-未结 */
      tag: '', /* !!!: 精华？ */
      sort: 'created', /* !!!: created-按最新 answer-按热议 */
      page: 0, /* !!!: 页码 */
      limit: 20, /* !!!: 每页条数 */
      catalog: '', /* !!!: 分类 */
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
        isTop: 0,
        tags: [
          {
            name: '精华',
            class: 'layui-bg-red'
          },
          {
            name: '热门',
            class: 'layui-bg-orange'
          },
          {
            name: '嘻哈',
            class: 'layui-bg-blue'
          }
        ]
      }] /* !!!: 请求数据 */
    }
  },
  components: {
    ListItem
  },
  mounted () {
    this.init(false)
    this._getList()
  },
  methods: {
    _getList () {
      // if (this.isEnd) return
      let options = {
        catalog: this.catalog,
        isTop: 0,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.status
      }
      this.isRepeat = true
      getList(options).then((res) => {
        this.isRepeat = false
        if (res.code === 200) {
          /* !!!: 判断lists长度为===0 可以直接赋值 */
          /* !!!: 判断lists长度为!==0 后面请求到的数据直接push到lists */
          /* !!!: 判断当前返回的数据是否小于20条，<20 说明数据库已经无数据了，不让用户再次点击加载更多 */
          if (res.data.length < this.limit) {
            this.isEnd = true
          }
          if (this.lists.length === 0) {
            this.lists = res.data
          } else {
            this.lists = this.lists.concat(res.data)
          }
        } else {
        }
      }).catch((err) => {
        this.isRepeat = false
        if (err) {
          this.$alert(err.message)
        }
      })
    },
    nextPage () {
      this.page++
      this._getList()
    },
    search (value) {
      if (value === undefined && this.current === '') return
      switch (value) {
        /* 未结贴 */
        case 0:
          this.status = '0'
          this.tag = ''
          break
        /* 已结贴 */
        case 1:
          this.status = '1'
          this.tag = ''
          break
        /* 精华帖 */
        case 2:
          this.status = ''
          this.tag = '精华'
          break
        /* 按最新（时间） */
        case 3:
          this.sort = 'created'
          break
        /* 按热议（评论数） */
        case 4:
          this.sort = 'answer'
          break
        /* 综合查询 */
        default:
          this.status = ''
          this.tag = ''
      }
      if (this.current !== value) {
        this.page = 0
        this.lists = []
        this.isEnd = false
        this._getList()
      }
      this.current = value
    },
    init (key) {
      let catalog = this.$route.params.catalog
      if (typeof catalog !== 'undefined' && catalog !== '') {
        this.catalog = catalog
      }
      if (key) {
        this.page = 0
        this.lists = []
        this.isEnd = false
        this._getList()
      }
    }
  },
  watch: {
    current (newval, oldval) {
      this.init()
    },
    $route (to, from) {
      this.init(true)
    }
  }
}
</script>

<style scoped lang="scss">
  a{
    cursor: pointer;
  }
</style>
