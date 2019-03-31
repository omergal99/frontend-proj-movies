<template>
  <div>
    <div class="rate" v-if="currUser._id===review.user.userId">
      <div class="rate">
        <i class="fas fa-thumbs-up"></i>
        <span>{{review.rate.countLike.length}}</span>
      </div>
      <div>
        <i class="fas fa-thumbs-down"></i>
        <span>{{review.rate.countDislike.length}}</span>
      </div>
    </div>

    <div class="div-reviews">{{txt}}</div>

    <input type="text" class="div-reviews" v-if="isEditOpen" v-model="txt">
    <div v-if="currUser._id===review.user.userId">
      <button v-if="!isEditOpen" class="btn" @click="toggleEditReview(review)">
        <i class="fas fa-pencil-alt"></i>
      </button>
      <button v-if="isEditOpen" class="btn" @click="emitSaveReview">
        <i class="far fa-save"></i>
      </button>
      <button v-if="isEditOpen" class="btn" d @click="cancelEditReview(review)">
        <i class="far fa-window-close"></i>
      </button>
      <button @click="emitRemoveReview" class="btn">
        <i class="far fa-trash-alt"></i>
      </button>
    </div>
    <ul class="share-social">
      <li>
        <a title="share" href="https://www.facebook.com/sharer/sharer.php?u=">
          <i class="fab fa-facebook-square facebook-logo"></i>
        </a>
      </li>
      <!-- <li >
                <a href="https://www.linkedin.com/in/"><i class="fab fa-linkedin linkedin-logo"></i></a>
              </li>
              <li>
                <a href="https://github.com/"><i class="fab fa-github github-logo"></i></a>
      </li>-->
    </ul>
  </div>
</template>

<script>
export default {
  name: "reviewPreview",
  props: {
    review: Object,
    currUser: Object
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
    }
  },
  created() {}
};
</script>

<style scoped>
section {
  padding: 10px;
  float: left;
}
.div-reviews {
  padding: 10px;
}
.btn {
  height: fit-content;
  padding: 5px 8px;
  margin: 5px 5px 0 0;
  float: right;
  background-color: #2d2f31;
  transition: 0.3s;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  outline: none;
  font-family: cursive, arial, serif, sans-serif;
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
</style>
