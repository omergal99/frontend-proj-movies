<template>
  <section class="movie">
    <div class="movie-poster">
       <img :src="movie.details.movieImg">
    </div>
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

<style lang="scss" scoped>

  h3 {
    margin: 0 0 6px 0;
  }
  .movie-name{
    margin: 10px auto;
    // max-width: 100%;
    width: 134px;
    overflow-wrap: break-word;
    // height: 40px;
    overflow: hidden;
    color: aliceblue;
  }

  .movie-poster {
    height: 200px;
    width: 134px;
    overflow: hidden;
    margin: 0 auto;

    img{
      transition: transform .3s;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }


</style>
