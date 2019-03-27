<template>
  <div>
    <div class="div-reviews">{{txt}}</div>

    <input type="text" class="div-reviews" v-if="isEditOpen" v-model="txt">
    <button v-if="!isEditOpen" @click="toggleEditReview(review)">Edit</button>
    <button v-if="isEditOpen" @click="emitSaveReview">Save</button>
    <button v-if="isEditOpen" @click="cancelEditReview(review)">Cancel</button>
    <button @click="emitRemoveReview">Delete All</button>
  </div>
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
.edit-Review input {
  border-radius: 2px;
  padding: 2px 8px 2px 8px;
  background-color: rgb(190, 218, 241);
  border: none;
  font-size: 0.9em;
  font-family: cursive, arial, serif, sans-serif;
  margin-right: 6px;
}

.edit-Review button {
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 4px;
  font-family: cursive, arial, serif, sans-serif;
  font-size: 0.9em;
  padding: 2px 8px 2px 8px;
  transition: background-color 0.3s;
  background-color: rgb(180, 52, 52);
  margin-bottom: 6px;
}

.edit-Review button:hover {
  background-color: rgb(163, 47, 47);
}
.div-reviews {
  max-width: 75vw;
}
</style>
