<template>
  <section class="list-section container-movies">
    <h3>Movie List</h3>

      <transition-group name="list" class="movie-list clean-list" tag="ul">
        <li class="list-item" v-for="currMovie in movies" :key="currMovie._id">
          <router-link :to="'/movies/details/' + currMovie._id">
            <movie-preview :movie="currMovie"></movie-preview>
          </router-link>
        </li>
      </transition-group>
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
  created() { },
  methods: {},
  computed: {},
  mounted() { },
  components: {
    MoviePreview
  }
};
</script>

<style lang="scss">
.list-item {
    display: inline-block;
    margin-right: 10px;
    max-height: 400px;
    overflow: hidden;
}

.ul-movies-list {
  list-style-type: none;
  padding: 0;
}

h3 {
  margin: 0 0 6px 0;
}

.list-section ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 26px;
}

.list-section li {
  margin: 0 auto;
  list-style: none;
  border-radius: 4px;
  text-decoration: none;
}

.movie-list li:hover img {
  transform: scale(1.05);
}

.clean-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
