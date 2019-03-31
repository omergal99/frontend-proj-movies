<template>
  <div class="main-second flex space-center">
    <div class="head-text">
      <!-- <p>The place for</p> -->
      <!-- <p>Reliable and Quality Reviews</p> -->
      <p>Where 
        <span class="strip-font">Movies</span> & 
        <span class="strip-font">People</span> meet
      </p>
      <label>Choose your next movie</label>
      <br>
      <!-- <label>Make your decisions based on reliable reviews</label> -->
      <label>Based on reliable & quality reviews</label>
    </div>
    <div class="container">
      <div class="bc-img">
        <img src="../assets/img/omer/home/boy-cinema3.png">
        <!-- <img src="../assets/img/omer/home/brown-strip.jpg"> -->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.main-second {
  flex-direction: column;
  max-width: 900px;
  margin: auto 0;
  .head-text {
    width: 100%;
    height: auto;
    background-color: #ffffff59;
    border-radius: 2px;
    padding-top: 10px;
    padding-bottom: 10px;
    p {
      margin: 0 0 0 0;
      font-size: 2.2em;
      font-family: merienda, cursive, arial, serif, sans-serif;
      font-weight: bold;
      color: #220428;
      .strip-font{
        font-family: acFilmstrip,merienda, cursive, arial, serif, sans-serif;
      }
    }
    label {
      font-size: 1.2em;
      font-family: Arial, serif, sans-serif, Helvetica;
    }
  }
  .bc-img {
    padding: 22px;
    img {
      border-radius: 4px;
      width: 80%;
      max-width: 360px;
    }
    // &::before {
    //   content: "";
    //   position: absolute;
    //   display: block;
    //   width: 100%;
    //   height: 80%;
    //   top: 0px;
    //   background-image: url("../assets/img/omer/home/only-boy.png");
    //   background-size: contain;
    //   background-repeat: no-repeat;
    // }
  }
}
@media (min-width: 720px) {
  .main-second {
    flex-direction: row;
    margin: 0 auto;
    .bc-img {
      img {
        width: 100%;
        max-width: 440px;
      }
    }
    .head-text {
      width: 65%;
      height: auto;
      padding-left: 10px;
      padding-right: 10px;
      // padding-top: 10vh;
      margin: auto 0 auto 10px;
      p {
        font-size: 2.8em;
      }
      label {
        font-size: 1.4em;
      }
    }
  }
}
</style>