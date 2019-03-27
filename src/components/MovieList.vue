<template>
  <section>
    <h3>Movie List</h3>

      <transition-group name="list" class="movie-list" tag="ul">
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
  // el: '#list-demo',
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

h3 {
  margin: 0 0 6px 0;
}

.movie-list {
  margin: 0 0 0 8px;
  list-style-type: none;
  padding: 0;
}

.movie-list {
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.movie-list li {
  // width: 180px;
  margin: 0 auto;
  // padding: 10px;
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
@media (min-width: 1000px) {
  .movie-list {
    grid-template-columns: repeat(6, 1fr);
  }
}
@media (min-width: 600px) and (max-width: 1000px) {
  .movie-list {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (min-width: 450px) and (max-width: 600px) {
  .movie-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
