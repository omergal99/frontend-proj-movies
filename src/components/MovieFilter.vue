<template>
  <section>

    <div class="filter-container flex space-center">

      <select class="filter-category" @change="emitFilter" v-model="filterBy.category">
        <option value>Category</option>
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        <option value="srama">Drama</option>
        <option value="family">Family</option>
        <option value="horror">Horror</option>
        <option value="romance">Romance</option>
      </select>

      <input
        class="filter-input"
        type="text"
        placeholder="Find Movie By Name"
        @input="emitFilter"
        v-model="filterBy.name">

      <div class="filter-search flex space-center align-center">
          <span><i class="fas fa-search"></i></span>
      </div>

    </div>
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
    'filterBy.isNew': function (val, oldVal) {
      this.emitFilter();
    }
  }
};
</script>

<style lang="scss">

.filter-category, .filter-input{
  color: #1a1818;
  padding: 10px;
  width: 250px;
  height: 50px;
  border: none;
  font-size: 20px;
  box-shadow: 0 5px 25px rgb(52, 129, 180);
  outline: none;
  margin: 40px 20px;
  
}
.filter-search{
  width: 50px;
  height: 50px;
  margin: 40px 20px;
  padding: 10px;
  border: none;
  outline: none;
  box-shadow: 0 5px 25px rgb(52, 129, 180);
  cursor: pointer;
}

.fa-search{
  color: white;
  font-size: 18px;
  background-color: #2d2f31;
}

</style>
