<template>
  <div id="app">

    <main-bar/>

    <div class="pages">
      <router-view/>
    </div>
    
  </div>
</template>

<script>
import MainBar from '../src/components/MainBar.vue';

export default {
  components: {
    MainBar
  }
}
</script>

<style scoped lang="scss">
.pages{
  padding-top: 68px;
}
</style>
