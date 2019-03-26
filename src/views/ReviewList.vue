<template>
  <section class="list-section">

		<!-- add review button -->
    <div class="new-review" v-if="directAndId.direct === 'movie'">
				<button class="btn-add-review" @click="toggleOpenNewReview">
          Add Your Review
        </button>
				<div v-if="isAddOpen">
					<form class="flex flex-col" @submit.prevent="onAddReview">
						<textarea class="textarea-add-review" v-model="newReview.content.txt" rows="6" cols="50"></textarea>
						<button class="btn-send-review" type="submit">Send Review</button>
					</form>
				</div>
		</div>


    <h3>Our Reader's Reaviews</h3>

    <!-- Louder -->
    <div v-if="!reviewsToShow">
      <img src="../assets/img/banana3.gif">
      <img src="../assets/img/banana1.gif">
      <img src="../assets/img/banana2.gif">
    </div>

         
    <ul class="clean-list" v-if="reviewsToShow">
      <li v-for="currReview in reviewsToShow" :key="currReview._id">
        
        <div class="movie-review">

          <div v-if="directAndId.direct === 'movie'" class="user-details flex flex-col">
            <router-link :to="'/user/details/' + currReview.user.userId" class="user-details-link">
              <img :src="currReview.user.userImg">
              {{currReview.user.userName}}
            </router-link>
          
            <div class="likes-btn flex space-center">
              <button @click="clickedLike(currReview._id,currUser)">
                <i class="fas fa-thumbs-up"></i> 
                {{currReview.rate.countLike.length}}
              </button>
              
              <button @click="clickedDislike(currReview._id,currUser)">
                <i class="fas fa-thumbs-down"></i> 
                {{currReview.rate.countDislike.length}}
              </button>
            </div>
          </div>

          <div v-if="directAndId.direct === 'user'" class="movie-details">
            <router-link :to="'/movies/details/' + currReview.movie.movieId">
              <img :src="currReview.movie.movieImg">
              <div>{{currReview.movie.movieName}}</div>
            </router-link>
          </div>
        
          <div class="review-preview">
            <review-preview :review="currReview" @onRemoveReview="removeReview"></review-preview>
          </div>

          <div class="review">
            <div class="div-btn">
              <button v-if="currUser._id===currReview.user.userId" @click="toggleEditReview(currReview)">Edit (Admin)</button>
            </div>
          </div>


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
			// isAddFollower: false,
			// isLoggedIn: false,
			isAddOpen: false,
      isSendReview: false,
      newReview: {
        content: {
          txt: ""
        }
      }
    };
  },
  created() {},
  destroyed() {
    this.$store.commit({
      type: "reviewsModule/setReviews",
      serverReviews: []
    });
  },

  methods: {
		toggleOpenNewReview() {
      this.isAddOpen = !this.isAddOpen;
    },
    
    toggleEditReview(currReview) {
      console.log(currUser._id,)
      currReview.content.isEdit = !currReview.content.isEdit;
      this.$store.dispatch({
        type: "reviewsModule/updateReview",
        updatedReview: currReview
      });
    },
    onAddReview() {
      this.newReview.user = {
        // userId: this.currUser.userId,
        userId: this.currUser._id,
        userImg: this.currUser.userImg,
        userName: this.currUser.name
      };
      this.newReview.movie = {
        // movieId: this.currMovie.movieId,
        movieId: this.currMovie._id,
        movieImg: this.currMovie.details.movieImg,
        movieName: this.currMovie.details.name
      };
      this.newReview.content.isEdit = false;
      this.$store.dispatch({
        type: "reviewsModule/addReview",
        newReview: this.newReview
      });
      this.isAddOpen = false;
      this.isSendReview = true;
      this.newReview = { content: { txt: "" } };
    },

    clickedLike(reviewId, logedInUser) {
      var rateDetails={
         reviewId :reviewId,
         updateUser: logedInUser._id,
         rateDitection : "like"
      }
     this.$store.dispatch({ type: "reviewsModule/updateRate", rateDetails })
    },
    toggleEditReview(currReview) {
      currReview.content.isEdit = !currReview.content.isEdit;
			this.$store.dispatch({ type: "reviewsModule/updateReview", updatedReview: currReview });
		},
    clickedDislike(reviewId,logedInUser) {
      var rateDetails={
         reviewId :reviewId,
         updateUser: logedInUser._id,
         rateDitection : "disLike"
      }
      this.$store.dispatch({ type: "reviewsModule/updateRate", rateDetails })
      
    },

    removeReview(reviewToRemove) {
      var reviewId = reviewToRemove.reviewId;
      this.$store.dispatch({ type: "reviewsModule/removeReview", reviewId, logedInUser });
    }
  },
  computed: {
		
    reviewsToShow() {
      // return this.$store.state.reviewsModule.currReviews;
      return this.$store.getters['reviewsModule/reviews'];
    },
    currMovie() {
      return this.$store.state.moviesModule.currMovie;
    },
    currUser() {
      return this.$store.state.usersModule.currUser;
		},

  },

  watch: {
    directAndId: function(directAndId) {
      if (directAndId) {
        this.$store.dispatch({
          type: "reviewsModule/loadReviews",
          directAndId
        });
      }
    }
  },
  mounted() {},
  components: {
    ReviewPreview
  }
};
</script>

<style scoped>
.list-section{
  max-width: 85%;
  margin: 0 auto;
}
.btn-add-review{
  margin-bottom: 15px;
}
.btn-add-review, .btn-send-review{
  color: white;
  padding: 15px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  outline: none;
  font-family: cursive, arial, serif, sans-serif;
  background-color: #1a1818;
}
.btn-add-review:hover, .btn-send-review:hover {
  background-color: #3481b4;
}
.textarea-add-review, .btn-send-review{
  margin: 10px; 
  padding: 8px;
}
.btn-send-review{
  width: fit-content;
  padding: 15px;
  margin: 0 auto;
}

h3 {
  margin: 30px 0;
  color: aliceblue;
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
  background-color: #3481b4;
}

/* .list-section ul {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
} */

.clean-list {
  display: flex;
  flex-direction: column;
}
.list-section li{
  width: 100%;
}
.movie-review{
  display: flex;
  border: 2px solid #1a1818;
  background-color: #e6e2d3;
  margin: 10px;
  border-radius: 7px;
}

.user-details {
  width:25%;
  border-right: 0.3px solid #1a1818;
}
.user-details-link{
  margin: 10px;
}

.likes-btn>*{
  padding: 5px;
  margin: 10px 8px 20px 8px;

}

.review-preview{
  width: 100%;
  /* padding: 15px; */
}

</style>
