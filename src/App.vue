<template>
  <div id="app">
    <!-- <div v-if="isStart" class="stage" @click="moveStage">
      <transition name="slide-start">
        <img v-if="isOnMove" src="../src/assets/img/omer/home/curtains-right.png">
      </transition>
    </div> -->

    <main-bar/>

    <div class="pages">
      <router-view/>
    </div>
  </div>
</template>

<script>
import MainBar from '../src/components/MainBar.vue';

export default {
  data() {
    return {
      isStart: true,
      isOnMove: true
    }
  },
  components: {
    MainBar
  },
  methods: {
    moveStage() {
      this.isOnMove = false;
      setTimeout(() => {
        this.isStart = false;
      }, 4000);
    },
  }
}
</script>

<style scoped lang="scss">
// .slide-start-enter-active {
//   transition: all 5s ease;
// }
.slide-start-leave-active {
  // transition: all 4s ;
  transition: all 4s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-start-enter,
.slide-start-leave-to {
  // transform: translateX(10px);
  // left: 100vw;
  animation: myfirst 4s 1;
  animation-direction: alternate;
  // opacity: 0;
}
.pages {
  padding-top: 68px;
}
.stage {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  img {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 30;
    left: 0px;
    // right: 0px;
    top: 0px;
    // .animate {
    // animation: myfirst 5s 1;
    // animation-direction: alternate;
    // }
  }
}
@keyframes myfirst {
  0% {
    left: 0px;
    opacity: 1;
  }
  90%{
    opacity: 0.8;
  }
  100% {
    // width: 0;
    left: 100%;
    width: 0;
    opacity: 0;
  }
}
</style>
