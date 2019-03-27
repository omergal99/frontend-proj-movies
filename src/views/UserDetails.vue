<template>
	<section>


		<div class="user-profile flex column">

			<div class="user-details" v-if="viewUser">
				<div class="div-img">
					<img :src="viewUser.userImg">
				</div>

				<div class="user-table">
					<table class="details-table">
						<tr><td>Name</td><td>{{viewUser.name}} </td></tr>
						<tr><td>Rating</td><td>{{viewUser.rating}}</td></tr>
					</table>
				</div>

				<div>
					<button>Lets Chat!</button>
				</div>

				<!-- follow button -->	
				<div class="follow" v-if="isSelfProfile">
					<button @click="followUser">Follow user</button>
					<div v-if="isTellLogin">Please login to follow the user...</div>
				</div>
				<div v-if="isAlreadyFollowed">The user is already followed by {{followedBy}}</div>
				<div v-if="isFollowed">The user is followed by {{followedByList}}</div>

			</div>

		   <div>
			  <review-list :directAndId="detailsForShowReviews"></review-list>
		  </div>


	  </div>
		


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
			isTellLogin: false,
			isAlreadyFollowed: false,
		};
	},
	created() {
		const userId = this.$route.params.userId;
		//console.log('ffffff', userId)
		this.$store.dispatch({ type: 'usersModule/loadViewUser', userId })
		//.then(()=>viewUser() );
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
		isSelfProfile(){
			if(this.currUser.name === this.viewUser.name){
				return false
			} else {
				return true
			}
		}
		
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
  /* display: flex; */
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
