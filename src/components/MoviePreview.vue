<template>
  <section>
    <img :src="movie.details.movieImg">
    <div class="movie-name">{{movie.details.name}}</div>
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

<style scoped>
h3 {
  margin: 0 0 6px 0;
}
.movie-name{
  margin: 0 auto;
  max-width: 100%;
  overflow-wrap: break-word;
  height: 40px;
  overflow: hidden;
  color: aliceblue;
}
img{
  max-height: 200px;
}
</style>
