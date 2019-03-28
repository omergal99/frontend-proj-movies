<template>
  <div id="app">

    <main-bar/>

    <router-view/>
    
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
</style>
