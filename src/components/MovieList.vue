<template>
  <section class="list-section">
    <h3>Movie List</h3>

    <ul class="ul-movies-list">
      <li v-for="currMovie in movies" :key="currMovie.movieId">
        <router-link :to="'/movies/details/' + currMovie._id">
          <movie-preview :movie="currMovie"></movie-preview>
        </router-link>
      </li>
    </ul>

  </section>
</template>

<script>
import MoviePreview from "@/components/MoviePreview.vue";

export default {
  name: "movieList",
  props: {
    movies: Array
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {},
  mounted() {},
  components: {
    MoviePreview
  }
};
</script>

<style lang="scss">
.ul-movies-list {
  margin: 0 0 0 8px;
  list-style-type: none;
  padding: 0;
}

h3 {
  margin: 0 0 6px 0;
}

.list-section ul {
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.list-section li {
  // width: 180px;
  margin: 0 auto;
  // padding: 10px;
  list-style: none;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
}
.list-section li:hover img {
  transform: scale(1.1);
}

.clean-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
@media (min-width: 1000px) {
  .list-section ul {
    grid-template-columns: repeat(6, 1fr);
  }
}
@media (min-width: 600px) and (max-width: 1000px) {
  .list-section ul {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (min-width: 450px) and (max-width: 600px) {
  .list-section ul {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
