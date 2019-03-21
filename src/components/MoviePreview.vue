<template>
  <section>
    <h3>{{movie.details.name}}</h3>
    <div>{{movie.details.year}}</div>
    <div>
      <img :src="movie.details.movieImg">
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

<style scoped>
h3 {
  margin: 0 0 6px 0;
}

img{
  max-height: 200px;
}
</style>
