<template>
  <div class="fly-panel fly-signin">
    <div class="fly-panel-title">
      签到
      <i class="fly-mid"></i>
      <a href="javascript:;" class="fly-link" @click="showInfo">说明</a>
      <i class="fly-mid"></i>
      <a href="javascript:;" class="fly-link" @click="showTop">活跃榜<span class="layui-badge-dot"></span></a>
      <span class="fly-signin-days" v-show="isSign || isLogin">
        已连续签到<cite>{{ count }}</cite>天
      </span>
    </div>
    <div class="fly-panel-main fly-signin-main">
      <template v-if="!isSign">
        <button @click="sign" type="button" class="layui-btn layui-btn-danger">今日签到</button>
        <span>可获得<cite>{{ favs }}</cite>飞吻</span>
      </template>
      <!-- 已签到状态 -->
      <template v-else>
        <button class="layui-btn layui-btn-disabled">今日已签到 {{ isTime }}</button>
        <span>获得了<cite>{{ favs }}</cite>飞吻</span>
      </template>
    </div>
    <sign-info :isShow="isShow" @closeModel="close"></sign-info>
    <sign-list :showList="showList" @closeModel="close"></sign-list>
  </div>
</template>

<script>
import SignInfo from './SignInfo'
import SignList from './SignList'
import { userSign } from '../../api/user'
import moment from 'moment'
export default {
  name: 'Sign',
  data () {
    return {
      isShow: false,
      showList: false,
      isSign: false,
      isTime: '',
      nowTime: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      timer: null
    }
  },
  components: {
    SignInfo,
    SignList
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    count () {
      if (this.$store.state.userInfo !== {}) {
        if (typeof this.$store.state.userInfo.count !== 'undefined') {
          return this.$store.state.userInfo.count
        } else {
          return 0
        }
      } else {
        return 0
      }
    },
    favs () {
      let count = parseInt(this.count)
      let result = 0
      if (count < 5) {
        result = 5
      } else if (count >= 5 && count < 15) {
        result = 10
      } else if (count >= 15 && count < 30) {
        result = 15
      } else if (count >= 30 && count < 100) {
        result = 20
      } else if (count >= 100 && count < 365) {
        result = 30
      } else if (count >= 365) {
        result = 50
      }
      return result
    }
  },
  mounted () {
    // 判断用户上一次签到时间与签到状态
    // 如果用户上一次签到时间与当天的签到日期相差一天，允许用户签到
    const isSign = this.$store.state.userInfo.isSign
    const nowDate = moment().format('YYYY-MM-DD')
    const lastSign = this.$store.state.userInfo.lastSign
    const lastDate = moment(lastSign).format('YYYY-MM-DD')
    // 取两个日期之间的差值
    const diff = moment(nowDate).diff(moment(lastDate), 'day')
    if (diff > 0 && isSign) {
      this.isSign = false
    } else {
      this.isSign = isSign
      this.countDown()
    }
  },
  methods: {
    showInfo () {
      this.isShow = true
    },
    showTop () {
      this.showList = true
    },
    close () {
      this.isShow = false
      this.showList = false
    },
    sign () {
      if (!this.isLogin) {
        this.$pop('shake', '请先登录')
        return
      }
      userSign().then((res) => {
        let user = this.$store.state.userInfo
        if (res.code === 200) {
          this.isSign = true
          user.favs = res.favs
          user.count = res.count
          this.$pop('shake', '签到成功')
        } else {
          // 用户已经签到
          this.$alert('您今日已经签到')
        }
        user.isSign = true
        user.lastSign = res.lastSign
        this.$store.commit('setUserInfo', user)
        this.countDown()
      })
    },
    countDown () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const oldTime = moment().format('YYYY-MM-DD HH:mm:ss')
        const nowDiff = moment(this.nowTime).diff(moment(oldTime), 'milliseconds')
        this.isTime = moment(nowDiff).format('HH:mm:ss')
        this.countDown()
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    100%{
      opacity: 1;
      transform: scale(1);
    }
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 2000;
  }
  .layui-layer {
    position: fixed;
    width: 300px;
    height: 480px;
    top: 50%;
    left: 50%;
    margin-top: -240px;
    margin-left: -150px;
    z-index: 2100;
    background-color: #fff;
    &.active {
      animation-fill-mode: both;
      animation-duration: 0.2s;
      animation-name: bounceIn;
    }
    .layui-layer-title {
      height: 42px;
      line-height: 42px;
      padding: 0 20px;
      color: #333;
      background-color: #f8f8f8;
    }
    .layui-tab-item {
      line-height: 45px;
      li {
        border-bottom: 1px dotted #ddd;
        &:last-child {
          border-bottom: 0;
        }
      }
      img {
        width: 30px;
        height: 30px;
        border-radius: 4px;
        overflow: hidden;
        margin-right: 5px;
      }
      .fly-grey {
        color: #999;
      }
    }
    .layui-layer-content {
      padding: 0 10px;
    }
  }
  .layui-icon {
    cursor: pointer;
  }
</style>
