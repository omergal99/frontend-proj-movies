<template>
  <div class="movie-posters-container flex flex-col">
    <!-- <img src="../assets/img/omer/people.png" alt=""> -->
    <!-- <img class="poster-presentation" src="../assets/img/omer/omer1.png" alt="">
    <img class="poster-presentation" src="../assets/img/omer/omer1.png" alt="">
    <img class="poster-presentation" src="../assets/img/omer/omer1.png" alt="">-->
    <div class="movie-poster olga">
      <div class="zoom">
        <img @click="direct('5c9c7f63d44e15672c5de7ea')" src="../assets/img/omer/wonder-woman.jpg">
      </div>
      <div class="pop-text">
        <img src="../assets/img/omer/popcorn3.png">
        <label>The film gave me inspiration and strength to be who I am. Especially recommended for women!</label>
      </div>
    </div>

    <div class="movie-poster natalia">
      <div class="zoom">
        <img @click="direct('5c9c99cad44e15672c5de832')" src="../assets/img/omer/apollo11.jpg">
      </div>
      <div class="pop-text">
        <img src="../assets/img/omer/screenwriter3.png">
        <label>I love a lot of movies, and this movie is one of the highlights.</label>
      </div>
    </div>

    <div class="movie-poster omer">
      <div class="zoom">
        <img @click="direct('5c9c8037d44e15672c5de7eb')" src="../assets/img/omer/Ish oushmo Ove.jpg">
      </div>
      <div class="pop-text">
        <img src="../assets/img/omer/clapper4.png">
        <label>I laughed nonstop from this Ove! and learned a lot about love.</label>
      </div>
      <div class="glass">
        <img src="../assets/img/omer/accessories/glass.png">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "homeHeader",
  data() {
    return {
    }
  },
  methods:{
    direct(id) {
      this.$router.push(`/movies/details/${id}`);
    }
  }

}
</script>

<style scoped lang="scss">
.movie-posters-container {
  padding-top: 150px;
  flex-direction: column;
}

.movie-poster {
  height: 200px;
  width: 134px;
  margin: 0 auto 300px auto;
  position: relative;
  left: -43px;

  > * {
    position: relative;
  }

  .pop-text {
    position: relative;
    width: 100%;
  }

  label {
    position: relative;
    font-size: 0.8em;
    margin: 0 10px 0 10px;
    float: left;
  }

  .zoom {
    height: 96%;
    border-radius: 4px;
    transition: border-radius 0.4s;
  }
  .zoom:hover {
    border-radius: 8px;
  }

  &.olga {
    top: 120px;
    left: 55px;
    .pop-text {
      top: -370px;
      left: -110px;
      transform: rotate(8deg);
      label {
        color: rgb(17, 17, 17);
        width: 70%;
        top: -122px;
        left: 10px;
      }
      img {
        width: 94%;
      }
    }
  }
  &.olga::before {
    content: "";
    position: absolute;
    display: block;
    width: 234%;
    height: 258%;
    background-image: url("../assets/img/omer/olga.png");
    background-size: contain;
    background-repeat: no-repeat;
    top: -244px;
    left: -26px;
  }

  &.natalia {
    top: -112px;
    .pop-text {
      top: 16px;
      left: 0px;
      label {
        color: #0e0d0d;
        width: 70%;
        top: -119px;
        left: 28px;
      }
      img {
        width: 134%;
      }
    }
  }
  &.natalia::before {
    content: "";
    position: absolute;
    display: block;
    width: 236%;
    height: 265%;
    background-image: url("../assets/img/omer/natalia.png");
    background-size: contain;
    background-repeat: no-repeat;
    top: -14px;
    left: 24px;
  }
  &.omer {
    top: -26px;
    .pop-text {
      top: -318px;
      left: -16px;
      transform: rotate(-8deg);
      label {
        color: rgb(247, 247, 247);
        width: 80%;
        top: -77px;
        left: 5px;
      }
      img {
        width: 94%;
      }
    }
    .glass {
      top: -434px;
      left: 69px;
      transform: rotate(-5deg);
      img {
        width: 40%;
      }
    }
  }
  &.omer::before {
    content: "";
    position: absolute;
    display: block;
    width: 234%;
    height: 261%;
    background-image: url("../assets/img/omer/omer1.png");
    background-size: contain;
    background-repeat: no-repeat;
    top: -100px;
    left: 9px;
  }
}

@media (min-width: 800px) {
  .movie-posters-container {
    flex-direction: row;
  }
  .movie-poster {
    margin-bottom: 0;
  }
}
</style>