<template>
  <section class="movie">
    <div class="movie-poster">
       <img :src="movie.details.movieImg">
    </div>
    <div class="movie-details">
      <div class="movie-name">{{movie.details.name}}</div>
      <div class="movie-year">({{movie.details.year}})</div>
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

  .movie{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .movie-details{
    margin-top: 10px;
  }
  .movie-name, .movie-year{
    // margin: 10px auto;
    width: 134px;
    overflow-wrap: break-word;
    overflow: hidden;
    color: aliceblue;
  }

  .movie-poster {
    overflow: hidden;
    margin: 0 auto;

    img{
      transition: transform .4s;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }


</style>
