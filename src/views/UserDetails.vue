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
		</div>

		<!-- follow button -->	

		<div class="follow" >
			<button @click="followUser">Follow user</button>
			<div v-if="!isLoggedIn"> 
				isLoggedIn:{{isLoggedIn}}
				
				<br>
				Please login to follow the user...
			</div>
		</div>

		<!-- <div v-if="isFollowed">The user is followed by {{followedBy}}</div> -->



		
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
	
		};
	},
	created() {
		const userId = this.$route.params.userId;
    this.$store.dispatch({ type: 'usersModule/loadViewUser', userId });

		
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

			if(this.$store.state.usersModule.currUser){
				
				return this.$store.state.usersModule.currUser.name
			}
		},
		isFollowed(){
			// console.log('this.$store.state.usersModule.viewUser', this.$store.state.usersModule.viewUser)
			// console.log('this.viewUser', this.viewUser)
			if(this.$store.state.usersModule.viewUser){
				var isFollowed = JSON.parse(JSON.stringify(this.$store.state.usersModule.viewUser.follow.followedBy))
			// if the user is not followed the variable isFollowed is empty array
				if(isFollowed[0]){
						return true
					}
			}
		},
		currUser() {
      return this.$store.state.usersModule.currUser;
		},
		isLoggedIn(){
			var currUser = this.$store.state.usersModule.currUser

			if(!currUser) {
				console.log('!currUser')
				return true
			}	else{
				console.log('currUser', currUser)
				if(currUser.name === 'Guest'){
					console.log('Guest')
					return false
				} else {
					return true
				}
			}


			// if(currUser.name){
			// 	console.log('currUser', currUser)
			// 	if(currUser.name === 'Guest'){
			// 		console.log('Guest')
			// 		return false
			// 	} else {
			// 		return true
			// 	}
			// }
			
		}
		
	},
	methods: {
			followUser() {
			//can't follow if not logged in

			// var loggedInUser = this.currUser
			// console.log('loggedInUser = this.currUser.name:', this.currUser.name)
			
			// if(loggedInUser.name === 'Guest'){
			// 	console.log('this.isLoggedIn', this.isLoggedIn)
			// 	this.isLoggedIn = !this.isLoggedIn
				// setTimeout(() => {		
				// 	this.isLoggedIn = !this.isLoggedIn;
				// }, 2000)   // 2 secs to show "Please login to follow the user..."
				// console.log('loggedInUser = this.currUser:', this.currUser)
			// 	return
			// }
			
			// // 2 secs to show "Adding user to follow..."
			// this.isAddFollower = !this.isAddFollower;
			// setTimeout(() => {		
			// 	this.isAddFollower = !this.isAddFollower;
			// 	console.log('here')
			// }, 2000)

			// var followedUser = this.$route.params.userId;

			// var users = {loggedInUser, followedUser}
			// this.$store.dispatch({ type: "usersModule/addFollower", users})
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
