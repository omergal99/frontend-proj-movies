<template>
    
  <div v-if="!review.content.isEdit">
    <div class="div-reviews">{{review.content.txt}}</div>
  </div>

  <div v-else>
    <input type="text" class="div-reviews" 
        v-model="review.content.txt"
    >
    <button @click="emitRemoveReview">Delete</button>
  </div>
</template>

<script>
export default {
  name: "reviewPreview",
  props: {
    review: Object
  },
  methods: {
      emitRemoveReview(){
        this.$emit('onRemoveReview', this.review)
      }
  }
};
</script>

<style scoped>
.div-reviews {
  max-width: 75vw;
}
</style>
