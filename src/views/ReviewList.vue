<template>
  <section class="list-section">
    <!-- add-review button -->
    <div class="new-review" v-if="directAndId.direct === 'movie'">
      <button class="btn-add-review" @click="toggleOpenNewReview">Add Your Review</button>
      
      <div v-if="isAddOpen">
        <form class="flex flex-col" @submit.prevent="onAddReview">
          <textarea class="textarea-add-review" v-model="newReview.content.txt" rows="6" cols="50"></textarea>
          <button class="btn-send-review" type="submit">Send Review</button>
        </form>
      </div>
    </div>

    <!-- <h3 v-if="directAndId.direct === 'movie'">{{currMovie.details.name}} Reviews</h3> -->
    <!-- <h3 v-if="directAndId.direct === 'user'" class="reviews-title">Reviews</h3> -->

    <ul class="clean-list" v-if="reviewsToShow">
      <li v-for="currReview in reviewsToShow" :key="currReview._id">
        <div class="movie-review">
          <!-- reviews of the movie -->
          <div v-if="directAndId.direct === 'movie'" class="review-details flex flex-col align-center">
            <router-link :to="'/user/details/' + currReview.user.userId" class="review-details-link flex flex-col">
              <img class="user-img" :src="currReview.user.userImg">    
              <span class="user-name">{{currReview.user.userName}}</span>
            </router-link>
          </div> 

          <!-- reviews of the user -->
          <div v-if="directAndId.direct === 'user'"
            class="review-details stam flex flex-col align-center" >
              <router-link 
                :to="'/movies/details/' + currReview.movie.movieId"
                class="review-details-link flex flex-col" >
                <img class="movie-img" :src="currReview.movie.movieImg">
              </router-link>
          </div>

            <review-preview
              v-if="currUser"
              :review="currReview"
              :currUser="currUser"
              :direct="directAndId.direct"
              @onRemoveReview="removeReview"
              @onEditReview="editReview">
            </review-preview>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import ReviewPreview from "@/components/ReviewPreview.vue";
import { setTimeout } from 'timers';

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
          txt: ""
        }
      },
    };
  },
  created() { },
  destroyed() {
    this.$store.commit({type: "reviewsModule/setReviews",serverReviews: []});
  },

  methods: {
    toggleOpenNewReview() {
      this.isAddOpen = !this.isAddOpen;
    },
    onAddReview() {
      this.newReview.user = {
        userId: this.currUser._id,
        userImg: this.currUser.userImg,
        userName: this.currUser.name
      };
      this.newReview.movie = {
        movieId: this.currMovie._id,
        movieImg: this.currMovie.details.movieImg,
        movieName: this.currMovie.details.name
      };
      this.newReview.content.isEdit = false;
      this.$store.dispatch({type: "reviewsModule/addReview",newReview: this.newReview});
      this.isAddOpen = false;
      this.isSendReview = true;
      this.newReview = { content: { txt: "" } };
    },

    removeReview(reviewToRemove) {
      var reviewId = reviewToRemove._id;
      // console.log(reviewId)
      this.$store.dispatch({ type: "reviewsModule/removeReview", reviewId });
    },
    editReview(reviewToEdit) {
       //console.log('Natalia rev', reviewToEdit)
      this.$store.dispatch({ type: "reviewsModule/updateReviewTxt", reviewToEdit });
    }
  },
  computed: {
    reviewsToShow() {
      return this.$store.getters['reviewsModule/reviews'] ;
    },
    currMovie() {
      return this.$store.state.moviesModule.currMovie;
    },
    currUser() {
      return this.$store.state.usersModule.currUser;
    },
  },
  watch: {
    directAndId: function (directAndId) {
      if (directAndId) {
        this.$store.dispatch({type: "reviewsModule/loadReviews",directAndId});
      }
    }
  },
  mounted() { },
  components: {
    ReviewPreview
  }
};
</script>

<style scoped lang="scss">
.reviews-title {
  text-align: left;
  margin-top: 30;
  margin-bottom: 20px;
}

.btn-add-review{
   margin-bottom: 15px;
}

.btn-add-review, .btn-send-review{
  color: white;
  padding: 8px 10px;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  outline: none;
  background-color: #1a1818;
  transition: 0.3s;
}

.btn-add-review:hover, .btn-send-review:hover {
  background-color: #3481b4;
}

.textarea-add-review,{
  margin: 10px; 
}

.btn-send-review{
  width: fit-content;
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: 10px;
}

h3 {
  margin: 30px 0;
  color: aliceblue;
}
.movie-img{
  width: 120px;
}
.clean-list {
  display: flex;
  flex-direction: column;
}
.list-section li {
  width: 100%;
}
.movie-review {
  display: flex;
  border: 2px solid #2d2f31;
  background-color: #e6e2d3;
  border-radius: 4px;
  margin-bottom: 20px;
  
}
 
.review-details {
  border-right: 0.3px solid #ced0d2;
}

.review-details-link{
  margin: 10px;
  
}

.user-name, .movie-name{
  margin-top: 10px;
}

.user-img{
  object-fit: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

</style>
