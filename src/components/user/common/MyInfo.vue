<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <validation-observer v-slot="{ validate }" ref="observer">
      <form>
        <div class="layui-form-item">
          <label class="layui-form-label">邮箱</label>
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
            <div class="layui-form-mid error">{{errors[0]}}</div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">昵称</label>
          <validation-provider name="name" v-slot="{ errors }" rules="required">
            <div class="layui-input-inline">
              <input
                type="text"
                name="name"
                autocomplete="off"
                class="layui-input"
                v-model="name"
              />
            </div>
            <div class="layui-form-mid error">{{errors[0]}}</div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">城市</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="location"
              autocomplete="off"
              class="layui-input"
              v-model="location"
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">性别</label>
          <div class="layui-input-inline custom1">
            <label class="custom2">
              <input v-model="gender" type="radio" id="gender1" name="sex" value="0" title="男" />
              <i class="layui-icon" :class="[gender === '0' ? 'layui-icon-radio' : 'layui-icon-circle']"></i>
              男
            </label>
            <label>
              <input v-model="gender" type="radio" id="gender2" name="sex" value="1" title="女" />
              <i class="layui-icon" :class="[gender === '1' ? 'layui-icon-radio' : 'layui-icon-circle']"></i>
              女
            </label>
          </div>
        </div>
        <div class="layui-form-item layui-form-text">
          <label class="layui-form-label">签名</label>
          <div class="layui-input-block">
                  <textarea
                    placeholder="随便写些什么刷下存在感"
                    name="regmark"
                    autocomplete="off"
                    class="layui-textarea"
                    v-model="regmark"
                    style="height: 80px;"></textarea>
          </div>
        </div>
        <div class="layui-form-item">
          <button type="button" @click="validate().then(submit)" class="layui-btn">确认修改</button>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { updateUserInfo } from '../../../api/user'

export default {
  name: 'MyInfo',
  data () {
    return {
      gender: '0',
      username: '',
      name: '',
      location: '',
      regmark: ''
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted () {
    let { username, name, location, gender, regmark } = this.$store.state.userInfo
    this.username = username || ''
    this.name = name || ''
    this.location = location || ''
    this.gender = gender || ''
    this.regmark = regmark || ''
  },
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) return
      updateUserInfo({
        username: this.username,
        name: this.name,
        location: this.location,
        gender: this.location,
        regmark: this.regmark
      }).then((res) => {
        if (res.code === 200) {
          console.log(res)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .custom1 {
    margin-top: 9px;
    color: #333;
    margin-left: 10px;
  }
  .custom2 {
    margin-right: 10px;
  }
  .layui-icon-radio {
    color: #5fb878;
  }
</style>
