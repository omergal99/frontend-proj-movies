<template>
  <section class="home">
    <section class="main-second screen">
      <HomeMain2/>
    </section>

    <section class="main-first">
      <HomeMain1/>
    </section>

    <section class="header screen full-height">
      <HomeHeader/>
    </section>

    <!-- <section class="main-thrid">
      <HomeMain3/>
    </section>-->

    <section class="about">
      <About/>
    </section>

    <!-- <section class="footer screen">
      <HomeFooter/>
    </section>-->
  </section>
</template>

<script>
// @ is an alias to /src
import About from '@/views/About.vue'
import HomeHeader from '@/components/HomeHeader.vue'
import HomeMain1 from '@/components/HomeMain1.vue'
import HomeMain2 from '@/components/HomeMain2.vue'
// import HomeMain3 from '@/components/HomeMain3.vue'
import HomeFooter from '@/components/HomeFooter.vue'

export default {
  name: 'home',
  components: {
    About,
    HomeHeader,
    HomeMain1,
    HomeMain2,
    // HomeMain3,
    HomeFooter,
  }
}
</script>

<style lang="scss">
// @import '../assets/css/_vars.scss';
//    body {
//      background: $clr2;
//    }
</style>