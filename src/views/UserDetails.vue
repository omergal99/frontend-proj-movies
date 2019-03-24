<template>
	<section>
		<div class="user-details" v-if="viewUser">
			<div class="div-img">
				<img :src="viewUser.userImg">
				<!-- <img src="../assets/img/userImg.jpg"> -->
			</div>

			<div class="user-table">
				<table class="details-table">
					<tr>
						<td>Name</td>
						<td>{{viewUser.name}}</td>
					</tr>
					<tr>
						<td>Rating</td>
						<td>{{viewUser.rating}}</td>
					</tr>
				</table>
			</div>
		</div>

		<!-- <div class="user-reviews-container" v-if="viewUser">
			<div>
				<h2>{{viewUser.name}}'s Reviews</h2>
			</div>
			<div class="user-reviews" v-for="review in reviews" :key="review._id">
				<table>
					<user-reviews :review="review" :user="viewUser"></user-reviews>
				</table>	
			</div>
		</div> -->
		
		<review-list :directAndId="detailsForShowReviews"></review-list>

	</section>
</template>

<script>
// import axios from "axios";
// import UserReviews from "../components/UserReviews.vue";
import ReviewList from './ReviewList.vue';

export default {
	name: 'UserDetails',
	data() {
		return {};
	},
	created() {
		const userId = this.$route.params.userId;
    this.$store.dispatch({ type: 'usersModule/loadViewUser', userId });

		// var directAndId = { direct: "user", id: userId };
		// this.$store.dispatch({ type: "reviewsModule/loadReviews", directAndId });
	},
	computed: {
		viewUser() {
			return this.$store.state.usersModule.viewUser;
		},
		detailsForShowReviews() {
      if (this.viewUser) {
        var directAndId = {
          direct: 'user',
          id: this.viewUser.userId,
        };
        return directAndId;
      }else{
        return {err: 'problem in UserDetails page'}
      }
    }
	},
	components: {
		ReviewList,
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
  max-height: 150px;
  text-align: center;
}

.user-details {
  display: flex;
  padding: 8px;
}

.user-table {
  max-width: 75vw;
  color: rgb(31, 31, 31);
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
.details-table td:first-child {
  font-weight: bold;
}
.details-table td:not(:first-child) {
  background-color: #e6e2d3;
}
table{
	margin: 0 auto;
}
</style>
