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
      <div class="rank" title="Rated by this user" v-if=review.curmovie>{{review.curmovie.rank}}<i class="fas fa-star"></i></div>
      <i class="fas fa-thumbs-up" title="Like"></i><span class="numOfLikes">{{review.rate.countLike.length}} &nbsp;</span>
      <i class="fas fa-thumbs-down" title="Dislike"></i><span class="numOfDislikes">{{review.rate.countDislike.length}}</span>
      <a title="Share" href="https://www.facebook.com/sharer/sharer.php?u=">
        &nbsp;&nbsp;<i class="fab fa-facebook-square"></i>
      </a>
    </div>

  </div>

    <div v-if="currUser._id===review.user.userId" class="flex space-end">
      
      
      
      <button v-if="!isEditOpen" class="btn" title="Edit" @click="toggleEditReview(review)"><i class="fas fa-pencil-alt"></i></button>
      <button v-if="isEditOpen" title="Save"  class="btn" @click="emitSaveReview"><i class="far fa-save"></i></button>
      <button v-if="isEditOpen" title="Cancel"  class="btn" @click="cancelEditReview(review)"><i class="far fa-window-close"></i></button>
      <button @click="emitRemoveReview" title="Delete" class="btn"><i class="far fa-trash-alt"></i></button>
    </div>
    <input type="text" class="div-reviews" v-if="isEditOpen" v-model="txt">
 


    <!-- show less than 300 symbols -->
    <div class="div-reviews" v-if="notFullReview">{{shortTxt}}
      <div @click.stop="toggleFullReview" v-if="txt.length > 298" class="full-review">Read more</div>
    </div>
    <div class="div-reviews" v-else>{{txt}} 
      <div @click.stop="toggleFullReview" class="full-review">... Read Less</div>
    </div>
      
      
    <div class="likes-btn flex" v-if="direct === 'movie'">
      <a title="share" href="https://www.facebook.com/sharer/sharer.php?u=">
      <i class="fab fa-facebook-square facebook-logo"></i>
    </a>
      <button @click="clickedLike(review._id,currUser)"><i class="fas fa-thumbs-up"></i><span>{{review.rate.countLike.length}}</span></button>
      <button @click="clickedDislike(review._id,currUser)"><i class="fas fa-thumbs-down"></i><span>{{review.rate.countDislike.length}}</span></button>
    </div>
   
    <!-- <a title="share" href="https://www.facebook.com/sharer/sharer.php?u=">
      <i class="fab fa-facebook-square facebook-logo"></i>
    </a> -->
   
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
      tempTxt: null,
      notFullReview: true,
      txt: this.review.content.txt      
    };
  },
  computed: {
    shortTxt(){
      var shortTxt = this.txt;
      if (shortTxt.length > 300) {
        return shortTxt.substring(0,299)
      } else {
          return shortTxt
      }
    },
// movieStars(){
//   var movieRview=this.review 
//   console.log()
// }

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
    toggleFullReview(){
      this.notFullReview = !this.notFullReview;
    }
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
.full-review{
  margin: 10px 0;
  /* font-weight: 500; */
  font-size: 1.2em;

}
.full-review:hover{
  color: #3481b4;
}

.likes-btn > * {
  width: 50px;
  padding: 5px;
  margin: 2px;
  color: #2d2f31;
  border: none;
  background-color: #dac292;
  /* max-width: 50px; */
  border-radius: 3px;
  cursor: pointer;
}
.likes-btn > *:hover {
  background-color: #3481b4;
}
.likes i{
  cursor: auto;
}
.fa-facebook-square{
  cursor: pointer;
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
.rate {
  float: right;
  display: flex;
  padding: 5px;
}

ul .share-social {
  list-style: none;
  display: flex;
}
.fas{
  cursor: pointer;
}
.fa-star{
  /* cursor: none; */
  color:#ffd055;
  padding-right:10px 
}

</style>
