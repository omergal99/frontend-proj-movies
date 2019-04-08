<template>
  <main>
    <div class="movies-container">
      <div v-if="!fourMovies.length" class="loader-all">
        <img src="../assets/img/omer/loaders/loader2.gif">
      </div>
      <ul class="movie-list" v-if="fourMovies.length && fourMovies">
        <li v-for="(movie,idx) in fourMovies" :key="idx">
          <div class="poster">
            <img v-if="!movie.details.movieImg" src="../assets/img/omer/loaders/loadermovie.gif">
            <router-link :to="'/movies/details/' + movie._id">
              <img :src="movie.details.movieImg" :title="movie.details.name">
            </router-link>
          </div>

          <div class="details flex space-even">
            <label>
              Rank ({{(movie.avgRank)}}
              <i class="fas fa-star"></i>)
            </label>
            <!-- <label>Views (74,841)</label> -->
          </div>

          <div class="users">
            <li
              class="flex space-between align-center"
              v-for="(review,idx) in showReviews(movie._id)"
              :key="idx"
            >
              <div class="user-img-wrap">
                <img
                  class="content"
                  v-if="!review.user.userImg"
                  src="../assets/img/omer/loaders/loader1.gif"
                >
                <img 
                  class="content"
                  :class="[calcLiks(review) > 150 ? 'gold' : 'blue']"
                  @click="userLink(review.user.userId)"
                  :src="review.user.userImg"
                  :title="review.user.userName"
                >
                <div v-if="calcLiks(review) > 150" class="premium">
                  <img class="icon" src="../assets/img/icons/premium.png">
                </div>
              </div>
              <p class="text">
                {{limitWords(review.content.txt)}}
                <span
                  @click="userLink(review.user.userId)"
                >Read more</span>
              </p>
              <p class="likes">LIKES ({{calcLiks(review)}})</p>
            </li>
          </div>
        </li>
      </ul>

      <div class="galery-link">
        <router-link to="/movies">
          <label>See all Movies</label>
        </router-link>
      </div>
    </div>

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
      features: ['Stars to the most rated movies',
        'Cup for opinion leaders',
        'Rate each film on a five-star scale (with halves) to record and share your reaction',
        'Compile and share lists of films on any topic and keep a watchlist of films to see'],
    };
  },
  created() {
    if (!this.$store.state.moviesModule.movies.length) {
      this.$store.dispatch({ type: 'moviesModule/loadMovies' });
    }
  },
  computed: {
    fourMovies() {
      return this.$store.getters['moviesModule/fourMovies'];
    },

    reviews() {
      if (!this.$store.state.reviewsModule.fourReviews.length) {
        this.fourMovies.forEach(movie => {
          this.$store.dispatch({ type: "reviewsModule/loadFourReviews", id: movie._id });
        })
      }
      return this.$store.state.reviewsModule.fourReviews;
      // return this.$store.getters['reviewsModule/fourReviews'];
    }
  },
  methods: {
    calcLiks(review) {
      return review.rate.countLike.length
    },
    showReviews(movieId) {
      var toSend = [];
      this.reviews.forEach(reviewsForMovie => {
        if (reviewsForMovie[0]) {
          if (reviewsForMovie[0].movie.movieId === movieId) {
            toSend = reviewsForMovie;
          }
        }
      })
      return toSend;
    },
    limitWords(str) {
      return str.substring(0, 30) + '...';
    },
    userLink(userId) {
      this.$router.push(`/user/details/${userId}`);
    },
    // arrayAvg(likes) {
    //   var sum = 0;
    //   likes.forEach(like => sum += like.rank);
    //   var avg = sum / likes.length;
    //   return avg.toFixed(2);
    // }
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
.movies-container {
  padding: 0px 0px 25px 0px;
  .galery-link {
    padding: 8px 8px 0 0;
    text-align: right;
    label {
      cursor: pointer;
      text-decoration: underline;
      color: #dbd5d5;
      &:hover {
        color: #3481b4;
      }
    }
  }
}
.movie-list {
  padding: 0;
  list-style-type: none;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-gap: 10px;
  color: #dbd5d5;
  > li {
    border-radius: 4px;
    padding: 6px 2px 2px 2px;
    background-color: #151416;
    .poster {
      height: 140px;
      overflow: hidden;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
        // object-fit: cover;
        object-fit: contain;
        object-position: center;
        transition: transform 0.4s;
        // border-radius: 0px 55px 0px 55px;
        &:hover {
          transform: scale(1.05);
        }
      }
    }
    .details {
      padding: 6px 2px 2px 2px;
      font-size: 0.75em;
    }
    .users {
      li {
        padding: 2px 2px 2px 2px;
        .user-img-wrap {
          width: 40px;
          height: 40px;
          // height: auto;
          overflow: hidden;
          // margin: 0 auto;
          display: inline-block;
          flex: 0 0 40px;
          .content {
            cursor: pointer;
            border-radius: 50%;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border: 2px solid #3481b400;
            &.blue:hover,
            &.gold:hover {
              border: 2px solid #3481b4;
            }
            &.gold {
              border: 2px solid gold;
            }
          }
          .premium {
            // position: absolute;
            .icon {
              position: relative;
              width: 20px;
              height: auto;
              left: 0px;
              top: -22px;
            }
          }
        }
        .text {
          padding-left: 4px;
          text-align: left;
          margin: 0;
          font-size: 0.6em;
          span {
            cursor: pointer;
            font-weight: bold;
            color: #dbd5d5;
            &:hover {
              color: #3481b4;
            }
          }
        }
        .likes {
          text-align: center;
          margin: 0;
          font-size: 0.6em;
          padding-left: 4px;
        }
      }
    }
  }
}

@media (min-width: 500px) {
  .movie-list {
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    grid-gap: 20px;
    > li {
      .poster {
        height: 170px;
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
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
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
  top: -5px;
  left: -8px;
  // background-image: url(../assets/img/icons/white-star2.png);
  // background-repeat: no-repeat;
  // background-position: -53px -8px;
  flex: 0 0 58px;
}
</style>