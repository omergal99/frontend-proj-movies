<template>
  <section class="list-section">
    <h3>Reviews</h3>

    <div class="new-review">
      <button class="margin-bottom6" @click="toggleOpenNewReview">Add Review</button>
      <div v-if="isAddOpen">
        <form class="flex flex-col" @submit.prevent="onAddReview">
          <textarea class="margin-bottom6" v-model="newReview.content.txt" rows="6" cols="50"></textarea>
          <button class="margin-bottom6" type="submit">Send Review</button>
        </form>
      </div>
    </div>

    <!-- Louder -->
    <div v-if="!reviewsToShow">
      <img src="../assets/img/banana3.gif">
      <img src="../assets/img/banana1.gif">
      <img src="../assets/img/banana2.gif">
    </div>

    <ul class="clean-list" v-if="reviewsToShow">
      <li v-for="currReview in reviewsToShow" :key="currReview._id">

        <div v-if="directAndId.direct === 'movie'" class="user-details">
          <router-link :to="'/user/details/' + currReview.user.userId">
            <img height="50px" :src="currReview.user.userImg">
            {{currReview.user.userName}}
          </router-link>
        </div>
        <div v-if="directAndId.direct === 'user'" class="movie-details">
          <router-link :to="'/movies/details/' + currReview.movie.movieId">
            <img height="50px" :src="currReview.movie.movieImg">
            {{currReview.movie.movieName}}
          </router-link>
        </div>

        <review-preview :review="currReview" @onRemoveReview="removeReview"></review-preview>

        <div class="review">
          <div class="div-btn">
            <button @click="toggleEditReview(currReview)">Edit (Admin)</button>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import ReviewPreview from "@/components/ReviewPreview.vue";

export default {
  name: "reviewList",
  props: {
    directAndId: Object
  },
  data() {
    return {
      isAddOpen: false,
      isSendReview: false,
      newReview: {
        content: {
          txt: "",
        }
      }
    }
  },
  created() { },
  destroyed() {
    this.$store.commit({ type: "reviewsModule/setReviews", serverReviews: null });
  },
  methods: {
    toggleOpenNewReview() {
      this.isAddOpen = !this.isAddOpen;
    },
    toggleEditReview(currReview) {
      currReview.content.isEdit = !currReview.content.isEdit;
      this.$store.dispatch({ type: "reviewsModule/updateReview", updatedReview: currReview });
    },
    onAddReview() {
      this.newReview.user = { userId: this.currUser.userId };
      this.newReview.movie = { movieId: this.currMovie.movieId };
      this.newReview.content.isEdit = false;
      this.$store.dispatch({ type: "reviewsModule/addReview", newReview: this.newReview });
      this.isAddOpen = false;
      this.isSendReview = true;
      this.newReview = { content: { txt: "" } };
    },
    removeReview(reviewToRemove) {
      var reviewId = reviewToRemove.reviewId;
      this.$store.dispatch({ type: "reviewsModule/removeReview", reviewId });
    }
  },
  computed: {
    reviewsToShow() {
      return this.$store.state.reviewsModule.currReviews;
    },
    currMovie() {
      return this.$store.state.moviesModule.currMovie;
    },
    currUser() {
      return this.$store.state.usersModule.currUser;
    }
  },
  watch: {
    directAndId: function (directAndId) {
      if (directAndId) {
        this.$store.dispatch({ type: "reviewsModule/loadReviews", directAndId });
      }
    }
  },
  mounted() { },
  components: {
    ReviewPreview
  }
};
</script>

<style scoped>
.new-review button {
  cursor: pointer;
  border: none;
  color: white;
  border-radius: 4px;
  outline: none;
  font-family: cursive, arial, serif, sans-serif;
  background-color: rgb(52, 180, 94);
  font-size: 0.8em;
  padding: 8px 4px;
  transition: background-color 0.3s;
}
.new-review button:hover {
  background-color: rgb(55, 190, 100);
}

.margin-bottom6 {
  margin-bottom: 6px;
}
.new-review {
  margin: 0 auto 6px auto;
  max-width: 80vw;
}

h3 {
  margin: 0 0 6px 0;
}
.div-btn {
  margin: 6px 0 0 0;
}
.div-btn button {
  margin: 0 6px 0 0;
  cursor: pointer;
  border: none;
  color: rgb(39, 39, 39);
  font-weight: bold;
  border-radius: 4px;
  outline: none;
  font-family: cursive, arial, serif, sans-serif;
  background-color: rgb(52, 180, 163);
  font-size: 0.8em;
  padding: 8px 4px;
  transition: background-color 0.3s;
}
.div-btn button:hover {
  background-color: rgb(55, 190, 170);
}

.list-section ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.list-section li {
  height: 100px;
  width: 75vw;
  list-style: none;
  font-size: 1.1em;
  background-color: #80ced6;
  color: rgb(39, 39, 39);
  margin: 0 8px 6px 0;
  padding: 4px;
  border-radius: 4px;
}

.clean-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.user-details {
  width: 15%;
}
.movie-details {
  width: 150px;
}

.review {
  width: 85%;
}
</style>
