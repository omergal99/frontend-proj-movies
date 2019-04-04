<template>
  <section class="list-section container-movies">

    <transition-group name="list" class="clean-list" tag="ul">

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

.list-section ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 26px;
}

.list-section li {
  margin: 0 auto;
  list-style: none;
  border-radius: 4px;
//background-size: cover;
//object-fit: cover;
  text-decoration: none;
  .movie-poster img:hover  {
    transform: scale(1.05);
  }
}
</style>
