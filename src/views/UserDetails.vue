<template>
	<section>
		<div class="user-details" v-if="viewUser">
<<<<<<< HEAD
			<div class="div-img">
				<img :src="viewUser.userImg">
				
=======

			<div class="div-img">
				<img :src="viewUser.userImg">
>>>>>>> 8731cb37b65d229f289dd6336243ba6890f3e375
			</div>

			<div class="user-table">
				<table class="details-table">
<<<<<<< HEAD
					<tr>
						<td>Name</td>
						<td>{{viewUser.name}}</td>
					</tr>
					<tr>
						<td>Rating</td>
						<td>{{viewUser.rating}}</td>
					</tr>
=======
					<tr><td>Name</td><td>{{viewUser.name}}</td></tr>
					<tr><td>Rating</td><td>{{viewUser.rating}}</td></tr>
>>>>>>> 8731cb37b65d229f289dd6336243ba6890f3e375
				</table>
			</div>

			<div>
				<button>Lets Chat!</button>
			</div>

			<!-- follow button -->	
<<<<<<< HEAD
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

		
=======
			<div class="follow" >
				<button @click="followUser">Follow user</button>
				<div v-if="isTellLogin">Please login to follow the user...</div>
			</div>

			<div v-if="isAlreadyFollowed">The user is already followed by {{followedBy}}</div>
			<div v-if="isFollowed">The user is followed by {{followedByList}}</div>

		</div>
>>>>>>> 8731cb37b65d229f289dd6336243ba6890f3e375

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
<<<<<<< HEAD
			isAddFollower: false,
			isLoggedIn: false,
=======
			isTellLogin: false,
			isAlreadyFollowed: false,
>>>>>>> 8731cb37b65d229f289dd6336243ba6890f3e375
		};
	},
	created() {
		const userId = this.$route.params.userId;
<<<<<<< HEAD
    this.$store.dispatch({ type: 'usersModule/loadViewUser', userId });

		// var directAndId = { direct: "user", id: userId };
		// this.$store.dispatch({ type: "reviewsModule/loadReviews", directAndId });
=======
		this.$store.dispatch({ type: 'usersModule/loadViewUser', userId });
>>>>>>> 8731cb37b65d229f289dd6336243ba6890f3e375
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
<<<<<<< HEAD
			if(this.$store.state.usersModule.viewUser){
				
				console.log('follow', this.$store.state.usersModule.currUser.name)
=======
			if(this.$store.state.usersModule.currUser){	
>>>>>>> 8731cb37b65d229f289dd6336243ba6890f3e375
				return this.$store.state.usersModule.currUser.name
			}
		},
		isFollowed(){
<<<<<<< HEAD
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
=======
			var viewUserFollowedBy = this.$store.state.usersModule.viewUser.follow.followedBy
			viewUserFollowedBy = JSON.parse(JSON.stringify(viewUserFollowedBy))
			if(viewUserFollowedBy.toString() !== ''){
				return true
			}
			return false
		},
		followedByList(){
			var viewUserFollowedBy = this.$store.state.usersModule.viewUser.follow.followedBy
			
			if(viewUserFollowedBy){
				return viewUserFollowedBy
			}
		},		
		currUser() {
      return this.$store.state.usersModule.currUser;
		},
		
		
	},
	methods: {
		followUser() {
			//can't follow if not logged in
			var loggedInUser = this.currUser
			if(loggedInUser.name === 'Guest'){
				this.isTellLogin = !this.isTellLogin
				setTimeout(() => {		
					this.isTellLogin = !this.isTellLogin;
				}, 2000)   // 2 secs to show "Please login to follow the user..."
				return
			}

			// check if already follow
			var ifAlreadyFollowed = this.ifAlreadyFollowed()
			if (ifAlreadyFollowed) return

			// send to backend
			var followedUser = this.$route.params.userId;
			loggedInUser = loggedInUser._id

			var users = {loggedInUser, followedUser}
			this.$store.dispatch({ type: "usersModule/addFollower", users})
		},
		ifAlreadyFollowed(){
			var viewUserFollowedBy = this.$store.state.usersModule.viewUser.follow.followedBy
			var currUserId = this.$store.state.usersModule.currUser._id

			if( viewUserFollowedBy ){
				viewUserFollowedBy = JSON.parse(JSON.stringify(viewUserFollowedBy))
				currUserId = JSON.parse(JSON.stringify(currUserId))

				var followed = viewUserFollowedBy.some((by) => {
					return by === currUserId 
				})

				if (followed)	{
					this.isAlreadyFollowed = true
								setTimeout(() => {		
									this.isAlreadyFollowed = false;
								}, 3000)   // 3 secs to show "The user is already followed by ..."
					return true
				}
			}
		},
	},
>>>>>>> 8731cb37b65d229f289dd6336243ba6890f3e375
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
