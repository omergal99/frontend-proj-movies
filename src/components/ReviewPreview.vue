<template>
  <div class="review-container" >
    <div class="flex space-between">
      <router-link
        v-if="direct === 'user'"
        :to="'/movies/details/' + review.movie.movieId"
        class="review-details-link flex flex-col">
        <span class="movie-name">{{review.movie.movieName}}</span>
      </router-link>
  
    <div class="likes flex" v-if="direct === 'user'">
      <i class="fas fa-thumbs-up"></i><span class="numOfLikes">{{review.rate.countLike.length}} &nbsp;</span>
      <i class="fas fa-thumbs-down"></i><span class="numOfDislikes">{{review.rate.countDislike.length}}</span>
    </div>
  </div>

    <div v-if="currUser._id===review.user.userId" class="flex space-end">
      <button v-if="!isEditOpen" class="btn" @click="toggleEditReview(review)"><i class="fas fa-pencil-alt"></i></button>
      <button v-if="isEditOpen" class="btn" @click="emitSaveReview"><i class="far fa-save"></i></button>
      <button v-if="isEditOpen" class="btn" d @click="cancelEditReview(review)"><i class="far fa-window-close"></i></button>
      <button @click="emitRemoveReview" class="btn"><i class="far fa-trash-alt"></i></button>
    </div>
    <input type="text" class="div-reviews" v-if="isEditOpen" v-model="txt">
 


      <div class="div-reviews">{{txt}}</div>
    
      

    

    <div class="likes-btn flex" v-if="direct === 'movie'">
      <button @click="clickedLike(review._id,currUser)"><i class="fas fa-thumbs-up"></i><span>{{review.rate.countLike.length}}</span></button>
      <button @click="clickedDislike(review._id,currUser)"><i class="fas fa-thumbs-down"></i><span>{{review.rate.countDislike.length}}</span></button>
    </div>

     
    
  </div>
</template>

<script>
export default {
  name: "reviewPreview",
  props: {
    review: Object,
    currUser: Object,
    direct: String
  },
  data() {
    return {
      isEditOpen: false,
      txt: this.review.content.txt,
      tempTxt: null
    };
  },
  methods: {
    emitRemoveReview() {
      console.log("this review", this.review);
      this.$emit("onRemoveReview", this.review);
    },
    emitSaveReview() {
      this.isEditOpen = !this.isEditOpen;
      this.review.content.txt = this.txt;
      this.$emit("onEditReview", this.review);
    },
    toggleEditReview(currReview) {
      this.isEditOpen = !this.isEditOpen;
      this.tempTxt = this.txt;
    },
    cancelEditReview(review) {
      this.isEditOpen = !this.isEditOpen;
      this.txt = this.tempTxt;
    },
    clickedLike(reviewId, logedInUser) {
      var rateDetails = {
        reviewId: reviewId,
        updateUser: logedInUser._id,
        rateDitection: "like"
      }
      this.$store.dispatch({ type: "reviewsModule/updateRate", rateDetails })
    },
    clickedDislike(reviewId, logedInUser) {
      var rateDetails = {
        reviewId: reviewId,
        updateUser: logedInUser._id,
        rateDitection: "disLike"
      }
      this.$store.dispatch({ type: "reviewsModule/updateRate", rateDetails })
    },
  },
  created() {}
};
</script>

<style scoped>

.review-container{
  text-align: left;
  color: #1a1818;
  padding: 10px;
  width: 100%;
}
a{
  color: #1a1818;
  font-size: 20px;
}
.div-reviews {
  margin-top: 10px;
}
.likes-btn > * {
  padding: 5px;
  margin: 2px;
  color: #2d2f31;
  border: none;
  background-color: #dac292;
  /* max-width: 50px; */
  border-radius: 3px;
}
.likes-btn > *:hover {
  background-color: #3481b4;
}
.btn {
  padding: 5px 8px;
  margin: 5px 5px 0 0;
  background-color: #2d2f31;
  transition: 0.3s;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  outline: none;
  transition: 0.3s;
}
.btn:hover {
  background-color: #3481b4;
}
.rate{
    float: right;
    display:flex;
    padding: 5px;
    
}

</style>
