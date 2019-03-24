<template>
	<section>
		<div class="user-details" v-if="currUser">
			<div class="div-img">
				<img :src="currUser.userImg">
				<!-- <img src="../assets/img/userImg.jpg"> -->
			</div>
			<div class="user-table">
				<table class="details-table">
				<tr>
					<td>Name</td>
					<td>{{currUser.name}}</td>
				</tr>
				<tr>
					<td>Rating</td>
					<td>{{currUser.rating}}</td>
				</tr>
				</table>
			</div>
		</div>
		<div class="user-reviews-container" v-if="currUser">
			<div>
				<h2>{{currUser.name}}'s Reviews</h2>
			</div>
			<div class="user-reviews" v-for="review in reviews" :key="review._id">
				<table>
					<user-reviews :review="review" :user="currUser"></user-reviews>
				</table>	
				
				
			</div>
		</div>
	</section>
</template>

<script>
import axios from "axios";
import UserReviews from "../components/UserReviews.vue";
export default {
	name: "UserDetails",
	data() {
		return {};
	},
	created() {
		const userId = this.$route.params.userId;

		this.$store.dispatch({ type: "usersModule/getUserById", userId });

		var directAndId = { direct: "user", id: userId };
		this.$store.dispatch({ type: "reviewsModule/loadReviews", directAndId });
	},
	computed: {
		currUser() {
			return this.$store.state.usersModule.currUser;
		},
		reviews() {
			return this.$store.state.reviewsModule.currReviews;
		}
	},
	components: {
		UserReviews
	}
};
</script>


<style scoped>
h3 {
  margin: 0 0 6px 0;
}
.div-img {
  width: 25vw;
}
.div-img img {
  /* max-width: 25vw; */
  max-height: 150px;
  text-align: center;
}

.user-details {
  display: flex;
  /* flex-wrap: wrap; */
  padding: 8px;
}

.user-table {
  max-width: 75vw;
}
.user-table table {
  max-width: 75vw;
  margin: 0 auto;
}
.details-table td {
  padding: 4px;
  border: 1px solid #c4b7a6;
}
.details-table td:first-child {
  background-color: #dac292;
}
.details-table td:not(:first-child) {
  background-color: #e6e2d3;
}
table{
	margin: 0 auto;
}
</style>
