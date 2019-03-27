<template>
  <section class="">
    <h2>The Movie Gallery</h2>

    <movie-filter @filterd="doFilter"></movie-filter>

    <movie-list :movies="moviesToShow"></movie-list>
    
  </section>
</template>

<script>
import MovieList from '@/components/MovieList.vue';
import MovieFilter from '@/components/MovieFilter.vue';

export default {
  name: 'movies',
  data() {
    return {
      
    };
  },
  created() {
    if(!this.$store.state.moviesModule.movies.length){
      this.$store.dispatch({ type: 'moviesModule/loadMovies' });
    }
  },
  computed: {
    moviesToShow() {
      return this.$store.state.moviesModule.movies;
    }
  },
  methods: {
    doFilter(filter) {
      this.$store.dispatch({ type: 'moviesModule/loadMovies', filter });
    }
  },
  components: {
    MovieList,
    MovieFilter
  }
};
</script>

<style scoped>
h2 {
  /* color: rgb(148, 198, 238); */
  color: rgb(255, 255, 255);
  margin: 6px 0 6px 0;
}
</style>