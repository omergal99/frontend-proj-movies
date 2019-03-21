<template>
  <section>
    <h2>We Now at MOVIES GALERY</h2>

    <movie-list :movies="moviesToShow"></movie-list>
  </section>
</template>

<script>
import MovieList from '@/components/MovieList.vue';

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

  },
  components: {
    MovieList
  }
};
</script>

<style scoped>
h2 {
  color: steelblue;
  margin: 6px 0 6px 0;
}
</style>