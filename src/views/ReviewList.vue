<template>
  <section class="list-section">
    <h3>Reviews</h3>
    <ul class="clean-list" v-if="reviews">
      <li v-for="currreview in reviews" :key="currreview._id">

        <div class="div-reviews">
          {{currreview.content.txt}}
        </div>

        <div class="div-btn">
          <router-link :to="'/movies/edit/' + currreview._id">
            <button>Edit (Admin)</button>
          </router-link>

          <router-link :to="'/movies/details/' + currreview._id">
            <button>See Person</button>
          </router-link>
        </div>
      </li>
    </ul>

    <div v-if="directAndId">
    {{directAndId}}
    </div>
  </section>
</template>

<script>
export default {
  name: "reviewList",
  props: {
    directAndId: Object
  },
  data() {
    return {};
  },
  created() {
    if (this.directAndId) {
      console.log('THere is a directAndId')
      if (this.directAndId.direct === "movie") {
        const movieId = this.directAndId.id;
        this.$store.dispatch({ type: "reviewsModule/loadReviews", directAndId: this.directAndId });
      }
    }
  },
  destroyed() {
    this.$store.commit({ type: "reviewsModule/setReviews", serverReviews: null });
  },
  methods: {},
  computed: {
    reviews() {
      console.log('reviews',this.$store.state.reviewsModule.currReviews)
      return this.$store.state.reviewsModule.currReviews;
    },
  },
  mounted() {},
  components: {}
};
</script>

<style scoped>
.div-reviews {
  max-width: 75vw;
}

h3 {
  margin: 0 0 6px 0;
}
.div-btn {
  margin: 6px 0 0 0;
}
.div-btn button {
  margin: 0 6px 0 0;
}

.list-section ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.list-section li {
  height: 100px;
  width: 75vw;
  list-style: none;
  border: 1px solid rgb(119, 105, 27);
  margin: 0 8px 6px 0;
  padding: 4px;
  border-radius: 4px;
}

.clean-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
