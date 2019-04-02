<template>
  <section class="user-profile container-movies">
    <!-- USER DETAILS -->

    <div class="user-container flex" v-if="viewUser">
      <div class="user">
        <h2>{{viewUser.name}}</h2>

        <div class="user-img">
          <img :src="viewUser.userImg">
        </div>
      </div>

      <!-- change image button -->
      <div v-if="currUser._id===viewUser._id">
        <input style="display: none" type="file" @change="onfileSelected" ref="fileInput">
        <button class="add-img" @click="$refs.fileInput.click()">Add/Change your picture</button>
      </div>

      <div class="details-container flex flex-col">
        <!-- number of reviews/likes/dislikes/following/followers -->
        <div class="user-data flex space-between">
          <div class="reviews flex flex-col align-center">
            <span>{{numOfReviews}}</span>
            <span>Reviews</span>
          </div>
          <div class="likes flex flex-col align-center">
            <span>{{numOfLikes}}</span>
            <span>Likes</span>
          </div>
          <div class="dislikes flex flex-col align-center">
            <span>{{numOfDislikes}}</span>
            <span>Dislikes</span>
          </div>
          <div class="followers flex flex-col align-center">
            <span v-if="followers">{{followers}}</span>
            <span v-else>0</span>
            <span>Followers</span>
          </div>
          <div class="following flex flex-col align-center">
            <span v-if="following">{{following}}</span>
            <span v-else>0</span>
            <span>Following</span>
          </div>
        </div>

        <!-- chat and follow button -->
        <div class="flex space-between">
          <user-chat/>
          <follow-user @viewUserFollowedBy="viewUserFollowedBy" @viewUserFollowAfter="viewUserFollowAfter"></follow-user>
        </div>
      </div>
    </div>

    <!--  user reviews -->
    <div class="user-reviews full">
      <review-list :directAndId="detailsForShowReviews"></review-list>
    </div>
  </section>
</template>

<script>
import ReviewList from "./ReviewList.vue";
import UserChat from "../components/UserChat.vue";
import FollowUser from "./FollowUser.vue";

export default {
  name: "UserDetails",
  data() {
    return {
      followers: null,    
      following: null,
      isTellLogin: false,
      isAlreadyFollowed: false,
      isUserChatOpen: false,
      selectedFile: null
    };
  },
  created() {
    this.loadUser();
  },
  destroyed() {
    this.$store.commit({ type: "usersModule/cleanViewUser" });
  },

  methods: {
    onfileSelected(event) {
      this.selectedFile = event.target.files[0];
      var fileAndUser = {
        selectedImg: this.selectedFile,
        user: this.viewUser._id
      };
      this.$store.dispatch({ type: "usersModule/uploadImg", fileAndUser });
    },

    loadUser() {
      var userId = this.$route.params.userId;
      this.$store.dispatch({ type: "usersModule/loadViewUser", userId });
    },
    viewUserFollowedBy(list) {
      if( !list ) return
      this.following = list.length;
    },
    viewUserFollowAfter(list) {
      if( !list ) return
      this.followers = list.length;
    }
  },
  watch: {
    userId: function () {
      this.loadUser();
    }
  },
  computed: {
    viewUser() {
      return this.$store.state.usersModule.viewUser;
    },

    userId() {
      return this.$route.params.userId;
    },

    detailsForShowReviews() {
      if (this.viewUser) {
        var directAndId = {
          direct: "user",
          id: this.viewUser._id
        };
        return directAndId;
      } else {
        return { err: "problem in UserDetails page" };
      }
    },

    currUser() {
      return this.$store.state.usersModule.currUser;
    },

    numOfReviews() {
      return this.$store.getters["reviewsModule/numOfReviews"];
    },

    numOfLikes() {
      return this.$store.getters["reviewsModule/numOfLikes"];
    },

    numOfDislikes() {
      return this.$store.getters["reviewsModule/numOfDislikes"];
    },
  },

  components: {
    ReviewList,
    UserChat,
    FollowUser
  }
};
</script>

<style scoped lang="scss">
.details-container {
  width: 100%;
  // margin: auto 0;
  padding: 0 0 0 8px;
  .user-data{
    padding-bottom: 6px;
  }
}
h2 {
  margin: 4px 0 4px 0;
}

.user-reviews {
  margin-top: 10px;
}
.user-profile {
  color: white;
  text-align: left;
}

.user-container {
  flex: 0 0 270px;
  margin-top: 30px;
}
.user-img {
  width: 150px;
  margin: 0;
  display: inline-block;
}
.user-img img {
  border-radius: 3px;
  // width: 150px;
}

@media (max-width: 720px) {
  .user-profile {
    flex-direction: column;
    .add-img {
      color: white;
      padding: 7px;
      cursor: pointer;
      border: none;
      border-radius: 3px;
      outline: none;
      // font-family: cursive, arial, serif, sans-serif;
      background-color: #1a1818;
      transition: 0.3s;
      margin-right: 3px;
      &:hover {
        color: #3481b4;
      }
    }
  }
}
</style>
