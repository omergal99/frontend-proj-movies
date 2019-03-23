<template>
  <section>
    <h3>Movie Filter</h3>

    <div class="main-filter">
      <select class="select-catagory" @change="emitFilter" v-model="filterBy.category">
        <option value>Category</option>
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        <option value="srama">Drama</option>
        <option value="family">Family</option>
        <option value="horror">Horror</option>
        <option value="romance">Romance</option>
      </select>

      <!-- <div class="check-box-is-new">
        <input type="checkbox" v-model="filterBy.isNew">New!
      </div>-->

      <label class="container">
        New!
        <input type="checkbox" checked="checked">
        <span class="checkmark"></span>
      </label>

      <input
        class="search-input"
        type="text"
        placeholder="Find Movie By Name"
        @input="emitFilter"
        v-model="filterBy.name"
      >

      <select class="select-sort" @change="emitFilter" v-model="filterBy.sort">
        <!-- <option value>Sort</option> -->
        <option value="topRated">Top Rated</option>
        <option value="year">Year</option>
        <option value="name">Name</option>
      </select>

      <div class="div-search-btn">
        <button class="search-btn" title="Search" @click="emitFilter">🍭</button>
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

<style scoped>
.container {
  display: inline-block;
  position: relative;
  cursor: pointer;
  font-size: 1em;
  user-select: none;
  margin-left: 6px;
  background-color: #563f46;
  padding: 4px 4px 4px 24px;
  border-radius: 2px;
  transition: background-color .3s;
}
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  transition: background-color .3s;

}
.container:hover input ~ .checkmark {
  background-color: #563f46;
}
.container:hover {
  background-color: #685158;
}
.container input:checked ~ .checkmark {
  background-color: #563f46;
}
.checkmark {
  position: absolute;
  top: 4px;
  left: 2px;
  height: 20px;
  width: 20px;
  background-color: #816b72;
  border-radius: 12px;
  transition: background-color .3s;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.container input:checked ~ .checkmark:after {
  display: block;
}
.container .checkmark:after {
  left: 7px;
  top: 3px;
  width: 4px;
  height: 9px;
  border: solid rgb(238, 238, 238);
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
.search-input {
  margin-left: 6px;
  background-color: #563f46;
  font-size: 1em;
  padding: 4px;
  border: none;
  color: rgb(241, 236, 229);
  font-family: quando, Arial, serif;
  border-radius: 2px;
}
.search-input::placeholder {
  color: rgba(192, 192, 192, 0.7);
}
.div-search-btn{
  position: relative;
  width: 30px;
  height: 20px;
  display: inline-block;
  background-color: rgba(128, 128, 128, 0);
  margin-left: 6px;

}
.search-btn{
    margin-left: 6px;
    font-size: 24px;
    font-weight: bold;
    background-color: rgba(238, 225, 225, 0);
    border: none;
    cursor: pointer;
    transition: transform .3s;
    padding: 0;
    left: -6px;
    outline: none;
    transform: rotate(90deg);
    position: absolute;
}

.search-btn:hover {
    transform: scale(1.1) rotate(45deg);
}

.select-catagory,
.select-sort{
  background-color: #563f46;
  height: 30px;
  color: rgb(241, 236, 229);
  cursor: pointer;
  border: none;
  padding: 4px;
  margin-left: 6px;
  font-family: quando, Arial, serif;
  border-radius: 2px;
  transition: background-color .2s;
}
.select-catagory:hover,
.select-sort:hover{
  background-color: #5f484f;
}

h3 {
  margin: 0 0 6px 0;
}
</style>
