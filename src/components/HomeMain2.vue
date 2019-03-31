<template>
  <div class="main-second flex space-center">
    <div class="head-text">
      <!-- <p>The place for</p> -->
      <!-- <p>Reliable and Quality Reviews</p> -->
      <p>where Movies and People meet</p>
      <label>Choose your next movie</label>
      <br>
      <!-- <label>Make your decisions based on reliable reviews</label> -->
      <label>Based on reliable & quality reviews</label>
    </div>

    <div class="bc-img">
      <img src="../assets/img/omer/people3.png">
    </div>
  </div>
</template>

<style scoped lang="scss">
.head-text {
  width: 100vw;
  background-color: #80808040;
  padding-top: 10px;
  padding-bottom: 10px;
  p {
    margin: 10px 0 10px 0;
    font-size: 2.2em;
    font-family: merienda, cursive, arial, serif, sans-serif;
    font-weight: bold;
    color: #220428;
  }
  label {
    font-size: 1.2em;
    font-family: Arial, serif, sans-serif, Helvetica;
  }
}
.main-second {
  flex-direction: column;
  max-width: 900px;
  height: 75vh;
  margin: auto 0;
  .bc-img {
    text-align: center;
    margin: auto 0;
    img {
      padding: 10px;
      width: 80vw;
      max-width: 280px;
    }
  }
}
@media (min-width: 720px) {
  .head-text {
    width: 50vw;
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
  .main-second {
    flex-direction: row;
    margin: 0 auto;
    .bc-img {
      text-align: right;
      width: 50vw;
      text-align: center;
      img {
        max-width: 420px;
        width: 100%;
      }
    }
  }
}
</style>