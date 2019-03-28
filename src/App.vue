<template>
  <div id="app">
    <div class="header-wrap">
      <header>
        <main-bar/>
      </header>
    </div>

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
