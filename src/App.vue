<template>
  <div id="app">
    <div v-if="isStart && currUser && currUser.name === 'Omer'" class="stage" @click="moveStage">
      <transition name="slide-start">
        <img v-if="isOnMove" src="../src/assets/img/omer/home/curtains-right.png">
      </transition>
      <transition name="slide-text">
        <p v-if="isOnMove" class="text-start">
          Movies<br>&<br>Reviews
        </p>
      </transition>
    </div>
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
      }, 3500);
    },
  },
  computed: {
    currUser() {
      return this.$store.state.usersModule.currUser;
    },
  },
}
</script>

<style scoped lang="scss">
.slide-start-leave-active {
  transition: all 3.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-start-leave-to {
  animation: imgOut 3.5s 1;
  animation-direction: alternate;
}
.slide-text-leave-active {
  transition: all 1.4s;
}
.slide-text-leave-to {
  opacity: 0;
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
    top: 0px;
  }
  .text-start {
    position: absolute;
    z-index: 30;
    color: gold;
    left: calc(50% - 225px); // - half of the text width
    top: calc(40% - 160px);
    font-size: 64px;
    margin: 0;
    padding: 30px 20px;
    font-family: neogrey, cursive, Arial, Helvetica, sans-serif;
    // font-family: movieFilmstrip,cursive,Arial, Helvetica, sans-serif;
    text-shadow: 4px 4px 0 #000, -4px 4px 0 #000, 4px -4px 0 #000,
      -4px -4px 0 #000, 0px 4px 0 #000, 0px -4px 0 #000, -4px 0px 0 #000,
      4px 0px 0 #000;
  }
}
@keyframes imgOut {
  0% {
    left: 0px;
    opacity: 1;
  }
  50% {
    opacity: 0.9;
  }
  100% {
    left: 100%;
    width: 0;
    opacity: 0;
  }
}
</style>
