<template>
  <div class="forget">
    <div class="layui-container fly-marginTop">
      <div class="fly-panel fly-panel-user" pad20>
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li>
              <router-link :to="{name: 'login'}">登录</router-link>
            </li>
            <li class="layui-this">找回密码</li>
          </ul>
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <label class="layui-form-label">用户名</label>
                    <validation-provider name="email12" rules="required|email" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="username"
                          autocomplete="off"
                          class="layui-input"
                          v-model="username"
                        />
                      </div>
                      <div class="layui-form-mid error">{{ errors[0] }}</div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">验证码</label>
                    <validation-provider name="code" rules="required|length:4" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="code"
                          v-model="code"
                          placeholder="请回答后面的问题"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div @click="_getCode" class="layui-form-mid svg" v-html="svg"></div>
                      <div class="layui-form-mid error">{{ errors[0] }}</div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button type="button" @click="submit" class="layui-btn">提交</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { getCode, forget } from '../api/login'
export default {
  name: 'forgets',
  data () {
    return {
      code: '',
      username: '',
      svg: ''
    }
  },
  components: {
    ValidationProvider
  },
  methods: {
    _getCode () {
      getCode().then((res) => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    submit () {
      forget({
        username: this.username,
        code: this.code
      }).then((res) => {
        console.log(res)
        if (res.code === 200) {
          alert('邮件发送成功')
        }
      })
    }
  },
  mounted () {
    this._getCode()
  }
}
</script>
<style scoped lang="scss">
</style>
