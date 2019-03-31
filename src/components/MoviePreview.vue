<template>
  <section class="movie">
    <div class="movie-poster">
      <img :src="movie.details.movieImg">
    </div>
    <div class="movie-details">
      <div class="movie-name">{{movie.details.name}}</div>
      <div class="movie-year">({{movie.details.year}})</div>
      <div class="movie-rating">
        <i class="fas fa-star"></i>
        {{movie.avgRank}}/5
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'moviePreview',
  props: {
    movie: Object
  }
}
</script>

<style lang="scss" scoped>
.movie {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.movie-details {
  margin-top: 10px;
}
.movie-name,
.movie-year,
.movie-rating {
  // margin: 10px auto;
  width: 134px;
  overflow-wrap: break-word;
  overflow: hidden;
  color: aliceblue;
}

.movie-poster {
  width: 100%;
  object-fit: cover;
  img {
    transition: transform 0.4s;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
