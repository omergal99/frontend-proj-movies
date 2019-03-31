<template>
  <section>

    <div class="filter-container flex space-center">
      <!-- <label class="filter-new">
        New Movies
        <input type="checkbox" checked="checked">
        <span class="checkmark"></span>
      </label> -->

      <select class="filter-category" @change="emitFilter" v-model="filterBy.category">
        <option value>Category</option>
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        <option value="srama">Drama</option>
        <option value="family">Family</option>
        <option value="horror">Horror</option>
        <option value="romance">Romance</option>
      </select>

      <!-- <select class="filter-by" @change="emitFilter" v-model="filterBy.sort">
        <option value="topRated">Top Rated</option>
        <option value="year">Year</option>
        <option value="name">Name</option>
      </select> -->

      <input
        class="filter-input"
        type="text"
        placeholder="Find Movie By Name"
        @input="emitFilter"
        v-model="filterBy.name">

      <div class="filter-search flex space-center align-center">
        <!-- <button class="search-button" title="Search" @click="emitFilter"> -->
          <span><i class="fas fa-search"></i></span>
          
        <!-- </button> -->
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

// .filter-new {
//   cursor: pointer;
//   display: inline-block;
//   position: relative;
//   font-size: 1em;
//   user-select: none;
//   margin-left: 6px;
//   background-color: #e4e7ff;
//   padding: 4px 4px 4px 24px;
//   border-radius: 3px;
//   transition: background-color 0.3s;
//   &input {
//     position: absolute;
//     opacity: 0;
//     cursor: pointer;
//     height: 0;
//     width: 0;
//     transition: background-color 0.3s;
//   }
//   &:hover {
//     background-color: #488bc9;
//   }
// }

// .filter-new:hover input ~ .checkmark {
//   background-color: #ffffff;
// }

// .filter-new input:checked ~ .checkmark {
//   color: black;
//   background-color: #488bc9;
// }
// .checkmark {
//   position: absolute;
//   top: 4px;
//   left: 2px;
//   height: 20px;
//   width: 20px;
//   border-radius: 12px;
//   transition: background-color 0.3s;
//   &:after {
//     content: "";
//     position: absolute;
//     display: none;
//   }
// }

// .filter-new {
//   color: #2b2a44;
//   padding-top: 5px;
//   padding-bottom: 5px;
// }
// .filter-new input:checked ~ .checkmark:after {
//   display: block;
// }
// .filter-new .checkmark:after {
//   left: 7px;
//   top: 3px;
//   width: 4px;
//   height: 9px;
//   border: solid rgb(238, 238, 238);
//   border-width: 0 3px 3px 0;
//   transform: rotate(45deg);
// }
// .fa-search {
//   color: #488bc9;
// }
</style>
