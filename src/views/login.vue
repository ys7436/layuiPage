<template>
  <div class="login">
    <div class="layui-container fly-marginTop">
      <div class="fly-panel fly-panel-user" pad20>
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li class="layui-this">登录</li>
            <li>
              <!--打开新的页面<router-link tag="a" target="_blank" :to="{name: 'reg'}">注册</router-link>-->
              <router-link :to="{name: 'reg'}">注册</router-link>
            </li>
          </ul>
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <validation-observer v-slot="{ validate }" ref="observer">
                  <form method="post">
                    <div class="layui-form-item">
                      <label class="layui-form-label">用户名</label>
                      <validation-provider name="email12" rules="required|email" v-slot="{ errors }">
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            name="username"
                            v-model="username"
                            autocomplete="off"
                            class="layui-input"
                            placeholder="请输入用户名"
                          />
                        </div>
                        <div class="layui-form-mid error">{{errors[0]}}</div>
                      </validation-provider>
                    </div>
                    <div class="layui-form-item">
                      <label class="layui-form-label">密码</label>
                      <validation-provider name="password" rules="required|min:6" v-slot="{ errors }">
                        <div class="layui-input-inline">
                          <input
                            type="password"
                            name="password"
                            v-model="password"
                            autocomplete="off"
                            class="layui-input"
                            placeholder="请输入密码"
                          />
                        </div>
                        <div class="layui-form-mid error">{{errors[0]}}</div>
                      </validation-provider>
                    </div>
                    <div class="layui-form-item">
                      <label class="layui-form-label">验证码</label>
                      <validation-provider ref="codeField" name="code" v-slot="{ errors }" rules="required|length:4">
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            name="code"
                            v-model="code"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div @click="_getCode" class="layui-form-mid svg" v-html="svg"></div>
                        <div class="layui-form-mid error">{{errors[0]}}</div>
                      </validation-provider>
                    </div>
                    <div class="layui-form-item">
                      <button type="button" @click="validate().then(submit)" class="layui-btn">立即登录</button>
                      <span style="padding-left:20px;">
                      <router-link :to="{name: 'forget'}">忘记密码</router-link>
                    </span>
                    </div>
                    <div class="layui-form-item fly-form-app">
                      <span>或者使用社交账号登入</span>
                      <a href="##" class="iconfont icon-qq" title="QQ登入"></a>
                      <a href="##" class="iconfont icon-weibo" title="微博登入"></a>
                    </div>
                  </form>
                </validation-observer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCode, login } from '../api/login'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import uuid from 'uuid/v4'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      code: '',
      svg: ''
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted () {
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
    this._getCode()
  },
  methods: {
    _getCode () {
      let sid = this.$store.state.sid
      getCode(sid).then((res) => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) { return }
      login({
        username: this.username,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 200) {
          res.data.username = this.username
          this.$store.commit('setUserInfo', res.data)
          this.$store.commit('setToken', res.token)
          this.$store.commit('setIsLogin', true)
          this.username = ''
          this.password = ''
          this.code = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          setTimeout(() => {
            this.$router.push({ name: 'index' })
          }, 150)
        } else if (res.code === 401) {
          this.$refs.codeField.setErrors([res.msg])
        }
      }).catch((err) => {
        const data = err.response.data
        if (data.code === 500) {
          this.$alert('用户名密码校验失败')
        } else {
          this.$alert('服务器错误')
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
</style>
