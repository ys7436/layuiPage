<template>
  <div class="layui-container flex">
    <div class="layui-row font">确定账号更新为{{username}}么？</div>
    <div class="layui-row">
      <button :class="{'layui-btn-disabled': isSend}" class="layui-btn" @click="submit">确定更新账号么</button>
      <router-link class="layui-btn layui-btn-primary" to="/" tag="button">返回首页</router-link>
    </div>
  </div>
</template>

<script>
import { updateUsername } from '../api/user'
export default {
  name: 'Confirm',
  data () {
    return {
      obj: '',
      username: '',
      isSend: false
    }
  },
  mounted () {
    let queryStr = window.location.href.replace(/.*\?/, '')
    this.obj = Object.fromEntries(queryStr.split('&').map(v => v.split('=')))
    this.username = decodeURIComponent(this.obj.username)
  },
  methods: {
    submit () {
      this.obj.username = this.username
      console.log(this.obj)
      updateUsername(this.obj).then((res) => {
        if (res.code === 200) {
          this.isSend = true
          this.$alert(res.msg)
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        }
      })
    }
  }
}
</script>

<style scoped>
  .flex {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    min-height: 300px;
  }
  .font {
    font-size: 16px;
    color: #333;
    margin-bottom: 30px;
  }
</style>
