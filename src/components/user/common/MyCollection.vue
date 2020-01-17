<template>
  <div>
    <table class="layui-table" cellpadding="0" cellspacing="0" border="0">
      <thead>
        <tr>
          <th class="title"><div class="layui-table-cell pl0">帖子标题</div></th>
          <th><div class="layui-table-cell text-right pr0">收藏时间</div></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>收藏的帖子标题</td>
          <td class="text-right">2019-01-01 10:10:00</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MyCollection'
}
</script>

<style scoped>
  .title{
    width: 70%;
  }
</style>
