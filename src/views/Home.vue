<template>
  <section class="home">
    <section class="header screen">
      <HomeHeader/>
    </section>

    <section class="main-first">
      <HomeMain1/>
    </section>

    <!-- <section class="main-second">
      <HomeMain2/>
    </section> -->

    <!-- <section class="main-thrid">
      <HomeMain3/>
    </section> -->

    <section class="about screen full-height">
      <About/>
    </section>

    <section class="footer">
      <HomeFooter/>
    </section>

  </section>
</template>

<script>
// @ is an alias to /src
import HomeHeader from '@/components/HomeHeader.vue'
import HomeMain1 from '@/components/HomeMain1.vue'
import HomeMain2 from '@/components/HomeMain2.vue'
// import HomeMain3 from '@/components/HomeMain3.vue'
import About from '@/views/About.vue'
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