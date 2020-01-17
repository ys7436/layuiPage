<template>
  <div class="reg">
    <div class="layui-container fly-marginTop">
      <div class="fly-panel fly-panel-user" pad20>
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li>
              <router-link :to="{name: 'login'}">登录</router-link>
            </li>
            <li class="layui-this">注册</li>
          </ul>
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <validation-observer v-slot="{ validate }" ref="observer">
                  <form method="post">
                    <div class="layui-form-item">
                      <label class="layui-form-label">邮箱</label>
                      <validation-provider name="email12" v-slot="{ errors }" rules="required|email">
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            name="username"
                            v-model="username"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class="layui-form-mid error">{{ errors[0] }}</div>
                      </validation-provider>
                    </div>
                    <div class="layui-form-item">
                      <label class="layui-form-label">昵称</label>
                      <validation-provider name="name" v-slot="{ errors }" rules="required">
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            name="name"
                            v-model="name"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class="layui-form-mid error">{{ errors[0] }}</div>
                      </validation-provider>
                    </div>
                    <div class="layui-form-item">
                      <label class="layui-form-label">密码</label>
                      <validation-provider v-slot="{ errors }" name="password" rules="required|min:6" vid="confirmation">
                        <div class="layui-input-inline">
                          <input
                            type="password"
                            name="password"
                            v-model="password"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class="layui-form-mid error">{{ errors[0] }}</div>
                      </validation-provider>
                    </div>
                    <div class="layui-form-item">
                      <label class="layui-form-label">确认密码</label>
                      <validation-provider name="password" v-slot="{ errors }" rules="required|min:6|confirmed:confirmation">
                        <div class="layui-input-inline">
                          <input
                            type="password"
                            name="repassword"
                            v-model="repassword"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class="layui-form-mid error">{{ errors[0] }}</div>
                      </validation-provider>
                    </div>
                    <div class="layui-form-item">
                      <label class="layui-form-label">验证码</label>
                      <validation-provider name="code" v-slot="{ errors }" rules="required|length:4">
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
                        <div class="layui-form-mid svg" @click="_getCode" v-html="svg"></div>
                        <div class="layui-form-mid error">{{ errors[0] }}</div>
                      </validation-provider>
                    </div>
                    <div class="layui-form-item">
                      <button type="button" @click="validate().then(submit)" class="layui-btn">立即注册</button>
                    </div>
                    <div class="layui-form-item fly-form-app">
                      <span>或者直接使用社交账号快捷注册</span>
                      <a href="" class="iconfont icon-qq" title="QQ登入"></a>
                      <a href="" class="iconfont icon-weibo" title="微博登入"></a>
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
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { getCode, reg } from '../api/login'
export default {
  name: 'reg',
  data () {
    return {
      name: '',
      code: '',
      username: '',
      password: '',
      repassword: '',
      svg: ''
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted () {
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
      if (!isValid) {
        return
      }
      reg({
        username: this.username,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid,
        name: this.name
      }).then((res) => {
        if (res.code === 200) {
          this.username = ''
          this.password = ''
          this.code = ''
          this.name = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          /* !!!: 跳转到登录 */
          this.$alert('注册成功')
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        } else {
          this.$refs.observer.setErrors(res.msg)
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
</style>
