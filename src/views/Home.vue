<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/img/home.jpg"> -->

    <section class="header">
      <div class="bnr-strp"></div>
      <HomeHeader/>
    </section>

    <section class="main-first">
      <div class="bnr-strp"></div>
      <HomeMain1/>
    </section>

    <section class="main-second">
      <div class="bnr-strp"></div>
      <HomeMain2/>
    </section>

    <section class="main-thrid">
      <div class="bnr-strp"></div>
      <HomeMain3/>
    </section>

    <section class="about">
      <div class="bnr-strp"></div>
      <About/>
    </section>

    <section class="footer">
      <div class="bnr-strp"></div>
      <HomeFooter/>
    </section>
  </div>
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
<style scoped>
.home section {
  height: 80vh;
  z-index: -100;
}
.home section .bnr-strp {
  z-index: -150;
}
.bnr-strp {
  bottom: -25vh;
  height: 300vw;
  width: 150%;
  position: absolute;
}
.header {
  /* height: 50vh; */
  background-color: rgb(0, 150, 150);
  background-color: #83ae84;
  background-color: rgb(78, 105, 78);
  background-color: #438573;
  background-color: #4bb875;
  overflow: hidden;
  position: relative;
}
.header .bnr-strp {
  transform: rotate(150deg);
  background-color: rgb(0, 107, 150);
  background-color: #6586a7;
  background-color: rgb(88, 124, 160);
  background-color: #6b5b95;
  border-radius: 50%;
}

.main-first {
  /* height: 50vh; */
  background-color: rgb(165, 112, 81);
  background-color: #ffc652;
  background-color: rgb(219, 167, 62);
  overflow: hidden;
  position: relative;
}
.main-first .bnr-strp {
  right: -20vw;
  transform: rotate(80deg);
  background-color: rgb(87, 44, 57);
  background-color: #5f021f;
  background-color: rgb(117, 10, 44);
}

.main-second {
  /* height: 50vh; */
  background-color: rgb(0, 150, 130);
  overflow: hidden;
  position: relative;
}
.main-second .bnr-strp {
  right: 70vw;
  bottom: -55vh;
  transform: rotate(-20deg);
  background-color: rgb(0, 54, 99);
}

.main-thrid {
  /* height: 50vh; */
  background-color: rgb(207, 135, 0);
  background-color: #cf4e4a;
  overflow: hidden;
  position: relative;
}
.main-thrid .bnr-strp {
  right: 20vh;
  transform: rotate(280deg);
  background-color: rgb(107, 25, 103);
  border-radius: 50%;
}

.about {
  /* height: 50vh; */
  background-color: rgb(107, 0, 107);
  overflow: hidden;
  position: relative;
}
.about .bnr-strp {
  right: 30vh;
  transform: rotate(20deg);
  background-color: rgb(0, 150, 87);
}

.footer {
  /* height: 50vh; */
  background-color: #034f84;
  overflow: hidden;
  position: relative;
}
.footer .bnr-strp {
  left: 15vh;
  transform: rotate(130deg);
  background-color: rgb(0, 127, 177);
  border-radius: 50%;
}

@media (min-width: 400px) {
  .bnr-strp {
    height: 270vw;
  }
}
@media (min-width: 500px) {
  .bnr-strp {
    height: 250vw;
  }
}
@media (min-width: 600px) {
  .bnr-strp {
    height: 225vw;
  }
}

@media (min-width: 800px) {
  .bnr-strp {
    height: 210vw;
  }
}

@media (min-width: 1030px) {
  .bnr-strp {
    height: 200vw;
  }
}
@media (min-width: 1580px) {
  .bnr-strp {
    height: 190vw;
  }
}

@media (min-height: 500px) {
  .home section {
    height: 90vh;
  }
}
</style>