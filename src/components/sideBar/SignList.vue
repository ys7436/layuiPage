<template>
  <div class="model" v-show="showList">
    <div @click="close" class="mask"></div>
    <div :class="{'active': showList}" class="layui-layer layui-layer-page info">
      <div class="layui-layer-title">
        签到活跃榜 - TOP20
        <i @click="close" class="layui-icon layui-icon-close pull-right"></i>
      </div>
      <div class="layui-layer-content pd0">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li @click="choose(0)" :class="{'layui-this': current === 0}">最新签到</li>
            <li @click="choose(1)" :class="{'layui-this': current === 1}">今日最快</li>
            <li @click="choose(2)" :class="{'layui-this': current === 2}">总签到榜</li>
          </ul>
          <div class="layui-tab-content">
            <ul class="layui-tab-item layui-show">
              <li v-for="(item, index) in lists" :key="'sign' + index">
                <img class="mr1" src="/images/123.jpg" alt="">
                <cite class="fly-link">{{ item.name }}</cite>
                <span v-if="current !== 2" class="fly-grey">
                    签到于 {{ item.created }}
                  </span>
                <span v-else class="fly-grey">已经连续签到<i class="orange">{{ item.count }}</i>天</span>
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignList',
  data () {
    return {
      current: 0,
      lists: [
        {
          name: '李磊',
          count: 4,
          created: '2019-01-01'
        },
        {
          name: '第三个',
          count: 2,
          created: '2019-01-02'
        },
        {
          name: '法国大使',
          count: 41,
          created: '2019-01-03'
        },
        {
          name: '模式',
          count: 22,
          created: '2019-01-04'
        }
      ]
    }
  },
  props: {
    showList: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    choose (val) {
      this.current = val
    },
    close () {
      this.$emit('closeModel')
    }
  }
}
</script>
