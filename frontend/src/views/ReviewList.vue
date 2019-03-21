<template>
  <section class="list-section">
    <h3>Reviews</h3>
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
			id: '0u0001'
		};
	},
	created() {

	},
	destroyed() {
		this.$store.commit({ type: "reviewsModule/setReviews", serverReviews: null });
	},
	methods: {},
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
