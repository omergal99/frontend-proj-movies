<template>
  <div class="main-second flex space-center">
    <div class="head-text">
      <p>Our Mission</p>
      <p>Reliable and Quality Reviews</p>
      <label>Choose your next movie</label><br>
      <label>Make your decisions based on reliable reviews</label>
    </div>

    <div class="bc-img">
      <img src="../assets/img/omer/people.png">
    </div>
  </div>
</template>

<style scoped lang="scss">
.head-text {
  width: 100vw;
  p {
    margin: 10px 0 10px 0;
    font-size: 26px;
    font-family: merienda, cursive, arial, serif, sans-serif;
    font-weight: bold;
    color: #220428;
  }
  label {
    font-family: quando, cursive, arial, serif, sans-serif;
  }
}
.main-second {
  flex-direction: column;
  .bc-img {
    text-align: center;
    img {
      padding: 20px;
      width: 80vw;
      max-width: 280px;
    }
  }
}
@media (min-width: 720px) {
  .head-text {
    width: 55vw;
    margin: auto 0;
    p {
      font-size: 38px;
    }
  }
  .main-second {
    flex-direction: row;
    .bc-img {
      text-align: right;
      width: 45vw;
      text-align: center;
      img {
        max-width: 420px;
        width: 100%;
      }
    }
  }
}
</style>