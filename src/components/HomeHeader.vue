<template>
  <div class="movie-posters-container flex flex-col">
    <!-- <img src="../assets/img/omer/people.png" alt=""> -->
    <!-- <img class="poster-presentation" src="../assets/img/omer/omer1.png" alt="">
    <img class="poster-presentation" src="../assets/img/omer/omer1.png" alt="">
    <img class="poster-presentation" src="../assets/img/omer/omer1.png" alt="">-->
    <div class="movie-poster omer">
      <div class="pop-text">
        <img src="../assets/img/omer/pop-text-white.png">
        <label>omer galsdgs sdvsdg sdg sdggagasg</label>
      </div>
      <img src="../assets/img/omer/apollo11.jpg">
    </div>

    <div class="movie-poster natalia">
      <img src="../assets/img/omer/apollo11.jpg">
    </div>

    <div class="movie-poster omer">
      <img src="../assets/img/omer/apollo11.jpg">
    </div>
  </div>
</template>

<style scoped lang="scss">
.movie-posters-container {
  padding-top: 140px;
  flex-direction: column;
}

.pop-text {
  position: relative;
  top: -114px;
  left: 179px;
  width: 100%;
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
  }

  label {
    color: white;
    position: relative;
    top: -120px;
    left: 0px;
    width: 100%;
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
    top: -145px;
    left: -38px;
  }
  &.natalia{
    top: -91px;
  }
  &.natalia::before {
    content: "";
    position: absolute;
    display: block;
    /* z-index: -1; */
    width: 234%;
    height: 315%;
    background-image: url("../assets/img/omer/natalia.png");
    background-size: contain;
    // background-position: -32px -102px;
    background-repeat: no-repeat;
    top: -29px;
    left: 11px;
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