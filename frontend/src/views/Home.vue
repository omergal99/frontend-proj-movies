<template>
  <div class="home">
    <HelloWorld msg="Home!"/>
    <img alt="Vue logo" src="../assets/img/home.jpg">
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
