<template>
  <div>
    <panel></panel>
    <transition name="slideUp">
      <router-view class="router"></router-view>
    </transition>
  </div>
</template>

<script>
import Panel from '../components/Panel'
export default {
  name: 'Home',
  components: {
    Panel
  }
}
</script>
