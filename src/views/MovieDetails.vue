<template>
  <section class="details-section container-movies">
    <div v-if="currMovie" class="movie-details flex">
      <div class="movie-img">
        <img :src="currMovie.details.movieImg">
      </div>
      <!-- <div class="movie-table"> -->
      <div class="movie-info">
        <h1>{{currMovie.details.name}}</h1>

        <p>{{currMovie.details.year}}'s movie, directed by 

          <span v-for="director in currMovie.details.director" :key="director._id">{{director}}
            <span v-if="director !== currMovie.details.director[currMovie.details.director.length-1]">,</span>
          </span>, starred by
          <span v-for="actor in currMovie.details.actors" :key="actor._id"> {{actor}}
            <span v-show="actor !== currMovie.details.actors[currMovie.details.actors.length-1]">,</span>
          </span>

        </p>
        <p>
          {{currMovie.details.description}}
        </p>

        <label>Rate the movie:</label>
        <StarRating :show-rating="false" v-model="selectedRate" :increment="0.5" :star-size="30"></StarRating>
        {{selectedRate}}
      </div>
    </div>

    <!-- CHAT IN CURRENT MOVIE -->
    <movie-chat/>

    <review-list :directAndId="detailsForShowReviews"></review-list>
  </section>
</template>

<script>
import ReviewList from "./ReviewList.vue";
import StarRating from "../components/RatingStars.vue";
import MovieChat from '../components/MovieChat.vue';

export default {
  name: "movieDetails",
  data() {
    return {
      selectedRate: 0
    };
  },
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
          id: this.currMovie._id
        };
        return directAndId;
      } else {
        return { err: "problem in MovieDetails page" };
      }
    },
  },
  watch: {
    selectedRate: function (selectedRate) {
      var rateDetails = {
        movieId: this.currMovie._id,
        rate: this.selectedRate
      }
      console.log('jopa', rateDetails)
      this.$store.dispatch({ type: "moviesModule/updateStarRate", rateDetails })
    }
  },
  methods: {},
  components: {
    ReviewList,
    StarRating,
    MovieChat
  }
};
</script>

<style scoped>
.movie-info{
  text-align: left;
  color: white;
  font-size: 17px;
  }

.movie-details {
  width: fit-content;
  margin-top: 40px;
  margin-bottom: 40px;
}
.movie-img img {
  width: 250px;
  border-radius: 4px;
  margin-right: 26px;
}
label{
  display: block;
  margin-top: 25px;
  font-size: 19px;
}

</style>