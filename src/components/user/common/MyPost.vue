<template>
  <div>
    <table class="layui-table" cellpadding="0" cellspacing="0" border="0">
      <thead>
        <tr class="text-center">
          <th class="text-left"><div class="layui-table-cell pl0">帖子标题</div></th>
          <th><div class="layui-table-cell">状态</div></th>
          <th><div class="layui-table-cell">结贴</div></th>
          <th><div class="layui-table-cell">发表时间</div></th>
          <th><div class="layui-table-cell">数据</div></th>
          <th><div class="layui-table-cell">操作</div></th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center pl0">
          <td class="text-left">文章标题</td>
          <td>打开</td>
          <td>未结</td>
          <td>2019-01-01</td>
          <td>10阅、2答</td>
          <td>
            <div class="layui-btn layui-btn-xs">编辑</div>
            <div class="layui-btn layui-btn-xs layui-btn-danger">删除</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MyPost'
}
</script>

<style scoped lang="scss">
  .text-center th {
    text-align: center;
    &.text-left {
      text-align: left;
    }
  }
</style>
