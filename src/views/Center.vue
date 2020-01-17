<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree">
      <li v-for="(item, index) in lists" :key="'center' + index" class="layui-nav-item layui-nav-itemed">
        <router-link :active-class="item.activeClass" :to="{ name: item.link }" tag="a">
          <i class="layui-icon" :class="item.icon"></i>
          {{ item.name }}
        </router-link>
      </li>
    </ul>
    <div class="ContentView">
      <transition name="slideRight" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Center',
  beforeRouteUpdate (to, from, next) {
    if (this.$store.state.isLogin) {
      next()
    } else {
      next('/login')
    }
  },
  data () {
    return {
      lists: [
        {
          name: '我的主页',
          icon: 'layui-icon-home',
          link: 'home'
        },
        {
          name: '用户中心',
          icon: 'layui-icon-user',
          link: 'center'
        },
        {
          name: '基本设置',
          icon: 'layui-icon-set-fill',
          link: 'info',
          activeClass: 'layui-this'
        },
        {
          name: '我的帖子',
          icon: 'layui-icon-template-1',
          link: 'mypost',
          activeClass: 'layui-this'
        },
        {
          name: '我的消息',
          icon: 'layui-icon-dialogue',
          link: 'msg'
        },
        {
          name: '其他设置',
          icon: 'layui-icon-app',
          link: 'others'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  @media screen and (max-width: 768px){
    .ContentView {
      margin: 0 !important;
    }
  }
  .ContentView {
    margin: 0 20px 10px 225px;
    position: relative;
    min-height: 600px;
  }
  .slideRight-leave-active {
    transform: translate(50px, 0);
    z-index: 100;
    opacity: 0;
    transition: all 0.2s linear;
  }
  .slideRight-enter {
    opacity: 0;
    transform: translate(-50px, 0);
  }
  .slideRight-enter-active {
    transition: all 0.2s linear 0.1s;
  }
</style>
