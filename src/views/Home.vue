<template>
  <section class="home">
    
    <section class="header screen">
      <!-- <div class="bnr-strp"></div> -->
      <HomeHeader/>
    </section>

    <section class="main-first">
      <!-- <div class="bnr-strp"></div> -->
      <HomeMain1/>
    </section>

    <section class="main-second screen">
      <!-- <div class="bnr-strp"></div> -->
      <HomeMain2/>
    </section>

    <section class="main-thrid">
      <!-- <div class="bnr-strp"></div> -->
      <HomeMain3/>
    </section>

    <section class="about screen">
      <!-- <div class="bnr-strp"></div> -->
      <About/>
    </section>

    <section class="footer">
      <!-- <div class="bnr-strp"></div> -->
      <HomeFooter/>
    </section>
  </section>
</template>

<script>
// @ is an alias to /src
import About from '@/views/About.vue'
import HomeHeader from '@/components/HomeHeader.vue'
import HomeMain1 from '@/components/HomeMain1.vue'
import HomeMain2 from '@/components/HomeMain2.vue'
import HomeMain3 from '@/components/HomeMain3.vue'
import HomeFooter from '@/components/HomeFooter.vue'

export default {
  name: 'home',
  components: {
    About,
    HomeHeader,
    HomeMain1,
    HomeMain2,
    HomeMain3,
    HomeFooter,
  }
}
</script>

<style lang="scss">
@import '../assets/css/_layout.scss';

</style>