<template>
  <main>
    <div class="users-container">
      <div v-if="!fourUsers.length" class="loader-all">
        <img src="../assets/img/omer/loaders/loader2.gif">
      </div>
      <ul class="user-list" v-if="fourUsers.length">
        <li v-for="(user,idx) in fourUsers" :key="idx">
          <div class="poster">
            <img
              class="content"
              v-if="!user.userImg"
              src="../assets/img/omer/loaders/loadermovie.gif"
            >
            <router-link :to="'/user/details/' + user._id">
              <img class="content" :src="user.userImg">
            </router-link>
            <div class="premium">
              <img class="icon" src="../assets/img/icons/premium.png">
            </div>
          </div>

          <div class="details flex space-between">
            <label>{{user.name}}</label>
            <label>Likes {{sumReviews(user._id)}}</label>
          </div>

          <div class="movies">
            <li v-for="(review,idx) in showReviews(user._id)" :key="idx">
              <div v-if="idx < 2" class="flex space-between align-center">
                <div class="movie-img-wrap">
                  <img v-if="!review.movie.movieId" src="../assets/img/omer/loaders/loader1.gif">
                  <img @click="movieLink(review.movie.movieId)" :src="review.movie.movieImg">
                </div>
                <p class="text">
                  {{limitWords(review.content.txt)}}
                  <span
                    @click="movieLink(review.movie.movieId)"
                  >Read more</span>
                </p>
                <p class="likes">LIKES ({{review.rate.countLike.length}})</p>
              </div>
            </li>
          </div>
        </li>
      </ul>
      <!-- <div class="galery-link">
        <router-link to="/movies">
          <label>See 10 Top Users</label>
        </router-link>
      </div>-->
    </div>
  </main>
</template>

<script>

export default {
  name: "main2",
  data() {
    return {
    }
  },
  created() {
    if (!this.$store.state.usersModule.users.length) {
      this.$store.dispatch({ type: 'usersModule/loadUsers' });
    }
  },
  computed: {
    fourUsers() {
      return this.$store.getters['usersModule/fourUsers'];
    },
    reviews() {
      if (!this.$store.state.reviewsModule.fourReviewsUser.length) {
        this.fourUsers.forEach(user => {
          this.$store.dispatch({ type: "reviewsModule/loadFourReviewsUser", id: user._id });
        })
      }
      return this.$store.state.reviewsModule.fourReviewsUser;
    }
  },
  methods: {
    showReviews(userId) {
      var toSend = [];
      this.reviews.forEach(reviewsForUser => {
        if (reviewsForUser[0]) {
          if (reviewsForUser[0].user.userId === userId) {
            toSend = reviewsForUser;
          }
        }
      })
      return toSend;
    },
    sumReviews(userId) {
      var fourArrReviews = this.$store.state.reviewsModule.fourReviewsUser;
      if (fourArrReviews.length >= 4) {
        var sum = 0;
        var idx = fourArrReviews.findIndex((arr) => arr[0].user.userId === userId)
        fourArrReviews[idx].forEach(review => {
          sum += review.rate.countLike.length;
        })
        return sum;
      }
    },
    limitWords(str) {
      return str.substring(0, 45) + '...';
    },
    movieLink(userId) {
      this.$router.push(`/movies/details/${userId}`);
    },
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
.users-container {
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
.user-list {
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
      overflow: hidden;
      margin: 0 auto;
      .content {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        width: 125px;
        height: 125px;
        object-fit: cover;
        transition: transform 0.4s;
        &:hover {
          transform: scale(1.05);
        }
      }
      .premium {
        position: absolute;
        .icon {
          position: relative;
          width: 45px;
          height: auto;
          left: 18px;
          top: -45px;
        }
      }
    }
    .details {
      padding: 6px 2px 2px 2px;
      font-size: 0.75em;
    }
    .movies {
      li {
        padding: 2px 2px 2px 2px;
        .movie-img-wrap {
          // width: 40px;
          flex: 0 0 40px;
          height: 50px;
          overflow: hidden;
          display: inline-block;
          img {
            cursor: pointer;
            border-radius: 4px;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border: 2px solid #3481b400;
            &:hover {
              border: 2px solid #3481b4;
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
  .user-list {
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    grid-gap: 20px;
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
</style>