<template>
  <div class="layui-container flex">
    <p>找不到页面了!!!</p>
    <router-link class="layui-btn" to="/">回到首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'Is404'
}
</script>

<style lang="scss" scoped>
  .flex {
    width: 100%;
    min-height: 400px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }
  p {
    padding: 15px 0;
    color: #999;
  }
</style>
