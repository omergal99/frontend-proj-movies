<template>
  <main>
    <ul class="movie-list">
      <li v-for="(movie,idx) in movies" :key="idx">
        <div class="poster">
          <img :src="movie">
        </div>

        <div class="details flex space-even">
          <label>Rank (9.4)</label>
          <label>Views (74,841)</label>
        </div>

        <div class="users">
          <li class="flex space-between align-center">
            <div>
              <img src="../assets/img/omer/accessories/user.png" alt>
            </div>
            <label>I recomend h jkh kjh h  hui hiu hui h jh jk hkj h ksdf kjnj kn njk nk jn kbj kb kjb kbj kb kjb kjb bkjb ..</label>
            <label>LIKES (59)</label>
          </li>
          <li class="flex space-between align-center">
            <div>
              <img src="../assets/img/omer/accessories/user.png" alt>
            </div>
            <label>I recomend th..</label>
            <label>LIKES (59)</label>
          </li>
        </div>
      </li>
    </ul>

    <ul class="feature-list-grid">
      <li class="flex" v-for="(feature,idx) in features" :key="idx">
        <span class="icon">
          <img src="../assets/img/icons/new.png">
        </span>
        <p>{{feature}}</p>
      </li>
    </ul>
  </main>
</template>

<script>

export default {
  name: "main1",
  data() {
    return {
      movies: ['/img/movie-home/‏‏apollo11.jpg',
        '/img/movie-home/‏‏titanic.jpg',
        '/img/movie-home/‏‏Ish oushmo Ove.jpg',
        '/img/movie-home//‏‏wonder-woman.jpg'],
      features: ['Show some love for your friends and other members to read theirs favorite filmsShow some love for your favorite films, lists and reviews with a “like”',
        'Write and share reviews, and follow friends and other members to read theirs',
        'Rate each film on a five-star scale (with halves) to record and share your reaction',
        'Compile and share lists of films on any topic and keep a watchlist of films to see'],
    };
  },
}
</script>

<style scoped lang="scss">
main {
  height: 100%;
  padding-top: 6vh;
  max-width: 940px;
  margin: 0 auto;
  padding-left: 10px;
  padding-right: 10px;
}

.movie-list {
  list-style-type: none;
  margin: 0 auto;
  padding: 6px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-gap: 20px;
  color: white;
  li {
    padding: 6px 2px 2px 2px;
    background-color: #151416;
    .poster {
      height: 100px;
      overflow: hidden;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
        // object-fit: cover;
        object-fit: contain;
        object-position: center;
      }
    }
    .details {
      padding: 6px 2px 2px 2px;
      font-size: 0.75em;
    }
    .users {
      img {
        width: 30px;
        height: auto;
      }
      label {
        font-size: 0.6em;
      }
    }
  }
}

.feature-list-grid {
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin: 0 0 2vh 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 20px;
  li {
    border-radius: 6px;
    background-color: rgb(18, 22, 26);
    width: 100%;
    padding: 20px;
    margin: 0 auto;
    transition: background-color 0.3s;
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
}

.icon {
  position: relative;
  float: left;
  width: 52px;
  height: 40px;
  margin: 0;
  top: 5px;
  left: -8px;
  // background-image: url(../assets/img/icons/white-star2.png);
  // background-repeat: no-repeat;
  // background-position: -53px -8px;
  flex: 0 0 58px;
}
</style>