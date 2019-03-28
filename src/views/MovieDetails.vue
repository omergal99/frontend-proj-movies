<template>
  
  <section class="details-section container-movies">

    <div v-if="!currMovie">
      <img src="../assets/img/banana3.gif">
      <img src="../assets/img/banana1.gif">
      <img src="../assets/img/banana2.gif">
    </div>

    <div v-if="currMovie" class="movie-details flex">
      <div class="movie-img">
        <img :src="currMovie.details.movieImg">
      </div>
      <div class="movie-table">
        <table class="details-table">
          <tr>
            <td>Name</td>
            <td>{{currMovie.details.name}}</td>
          </tr>
          <tr>
            <td>Year</td>
            <td>{{currMovie.details.year}}</td>
          </tr>
          <tr>
            <td>Actors</td>
            <td>{{currMovie.details.actors}}</td>
          </tr>
          <tr>
            <td>Director</td>
            <td>{{currMovie.details.director}}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{{currMovie.details.description}}</td>
          </tr>
        </table>
      </div>
    </div>

    <!-- CHAT IN CURRENT MOVIE -->
    <movie-chat/>

    <review-list :directAndId="detailsForShowReviews"></review-list>

  </section>
</template>

<script>
import ReviewList from "./ReviewList.vue";
import axios from "axios";
import MovieChat from '../components/MovieChat.vue';

export default {
  name: "movieDetails",
  created() {
    const movieId = this.$route.params.movieId;
    this.$store.dispatch({ type: "moviesModule/loadMovie", movieId });
  },
  destroyed() {
    this.$store.commit({ type: "moviesModule/setMovie", currMovie: null });
  },
  computed: {
    currMovie() {
      return this.$store.state.moviesModule.currMovie;
    },
    detailsForShowReviews() {
      if (this.currMovie) {
        var directAndId = {
          direct: "movie",
          id: this.currMovie._id,
        };
        return directAndId;
      }else{
        return {err: 'problem in MovieDetails page'}
      }
    }
  },
  methods: {},
  components: {
    ReviewList,
    MovieChat
  }
};
</script>

<style scoped>

.movie-details {
  width: fit-content;
  margin-top: 40px;
  margin-bottom: 40px;
}
.movie-img img{
  width: 250px;;
  border-radius: 4px;
  margin-right: 26px;
}
.movie-table {
  color: rgb(31, 31, 31);
}

.details-table td {
  padding: 5px;
  border: 1px solid #c4b7a6;
  border-radius: 3px;
} 
.details-table td:first-child {
  font-weight: bold;
}
.details-table td:first-child {
  background-color: #dac292;
}
.details-table td:not(:first-child) {
  background-color: #e6e2d3;
}
</style>



// axios.get(`http://www.omdbapi.com/?apikey=b672deef&i=${imdbId}`)
//           .then((res) => {
//               console.log(res.data)
//           })
//           .catch(console.log('error api'))