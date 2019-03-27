<template>
  <div class="movie-posters-container flex flex-col">
    <!-- <img src="../assets/img/omer/people.png" alt=""> -->
    <!-- <img class="poster-presentation" src="../assets/img/omer/omer1.png" alt="">
    <img class="poster-presentation" src="../assets/img/omer/omer1.png" alt="">
    <img class="poster-presentation" src="../assets/img/omer/omer1.png" alt="">-->
    <div class="movie-poster omer">
      <img src="../assets/img/omer/apollo11.jpg">
      <div class="pop-text">
        <img src="../assets/img/omer/pop-text-white.png">
        <label>I laughed nonstop from this movie! and learned a lot about love.</label>
      </div>
    </div>

    <div class="movie-poster natalia">
      <img src="../assets/img/omer/apollo11.jpg">
      <div class="pop-text">
        <img src="../assets/img/omer/pop-text-white.png">
        <label>I laughed nonstop from this movie! and learned a lot about love.</label>
      </div>
    </div>

    <div class="movie-poster omer">
      <img src="../assets/img/omer/Ish oushmo Ove.jpg">
      <div class="pop-text">
        <img src="../assets/img/omer/pop-text-white.png">
        <label>I laughed nonstop from this Ove! and learned a lot about love.</label>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.movie-posters-container {
  padding-top: 140px;
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    transition: transform .4s;
  }
  img:hover{
  transform: scale(1.05);
}

  .pop-text {
    position: relative;
    width: 100%;
  }

  label {
    color: white;
    position: relative;
    top: -114px;
    left: 3px;
    width: 100%;
    font-size: 0.8em;
    margin: 0 10px 0 10px;
    float: left;
    width: 80%;
  }
  &.omer {
    top: -32px;
    .pop-text {
      top: -308px;
      left: -19px;
    }
  }
  &.omer::before {
    content: "";
    position: absolute;
    display: block;
    /* z-index: -1; */
    width: 234%;
    height: 315%;
    background-image: url("../assets/img/omer/omer1.png");
    background-size: contain;
    // background-position: -32px -102px;
    background-repeat: no-repeat;
    top: -116px;
    left: -44px;
  }
  &.natalia {
    top: -120px;
    .pop-text {
      top: 17px;
      left: 45px;
    }
  }
  &.natalia::before {
    content: "";
    position: absolute;
    display: block;
    /* z-index: -1; */
    width: 236%;
    height: 265%;
    background-image: url("../assets/img/omer/natalia.png");
    background-size: contain;
    // background-position: -32px -102px;
    background-repeat: no-repeat;
    top: -5px;
    left: 24px;
  }
}

@media (min-width: 700px) {
  .movie-posters-container {
    flex-direction: row;
  }
  .movie-poster {
    margin-bottom: 0;
  }
}
</style>