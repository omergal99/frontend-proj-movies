<template>
  <section>

    <div class="filter-container flex space-center wrap">
      <select class="filter-category" @change="emitFilter" v-model="filterBy.category">
        <option value>Category</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Fantacy">Fantacy</option>
        <option value="Thriller">Thriller</option>
        <option value="Documenrary">Documentary</option>
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
  width: 250px;
  height: 50px;
  border: none;
  font-size: 20px;
  outline: none;
  margin: 40px 20px;
  border-radius: 2px;
      padding: 4px 8px;  
}
.filter-search{
  width: 50px;
  height: 50px;
  margin: 40px 20px;
  padding: 10px;
  border: none;
  outline: none;
  background-color: #1a1818;
  cursor: pointer;
  border-radius: 2px;
}

.fa-search{
  color: white;
  font-size: 18px;
  background-color: #1a1818;
}

</style>
