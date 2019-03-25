<template>
	<section>
		<div class="user-details" v-if="viewUser">
			<div class="div-img">
				<img :src="viewUser.userImg">
				
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

			<div>
				<button>Lets Chat!</button>
			</div>

			<!-- follow button -->	
			<div class="">
				<button @click="followUser">Follow user</button>
				<div v-if="isAddFollower"> 
					Adding user to follow...
				</div>
				<div v-if="isLoggedIn"> 
					Please login to follow the user...
				</div>
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
		return {
			isAddFollower: false,
			isLoggedIn: false,
		};
	},
	created() {
		const userId = this.$route.params.userId;
    this.$store.dispatch({ type: 'usersModule/loadViewUser', userId });

		// var directAndId = { direct: "user", id: userId };
		// this.$store.dispatch({ type: "reviewsModule/loadReviews", directAndId });
	},
	destroyed(){
    this.$store.commit({ type: "usersModule/cleanViewUser"});
	},
	computed: {
		viewUser() {
			return this.$store.state.usersModule.viewUser;
		},
		detailsForShowReviews() {
      if (this.viewUser) {
        var directAndId = {
          direct: 'user',
          id: this.viewUser._id,
        };
        return directAndId;
      }else{
        return {err: 'problem in UserDetails page'}
      }
		},
		followedBy(){
			if(this.$store.state.usersModule.viewUser){
				
				console.log('follow', this.$store.state.usersModule.currUser.name)
				return this.$store.state.usersModule.currUser.name
			}
		},
		isFollowed(){
			if(this.$store.state.usersModule.viewUser){
				var isFollowed = JSON.parse(JSON.stringify(this.$store.state.usersModule.viewUser.follow.folowedBy))
			// if the user is not followed the variable isFollowed is empty array
				if(isFollowed[0]){
						return true
					}
			}
		},
		currUser() {
      return this.$store.state.usersModule.currUser;
		}
		
	},
	methods: {
			followUser() {
			//can't follow if not logged in
			// 2 secs to show "Please login to follow the user..."
			var loggedInUser = this.currUser.userId
			if(!loggedInUser){
				this.isLoggedIn = !this.isLoggedIn
				setTimeout(() => {		
					this.isLoggedIn = !this.isLoggedIn;
				}, 2000)
				return
			}
			
			// 2 secs to show "Adding user to follow..."
			this.isAddFollower = !this.isAddFollower;
			setTimeout(() => {		
				this.isAddFollower = !this.isAddFollower;
			}, 2000)

			var followedUser = this.$route.params.userId;

			var users = {loggedInUser, followedUser}
			this.$store.commit({ type: "usersModule/addRemoveFollower", users})
		},
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
