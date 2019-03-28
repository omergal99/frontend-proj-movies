<template>
  <div>
    <div class="div-reviews">{{txt}}</div>

    <input type="text" class="div-reviews" v-if="isEditOpen" v-model="txt">
    <div v-if="currUser._id===review.user.userId">
      <button v-if="!isEditOpen" 
        class="btn" 
        @click="toggleEditReview(review)">
        <i class="fas fa-pencil-alt"></i>
      </button>
      <button v-if="isEditOpen" 
        class="btn"
        @click="emitSaveReview">
        <i class="far fa-save"></i>
      </button>
      <button v-if="isEditOpen" 
        class="btn"
        @click="cancelEditReview(review)">
        <i class="far fa-window-close"></i>
      </button>
      <button @click="emitRemoveReview"
        class="btn">
        <i class="far fa-trash-alt"></i>
      </button>
    </div>
  </div>

    
</template>

<script>
export default {
  name: "reviewPreview",
  props: {
    review: Object,
   currUser: Object,
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
      this.$emit("onRemoveReview", this.review);
    },
    emitSaveReview(){
      this.isEditOpen = !this.isEditOpen;
      this.review.content.txt=this.txt
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
  created(){
    // console.log('hhhhh', this.currUser)
  }
  
};
</script>

<style scoped>

section{
  padding: 10px;
  float: left;
}
.btn{
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
</style>
