<template>
  <div class="layui-row layui-col-space15">
    <div class="layui-col-md8">
      <list></list>
    </div>
    <div class="layui-col-md4">
      <hot-list></hot-list>
      <ads></ads>
      <links></links>
    </div>
  </div>
</template>

<script>
import Links from '@/components/sideBar/Links'
import Ads from '@/components/sideBar/Ads'
import HotList from '@/components/sideBar/HotList'
import List from '@/components/contents/List'
export default {
  name: 'Template1',
  components: {
    Links,
    Ads,
    HotList,
    List
  }
}
</script>

<style scoped>
</style>
