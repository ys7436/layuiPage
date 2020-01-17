<template>
  <div class="panel main pd20">
    <div class="msg">你好...正式会员</div>
    <div class="layui-row layui-col-space20">
      <div class="layui-col-md6">
        <div class="panel border">
          <div class="title">我的会员信息</div>
          <div class="content">
            <p>你的积分有：60</p>
            <p>您当前为: VIP</p>
          </div>
        </div>
      </div>
      <div class="layui-col-md6">
        <sign class="border"></sign>
      </div>
      <div class="layui-col-md12 mt20">
        <div class="panel border">
          <div class="title">快捷方式</div>
          <div class="content" style="height: auto">
            <ul class="layui-row layui-col-space10">
              <li class="layui-col-sm3 layui-col-xs4">
                <a href="##">
                  <div class="shortcut layui-icon layui-icon-set"></div>
                  <span>修改信息</span>
                </a>
              </li>
              <li class="layui-col-sm3 layui-col-xs4">
                <a href="##">
                  <div class="shortcut layui-icon layui-icon-set"></div>
                  <span>修改头像</span>
                </a>
              </li>
              <li class="layui-col-sm3 layui-col-xs4">
                <a href="##">
                  <div class="shortcut layui-icon layui-icon-set"></div>
                  <span>修改密码</span>
                </a>
              </li>
              <li class="layui-col-sm3 layui-col-xs4">
                <a href="##">
                  <div class="shortcut layui-icon layui-icon-set"></div>
                  <span>账号绑定</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sign from '../sideBar/Sign'
export default {
  name: 'Center',
  components: {
    Sign
  }
}
</script>

<style scoped lang="scss">
  .panel {
    color: #333;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
    transition: all 0.3s;
  }
  .msg {
    background-color: #f8f8f8;
    color: #666;
    padding: 10px 15px;
    margin-bottom: 20px;
  }
  .border {
    border: 1px solid #e6e6e6;
  }
  .pd20 {
    padding: 20px;
  }
  .title {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px dotted #e9e9e9;
    font-size: 14px;
    padding: 0 15px;
    color: #333;
  }
  .content {
    padding: 18px 15px;
    height: 50px;
    line-height: 24px;
    font-size: 14px;
    color: #666;
  }
  .mt20 {
    margin-top: -20px;
  }
  .shortcut{
    height: 60px;
    line-height: 60px;
    background-color: #2f9688;
    width: 100%;
    color: #fff;
    border-radius: 3px;
    font-size: 30px;
  }
  li {
    padding: 5px;
    text-align: center;
  }
</style>
