<template>
  <div class="header">
    <div class="fly-header layui-bg-black">
      <div class="layui-container">
        <a class="fly-logo" href="/">
          <img src="../assets/logo-2.png" alt="layui">
        </a>
        <ul class="layui-nav fly-nav layui-hide-xs">
          <li class="layui-nav-item layui-this">
            <a href="/"><i class="iconfont icon-jiaoliu"></i>交流</a>
          </li>
          <li class="layui-nav-item">
            <a href="/"><i class="iconfont icon-iconmingxinganli"></i>案例</a>
          </li>
          <li class="layui-nav-item">
            <a href="/" target="_blank"><i class="iconfont icon-ui"></i>框架</a>
          </li>
        </ul>
        <ul class="layui-nav fly-nav-user">
          <!-- 未登入的状态 -->
          <template v-if="!isShow">
            <li class="layui-nav-item">
              <router-link tag="a" class="iconfont icon-touxiang layui-hide-xs" to="/login"></router-link>
            </li>
            <li class="layui-nav-item">
              <router-link tag="a" to="/login">登录</router-link>
            </li>
            <li class="layui-nav-item">
              <router-link tag="a" to="/reg">注册</router-link>
            </li>
            <li class="layui-nav-item layui-hide-xs">
              <a href="" onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})" title="QQ登入" class="iconfont icon-qq"></a>
            </li>
            <li class="layui-nav-item layui-hide-xs">
              <a href="" onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})" title="微博登入" class="iconfont icon-weibo"></a>
            </li>
          </template>
          <!-- 登入后的状态 -->
          <template v-else>
            <li @mouseleave="hide" @mousemove="show" class="layui-nav-item">
              <a class="fly-nav-avatar" href="javascript:;">
                <cite class="layui-hide-xs">{{userInfo.name}}</cite>
                <i v-show="userInfo.isVip !== '0'" class="layui-badge fly-badge-vip layui-hide-xs">{{userInfo.isVip}}</i>
                <img :src="userInfo.pic">
              </a>
              <dl :class="{'layui-show': isHover}" class="layui-nav-child layui-anim layui-anim-upbit">
                <dd><router-link tag="a" :to="{ name: 'info' }"><i class="layui-icon">&#xe620;</i>基本设置</router-link></dd>
                <dd><router-link tag="a" :to="{ name: 'msg' }"><i class="iconfont icon-tongzhi" style="top: 4px;"></i>我的消息</router-link></dd>
                <dd><router-link tag="a" :to="{ name: 'home' }"><i class="layui-icon" style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>我的主页</router-link></dd>
                <hr style="margin: 5px 0;">
                <dd><a @click="loginOut" href="javascript:void(0)" style="text-align: center;">退出</a></dd>
              </dl>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Headers',
  data () {
    return {
      isHover: false,
      hoverCtrl: {}
    }
  },
  computed: {
    isShow () {
      return this.$store.state.isLogin
    },
    userInfo () {
      return this.$store.state.userInfo || {
        isVip: '0',
        name: '',
        pic: ''
      }
    }
  },
  methods: {
    show () {
      clearTimeout(this.hoverCtrl)
      this.hoverCtrl = setTimeout(() => {
        this.isHover = true
      }, 200)
    },
    hide () {
      clearTimeout(this.hoverCtrl)
      this.hoverCtrl = setTimeout(() => {
        this.isHover = false
      }, 500)
    },
    loginOut () {
      this.$confirm('确定退出么', () => {
        this.$store.dispatch('localClear', this)
      }, () => {})
    }
  }
}
</script>
<style scoped lang="scss">
  .fly-logo {
    left: -15px;
    top: -10px;
    margin-left: -15px;
  }
</style>
