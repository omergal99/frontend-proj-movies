<template>
  <div class="main-div">
    <div>
      <ul class="poster-list">
        <li v-for="(movie,idx) in movies" :key="idx">
          <img src="../assets/img/movieImg/apollo11.jpg">
        </li>
      </ul>
      <ul class="feature-list flex wrap space-center align-center">
        <li v-for="(feature,idx) in features" :key="idx">
          <div>
            <p>Hisdfsdgsgsi</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: "home1",
  props: {
  },
  data() {
    return {
      movies: ['name1', 'name2', 'name3', 'name4'],
      features: ['name1', 'name2', 'name3', 'name4'],
    };
  },

}
</script>

<style scoped lang="scss">
.poster-list {
  list-style-type: none;
  margin: 0 auto;
  padding: 0;
  display: grid;
  grid-template: 1fr / repeat(4, 1fr);
  grid-gap: 20px;
  /* height: 100vh; */
  width: 80vw;
}
.poster-list li {
  /* grid-column-start: 2; */
}
.poster-list li img {
  max-height: 40vh;
  width: auto;
}

.feature-list{
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.feature-list li > * {
  width: 20vw;
}

.main-div {
  height: 100%;
  padding-top: 6px;
  padding-top: 20px;
}
</style>