<template>
    <div class="main-div">
      
      <div class="poster-wrap">
        <ul class="poster-list">
          <li v-for="(movie,idx) in movies" :key="idx">
            <img src="../assets/img/omer/apollo11.jpg">
          </li>
        </ul>
      </div>

      <ul class="feature-list-grid">
        <li class="flex" v-for="(feature,idx) in features" :key="idx">
            <span class="icon"></span>
            <p>{{feature}}</p>
        </li>
      </ul>

    </div>
</template>

<script>

export default {
  name: "main1",
  data() {
    return {
      movies: ['name1', 'name2', 'name3', 'name3'],
      features: ['Show some love for your favorite filmsShow some love for your favorite filmsShow some love for your favorite films, lists and reviews with a “like”',
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
  padding-top: 8vh;
}

.poster-wrap {
  padding: 12px 0;
}

.poster-list {
  list-style-type: none;
  margin: 0 auto;
  padding: 6px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-gap: 20px;
}
.poster-list li {
  padding: 6px 0px 2px 0px;
}

.feature-list-grid{
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin: 0 0 2vh 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 20px;
}
.feature-list-grid li {
  border-radius: 6px;
  background-color: rgb(18, 22, 26);
  width: 100%;
  padding: 20px;
  margin: 0 auto;
  transition: background-color .3s;
  cursor: pointer;
  &:hover {
    background-color: rgb(9, 11, 14);
  }
  & p {
    color: rgb(223, 223, 223);
    font-size: 0.8em;
    text-align: left;
  }
}

.icon {
  position: relative;
  float: left;
  width: 52px;
  height: 40px;
  margin: 0;
  top: 5px;
  background-image: url(../assets/img/icons/feature.png);
  background-repeat: no-repeat;
  background-position: -53px -8px;
  flex: 0 0 58px;
}


</style>