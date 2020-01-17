<template>
  <div>
    <div class="panel fly-column">
      <div class="layui-container">
        <ul>
          <router-link tag="li" to="/">
            <a href="javascript:;">
              首页
            </a>
          </router-link>
          <router-link tag="li" v-for="(item, index) in lists" :key="'panel' + index" :to="item.path">
            <a href="javascript:;">
              {{ item.name }}
              <span class="layui-badge-dot" v-if="item.isNew"></span>
            </a>
          </router-link>
          <li><span class="line"></span></li>
          <!-- !!!: 用户登录后显示 -->
          <template v-if="isLogin">
            <li><a href="">我发表的贴</a></li>
            <li><a href="">我收藏的贴</a></li>
          </template>
        </ul>
        <div class="right">
          <span class="layui-icon layui-icon-search"></span>
          <a href="##" class="layui-btn">发表新帖</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  data () {
    return {
      isLogin: this.$store.state.isLogin,
      lists: [
        {
          name: '提问',
          path: '/index/ask',
          isNew: false
        },
        {
          name: '分享',
          path: '/index/share',
          isNew: true
        },
        {
          name: '讨论',
          path: '/index/discuss',
          isNew: false
        },
        {
          name: '建议',
          path: '/index/advise',
          isNew: false
        },
        {
          name: '公告',
          path: '/index/notice',
          isNew: false
        },
        {
          name: '动态',
          path: '/index/logs',
          isNew: false
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .panel {
    height: 50px;
    line-height: 50px;
    margin-bottom: 15px;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
    position: relative;
  }
  ul {
    li {
      display: inline-block;
      a {
        padding: 0 20px;
      }
    }
    .line {
      display: inline-block;
      height: 10px;
      width: 1px;
      background-color: #e2e2e2;
      vertical-align: middle;
      margin: 0 20px;
    }
  }
  .right{
    position: absolute;
    right: 0;
    top: 0;
    .layui-icon-search {
      margin-right: 10px;
      font-size: 20px;
      &:hover {
        color: #5fb878;
        cursor: pointer;
      }
    }
  }
</style>
