<template>
  <section>
    <h2>We Now at MOVIES GALERY</h2>

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
    if(!this.$store.state.moviesModule.movies){
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
  color: rgb(9, 39, 63);
  margin: 6px 0 6px 0;
}
</style>