<template>
  <section class="list-section">
    <h3>Reviews</h3>

    <div class="new-review">
      <button class="margin-bottom6" @click="toggleOpenNewReview">Add Review</button>
      <div v-if="isAddOpen">
        <form class="form-login flex flex-col" @submit.prevent="onAddReview">
          <textarea class="margin-bottom6" v-model="newReview.txt" rows="6" cols="50"></textarea>
          <button class="margin-bottom6" type="submit">Send Review</button>
        </form>
      </div>
    </div>

    <div v-if="!reviewsToShow">
      <img src="../assets/img/banana3.gif">
      <img src="../assets/img/banana1.gif">
      <img src="../assets/img/banana2.gif">
    </div>

    <ul class="clean-list" v-if="reviewsToShow">
      <li v-for="currReview in reviewsToShow" :key="currReview._id">
        <div class="div-reviews">{{currReview.content.txt}}</div>

        <div class="div-btn">
          <router-link :to="'/movies/edit/' + currReview._id">
            <button>Edit (Admin)</button>
          </router-link>
          <!-- currUser.userId -> maybe change to currUser._id		 -->
          <router-link :to="'/user/details/' + id">
            <button>See Person</button>
          </router-link>
          <button @click="clickedLike(currReview._id )">Like</button>
          <!-- <span >{{likes}}</span> -->
          <button @click="clickedDislike(currReview._id)">Dislike</button>
          <!-- <span >{{disLikes}}</span> -->
        </div>
      </li>
    </ul>

    <div v-if="directAndId">{{directAndId}}</div>
  </section>
</template>

<script>
	import UserDetails from "./UserDetails.vue";

export default {
  name: "reviewList",
  props: {
    directAndId: Object
  },
  data() {
    return {
      isAddOpen: false,
      isSendReview: false,
      newReview: {
        txt: '',
      },
      id: '0u0001'
    };
  },
  created() {

  },
  destroyed() {
    this.$store.commit({ type: "reviewsModule/setReviews", serverReviews: null });
  },

  methods: {
    toggleOpenNewReview() {
      this.isAddOpen = !this.isAddOpen
    },
    onAddReview() {
      // TODO: add to review-list and to JSON
      this.isAddOpen = false;
      this.newReview = { txt: '',
      }
    },
       clickedLike(reviewId) {
      // var userId = this.$store.state.usersModule.currUser.userId;
      //var userId='user'
      this.$store.dispatch({ type: "reviewsModule/addLike", reviewId});
  },
  clickedDislike(reviewId) {
    //var userId='user'
      this.$store.dispatch({ type: "reviewsModule/addDislike", reviewId });
  }
  },

  computed: {
    reviewsToShow() {
      return this.$store.state.reviewsModule.currReviews;
    },
  },

  watch: {
    directAndId: function (directAndId) {
      if (directAndId) {
        this.$store.dispatch({ type: "reviewsModule/loadReviews", directAndId });
      }
    }
  },
  mounted() { },
  components: {
    UserDetails
  }
}
</script>

<style scoped>
.new-review button {
  cursor: pointer;
  border: none;
  color: white;
  border-radius: 4px;
  outline: none;
  font-family: cursive, arial, serif, sans-serif;
  background-color: rgb(52, 180, 94);
  font-size: 0.8em;
  padding: 8px 4px;
  transition: background-color 0.3s;
}
.new-review button:hover {
  background-color: rgb(55, 190, 100);
}

.margin-bottom6 {
  margin-bottom: 6px;
}
.new-review {
  margin: 0 auto 6px auto;
  max-width: 80vw;
}
.div-reviews {
  	max-width: 75vw;
}

h3 {
  	margin: 0 0 6px 0;
}
.div-btn {
  	margin: 6px 0 0 0;
}
.div-btn button {
  margin: 0 6px 0 0;
  cursor: pointer;
  border: none;
  color: white;
  border-radius: 4px;
  outline: none;
  font-family: cursive, arial, serif, sans-serif;
  background-color: rgb(52, 180, 163);
  font-size: 0.8em;
  padding: 8px 4px;
  transition: background-color 0.3s;
}
.div-btn button:hover {
  background-color: rgb(55, 190, 170);
}

.list-section ul {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

.list-section li {
	height: 100px;
	width: 75vw;
	list-style: none;
	border: 1px solid rgb(119, 105, 27);
	margin: 0 8px 6px 0;
	padding: 4px;
	border-radius: 4px;
}

.clean-list {
	list-style-type: none;
	margin: 0;
	padding: 0;
}
</style>
