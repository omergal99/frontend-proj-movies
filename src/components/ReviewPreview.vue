<template>
  <div>
    <div class="div-reviews">{{txt}}</div>

    <input type="text" class="div-reviews" v-if="isEditOpen" v-model="txt">
    <button v-if="!isEditOpen" @click="toggleEditReview(review)">Edit</button>
    <button v-if="isEditOpen" @click="emitSaveReview">Save</button>
    <button v-if="isEditOpen" @click="cancelEditReview(review)">Cancel</button>
    <button @click="emitRemoveReview">Delete All</button>
  </div>
  <!-- <section>

    <div v-if="!review.content.isEdit" class="div-reviews">
      <a >{{review.content.txt}}</a>
    </div>
    
    <div v-else class="edit-review">
      <input type="text" class="div-reviews" 
          v-model="review.content.txt">
      
      <button @click="emitRemoveReview">Delete All</button>
    </div>

  </section> -->
</template>

<script>
export default {
  name: "reviewPreview",
  props: {
    review: Object
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
  }
};
</script>

<style scoped>

section{
  padding: 10px;
  float: left;
}

</style>
