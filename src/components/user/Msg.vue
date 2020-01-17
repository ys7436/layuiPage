<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" style="margin-top: 15px;">
      <button class="layui-btn layui-btn-danger">清空全部消息</button>
      <div style="margin-top: 10px;">
        <!--<div class="fly-none">您暂时没有最新消息</div>-->
        <ul class="mine-msg">
          <li data-id="123">
            <blockquote class="layui-elem-quote">
              <a href="" target="_blank">
                <cite>Absolutely</cite>
              </a>
              回答了您的求解
              <a target="_blank" href="">
                <cite>layui后台框架</cite>
              </a>
            </blockquote>
            <p>
              <span>1小时前</span>
              <a href="javascript:;" class="layui-btn layui-btn-small layui-btn-danger fly-delete">删除</a>
            </p>
          </li>
          <li data-id="123">
            <blockquote class="layui-elem-quote">
              系统消息：欢迎使用 layui
            </blockquote>
            <p>
              <span>1小时前</span>
              <a href="javascript:;" class="layui-btn layui-btn-small layui-btn-danger fly-delete">删除</a>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Msg'
}
</script>

<style scoped>
</style>
