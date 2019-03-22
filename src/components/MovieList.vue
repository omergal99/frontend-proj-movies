<template>
  <section class="list-section">
    <h3>Movie List</h3>
    <ul class="clean-list">
      <li v-for="currMovie in movies" :key="currMovie.movieId">
        <movie-preview :movie="currMovie"></movie-preview>

        <div class="div-btn">
          <router-link :to="'/movies/edit/' + currMovie.movieId">
            <button>Edit (Admin)</button>
          </router-link>

          <router-link :to="'/movies/details/' + currMovie.movieId">
            <button>See More</button>
          </router-link>
        </div>
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

h3 {
  margin: 0 0 6px 0;
}
.div-btn {
  margin: 6px 0 0 0;
}

.div-btn button {
  margin: 0 6px 0 0;
  cursor: pointer;
  border: none;
  color: white;
  border-radius: 4px;
  outline: none;
  font-family: cursive, arial, serif, sans-serif;
  background-color: rgb(52, 129, 180);
  font-size: 0.8em;
  padding: 8px 4px;
  transition: background-color 0.3s;
}
.div-btn button:hover {
  background-color: rgb(55, 140, 190);
}

.list-section ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.list-section li {
  height: 300px;
  width: 300px;
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
