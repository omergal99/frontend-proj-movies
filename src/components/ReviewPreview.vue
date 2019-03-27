<template>
  <section>

    <div v-if="!review.content.isEdit" class="div-reviews">
      <a >{{review.content.txt}}</a>
    </div>
    
    <div v-else class="edit-review">
      <input type="text" class="div-reviews" 
          v-model="review.content.txt">
      
      <button @click="emitRemoveReview">Delete All</button>
    </div>

  </section>
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
  },
};
</script>

<style scoped>

section{
  padding: 10px;
  float: left;
}
</style>
