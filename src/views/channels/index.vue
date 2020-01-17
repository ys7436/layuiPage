<template>
  <div class="layui-row layui-col-space15">
    <div class="layui-col-md8">
      <top></top>
      <list></list>
    </div>
    <div class="layui-col-md4">
      <tips></tips>
      <sign></sign>
      <hot-list></hot-list>
      <ads></ads>
      <links></links>
    </div>
  </div>
</template>

<script>
import Tips from '@/components/sideBar/Tips'
import Links from '@/components/sideBar/Links'
import Ads from '@/components/sideBar/Ads'
import HotList from '@/components/sideBar/HotList'
import Sign from '@/components/sideBar/Sign'
import List from '@/components/contents/List'
import Top from '@/components/contents/Top'
export default {
  name: 'index',
  components: {
    Tips,
    Links,
    Ads,
    HotList,
    Sign,
    List,
    Top
  }
}
</script>

<style scoped>
</style>
