<template>
  <section>
    <h3>Review Filter</h3>

    <select @change="emitFilter" v-model="filterBy.category">
      <option value>Category</option>
      <option value="action">Action</option>
      <option value="comedy">Comedy</option>
      <option value="srama">Drama</option>
      <option value="family">Family</option>
      <option value="horror">Horror</option>
      <option value="romance">Romance</option>
    </select>
    
    <input type="checkbox" v-model="filterBy.isNew">
    New!

    <input
      type="text"
      placeholder="Find Movie By Name"
      @input="emitFilter"
      v-model="filterBy.name"
    >
    
    <select @change="emitFilter" v-model="filterBy.sort">
      <!-- <option value>Sort</option> -->
      <option value="topRated">Top Rated</option>
      <option value="createdAt">Created At</option>
      <option value="name">Name</option>
      <option value="year">Year</option>
    </select>
    
    <button title="Search" @click="emitFilter">🍭</button>

  </section>
</template>

<script>
export default {
  name: 'reviewFilter',
  props: {},
  data() {
    return {
      filterBy: {
        name: '',
        category: '',
        isNew: false,
        sort: 'topRated'
      }
    };
  },
 methods: {
    emitFilter() {
      var copyFilter = JSON.parse(JSON.stringify(this.filterBy));
      this.$emit('filterd', copyFilter);
    }
  },
  watch: {
    'filterBy.isNew': function(val, oldVal) {
      this.emitFilter();
    }
  }
};
</script>

<style scoped>
h3 {
  margin: 0 0 6px 0;
}
</style>
