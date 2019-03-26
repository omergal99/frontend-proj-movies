<template>
    <div class="main-div">
      
      <div class="poster-wrap">
        <ul class="poster-list">
          <li v-for="(movie,idx) in movies" :key="idx">
            <img src="../assets/img/movieImg/apollo11.jpg">
          </li>
        </ul>
      </div>

      <ul class="feature-list flex wrap space-center align-center">
        <li v-for="(feature,idx) in features" :key="idx">
          <div>
            <span class="icon"></span>
            <p>{{feature}}</p>
          </div>
        </li>
      </ul>

    </div>
</template>

<script>

export default {
  name: "main1",
  props: {
  },
  data() {
    return {
      movies: ['name1', 'name2', 'name3'],
      features: ['Show some love for your favorite films, lists and reviews with a “like”',
        'Write and share reviews, and follow friends and other members to read theirs',
        'Rate each film on a five-star scale (with halves) to record and share your reaction',
        'Compile and share lists of films on any topic and keep a watchlist of films to see'],
    };
  },

}
</script>

<style scoped lang="scss">
.main-div {
  height: 100%;
  padding-top: 6px;
  padding-top: 80px;
}

.poster-wrap {
  background-color: #524a54;
  padding: 12px 0;
}

.poster-list {
  list-style-type: none;
  margin: 0 auto;
  padding: 6px;
  display: grid;
  grid-template: 1fr / repeat(3, 1fr);
  grid-gap: 12px;
  max-width: 90vw;
}
.poster-list li {
  padding: 6px 6px 2px 6px;
}

.poster-list li img {
  width: 25vw;
}

.feature-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin: 60px 22px 0 0;
}
.feature-list li > div {
  border-radius: 6px;
  width: 20vw;
  background-color: rgb(18, 22, 26);
  width: 42vw;
  padding: 20px;
  height: 100px;
  margin: 0 0 30px 22px;
  transition: background-color .3s;
  cursor: pointer;
  &:hover {
    background-color: rgb(9, 11, 14);
  }
  & p {
    color: rgb(223, 223, 223);
    font-size: 0.8em;
    margin: 0 0 0 70px;
    text-align: left;
    // max-height: 46px;
    // overflow: hidden;
  }
}

.icon {
  background-position: -52px 3px;
  position: relative;
  float: left;
  width: 52px;
  height: 40px;
  margin: 0;
  top: 5px;
  background: url(../assets/img/icons/feature.png) no-repeat;
}


</style>