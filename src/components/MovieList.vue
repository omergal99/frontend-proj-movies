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
    return {

    };
  },
  created() {

  },
  methods: {

  },
  computed: {

  },
  mounted() { },
  components: {
    MoviePreview
  }
};
</script>

<style scoped>
.ul-movies-list {
  margin: 0 0 0 8px;
  list-style-type: none;
  padding: 0;
}

h3 {
  margin: 0 0 6px 0;
}

.list-section ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.list-section li {
  width: 180px;
  list-style: none;
  margin: 0 8px 6px 0;
  padding: 4px;
  border-radius: 4px;
  text-decoration:none; 
  transition: background-color .3s
}
.list-section li:hover{
  background-color: rgba(25, 73, 112, 0.4);
}

.clean-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
