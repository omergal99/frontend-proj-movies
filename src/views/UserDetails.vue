<template>
  <section class="user-profile container-movies flex column">
    <!-- left column with user details -->
    <div class="user-details" v-if="viewUser">
      <div class="user-img">
        <img :src="viewUser.userImg">
      </div>

			<div class="table-container flex full">
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
      

      <div class="btns">
        <!-- CHAT WITH USER -->
				<div class="chat-link">
        	<user-chat/>
				</div>

        <!-- follow button -->
        <div class="follow" v-if="isSelfProfile">
          <button @click="followUser" class="btn-follow" title="Follow User">
            Follow User! <i class="fas fa-user-plus"></i>
          </button>
          <div v-if="isTellLogin">Please login to follow the user...</div>
        </div>
				<div v-if="isAlreadyFollowed">The user is already followed by {{followedBy}}</div>
				<div v-if="isFollowed">The user is followed by {{followedByList}}</div>
      </div>
    </div>

    <!-- right column with user reviews -->
    <div class="user-reviews full">
      <review-list :directAndId="detailsForShowReviews"></review-list>
    </div>
  </section>
</template>

<script>
// import axios from "axios";
// import UserReviews from "../components/UserReviews.vue";
import ReviewList from './ReviewList.vue';
import UserChat from '../components/UserChat.vue';

export default {
  name: 'UserDetails',
  data() {
    return {
      isTellLogin: false,
      isAlreadyFollowed: false,
      isUserChatOpen: false,
    };
  },
  created() {
    const userId = this.$route.params.userId;
    this.$store.dispatch({ type: 'usersModule/loadViewUser', userId });
  },
  destroyed() {
    this.$store.commit({ type: "usersModule/cleanViewUser" });
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
      } else {
        return { err: 'problem in UserDetails page' }
      }
    },
    followedBy() {
      if (this.$store.state.usersModule.currUser) {
        return this.$store.state.usersModule.currUser.name
      }
    },
    isFollowed() {
      var viewUserFollowedBy = this.$store.state.usersModule.viewUser.follow.followedBy
      viewUserFollowedBy = JSON.parse(JSON.stringify(viewUserFollowedBy))
      if (viewUserFollowedBy.toString() !== '') {
        return true
      }
      return false
    },
    followedByList() {
      var viewUserFollowedBy = this.$store.state.usersModule.viewUser.follow.followedBy

      if (viewUserFollowedBy) {
        return viewUserFollowedBy
      }
    },
    currUser() {
      return this.$store.state.usersModule.currUser;
    },
    isSelfProfile() {
      if (this.currUser.name === this.viewUser.name) {
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
      if (loggedInUser.name === 'Guest') {
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

      var users = { loggedInUser, followedUser }
      this.$store.dispatch({ type: "usersModule/addFollower", users })
    },
    ifAlreadyFollowed() {
      var viewUserFollowedBy = this.$store.state.usersModule.viewUser.follow.followedBy
      var currUserId = this.$store.state.usersModule.currUser._id

      if (viewUserFollowedBy) {
        viewUserFollowedBy = JSON.parse(JSON.stringify(viewUserFollowedBy))
        currUserId = JSON.parse(JSON.stringify(currUserId))

        var followed = viewUserFollowedBy.some((by) => {
          return by === currUserId
        })

        if (followed) {
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
    UserChat
  }

};
</script>


<style scoped lang="scss">
.user-details {
  flex: 0 0 270px;
	margin-top: 30px;
	margin-right: 26px;
}
.user-img img{
	border-radius: 3px;
}
.details-table {
	margin: 26px 0;
	flex-grow: 1;
}
.details-table td {
  border: 1px solid #c4b7a6;
  padding: 4px 2px;
  border-radius: 2px;
}
.details-table td:first-child {
  background-color: #dac292;
  font-weight: bold;
}
.details-table td:not(:first-child) {
  background-color: #e6e2d3;
}

.btn-follow {
  color: white;
	padding: 10px;
	margin-bottom: 40px;
  border: none;
  border-radius: 3px;
  outline: none;
  font-family: cursive, arial, serif, sans-serif;
  background-color: #1a1818;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: #3481b4;
	}

}
</style>
