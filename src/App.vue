<template>
  <div id="app">
    <div class="header-wrap">
        
      <header>
        <main-bar/>

        <!-- <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/movies">Movies</router-link>
        </div> -->
        
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
