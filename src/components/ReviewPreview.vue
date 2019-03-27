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
/* .edit-review input{
  border-radius: 2px;
  padding: 2px 8px 2px 8px;
  background-color: rgb(190, 218, 241);
  border: none;
  font-size: 0.9em;
  font-family: cursive, arial, serif, sans-serif;
  margin-right: 6px;
}

.edit-review button {
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
} */
</style>
