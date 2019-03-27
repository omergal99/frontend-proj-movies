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


    <h3 v-if="directAndId.direct === 'movie'">{{currMovie.details.name}} Reaviews</h3>
    <h3 v-if="directAndId.direct === 'user'" class="reviews-title">Reviews</h3>

    <!-- Loader -->
    <div v-if="!reviewsToShow">
      <img src="../assets/img/banana3.gif">
      <img src="../assets/img/banana1.gif">
      <img src="../assets/img/banana2.gif">
    </div>

         
    <ul class="clean-list" v-if="reviewsToShow">
      <li v-for="currReview in reviewsToShow" :key="currReview._id">
        <div class="movie-review">

          <!-- reviews of the movie -->
          <div v-if="directAndId.direct === 'movie'" class="review-details flex flex-col align-center">
            <router-link :to="'/user/details/' + currReview.user.userId" class="review-details-link">
              <img :src="currReview.user.userImg">
              {{currReview.user.userName}}
            </router-link>
          
            <div class="likes-btn flex">
              <button @click="clickedLike(currReview._id,currUser)">
                <i class="fas fa-thumbs-up"></i>
                <span>{{currReview.rate.countLike.length}}</span>
              </button>
              
              <button @click="clickedDislike(currReview._id,currUser)">
                <i class="fas fa-thumbs-down"></i> 
                <span>{{currReview.rate.countDislike.length}}</span>
              </button>
            </div>
          </div>

          <!-- reviews of the user -->
          <div v-if="directAndId.direct === 'user'" class="review-details flex flex-col align-center">
            <router-link :to="'/movies/details/' + currReview.movie.movieId" class="review-details-link">
              <img :src="currReview.movie.movieImg">
              <div>{{currReview.movie.movieName}}</div>
            </router-link>
          </div>
        
        <div>
           <review-preview
          :review="currReview" 
          v-if="currUser" :currUser="currUser"
          @onRemoveReview="removeReview"
          @onEditReview="editReview"></review-preview>
        </div>

        <!-- <div class="review">
          <div class="div-btn">
            <button v-if="currUser._id===currReview.user.userId" @click="toggleEditReview(currReview)">Edit (Admin)</button>
          </div>
        </div> -->
          <!-- <div class="review-preview" >
              <button 
                class="btn-edit-review"
                v-if="currUser._id===currReview.user.userId" 
                @click="toggleEditReview(currReview)">
                <i class="fas fa-pencil-alt"></i>
              </button>           
              <review-preview :review="currReview" @onRemoveReview="removeReview"></review-preview>
          </div> -->

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
    
    // toggleEditReview(currReview) {
    //   console.log(currUser._id,)
    //   currReview.content.isEdit = !currReview.content.isEdit;
    //   this.$store.dispatch({
    //     type: "reviewsModule/updateReview",
    //     updatedReview: currReview
    //   });
    // },
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
    // toggleEditReview(currReview) {
    //   currReview.content.isEdit = !currReview.content.isEdit;
		// 	this.$store.dispatch({ type: "reviewsModule/updateReview", updatedReview: currReview });
		// },
    clickedDislike(reviewId,logedInUser) {
      var rateDetails={
         reviewId :reviewId,
         updateUser: logedInUser._id,
         rateDitection : "disLike"
      }
      this.$store.dispatch({ type: "reviewsModule/updateRate", rateDetails })
      
   },

    removeReview(reviewToRemove) {
      var reviewId = reviewToRemove._id;
      console.log(reviewId)
      this.$store.dispatch({ type: "reviewsModule/removeReview", reviewId});
    },

    editReview(reviewToEdit){
      console.log('Natalia rev',reviewToEdit )
     //var reviewId = reviewToEdit.reviewId;
      this.$store.dispatch({ type: "reviewsModule/updateReviewTxt", reviewToEdit});
    }
  },
  computed: {
		
    reviewsToShow() {
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
.reviews-title{
  text-align: left;
}
.btn-add-review{
  margin-bottom: 15px;
}
.btn-add-review, .btn-send-review, .btn-edit-review{
  color: white;
  padding: 15px;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  outline: none;
  font-family: cursive, arial, serif, sans-serif;
  background-color: #1a1818;
  transition: 0.3s;
}
.btn-edit-review{
  height: fit-content;
  padding: 5px 8px;
  margin: 5px 5px 0 0;
  float: right;
  background-color: #2d2f31;
  transition: 0.3s;
}
.btn-add-review:hover, .btn-send-review:hover, .btn-edit-review:hover {
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

.clean-list {
  display: flex;
  flex-direction: column;
}
.list-section li{
  width: 100%;
}
.movie-review{
  display: flex;
  border: 2px solid #2d2f31;;
  background-color: #e6e2d3;
  border-radius: 4px;
  margin-bottom: 20px;
}

.review-details{
  width:25%;
  border-right: 0.3px solid #ced0d2;;
}
.review-details-link{
  margin: 10px;
}

.likes-btn>*{
  padding: 5px;
  margin: 2px;
  color: #2d2f31;
  border: none;
  background-color: #dac292;
  max-width: 50px;
  border-radius: 3px;
}
.likes-btn>*:hover{
  background-color: #3481b4;
}
.review-preview{
  width: 100%;
}

</style>
