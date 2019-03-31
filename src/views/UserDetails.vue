<template>
  <section class="user-profile container-movies flex column">
    <!-- left column with user details -->
    <div class="user-details" v-if="viewUser">
      <div class="user-img">
        <img :src="viewUser.userImg">
      </div>
      <input style="display: none" type="file" @change="onfileSelected" ref="fileInput">
      <button @click="$refs.fileInput.click()">Add your picture</button>
      <!-- <button @click="onUpload">upload</button> -->

      <div class="table-container flex full">
        <table class="details-table">
          <tr>
            <td>Name</td>
            <td>{{viewUser.name}}</td>
          </tr>
          <tr>
            <td>Reviews</td>
            <td>{{numOfReviews}}</td>
          </tr>
          <tr>
            <td>Likes on reviews</td>
            <td>{{numOfLikes}}</td>
          </tr>
          <tr>
            <td>Dislikes on reviews</td>
            <td>{{numOfDislikes}}</td>
          </tr>
        </table>
      </div>

      <div class="btns">
        <!-- chat with user -->
        <div class="chat-link">
          <user-chat/>
        </div>

        <!-- follow user -->
        <div class="follow-link">
          <follow-user></follow-user>
        </div>
      </div>
    </div>

    <!-- right column with user reviews -->
    <div class="user-reviews full">
      <review-list :directAndId="detailsForShowReviews"></review-list>
    </div>
  </section>
</template>

<script>
import ReviewList from "./ReviewList.vue";
import UserChat from "../components/UserChat.vue";
import FollowUser from "./FollowUser.vue";

//import userService from '../services/UserService.js'

export default {
  name: "UserDetails",
  data() {
    return {
      isTellLogin: false,
      isAlreadyFollowed: false,
      isUserChatOpen: false,
      selectedFile: null
    };
  },
  created() {
    const userId = this.$route.params.userId;
    this.$store.dispatch({ type: "usersModule/loadViewUser", userId });
  },
  destroyed() {
    this.$store.commit({ type: "usersModule/cleanViewUser" });
  },

  methods: {
    onfileSelected(event) {
      this.selectedFile = event.target.files[0];
       var fileAndUser={
      selectedImg: this.selectedFile,
      user: this.viewUser._id
    }
       this.$store.dispatch({ type: "usersModule/uploadImg",fileAndUser })  
    }
  },

  computed: {
    viewUser() {
      return this.$store.state.usersModule.viewUser;
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
    }
  },
  components: {
    ReviewList,
    UserChat,
    FollowUser
  }
};
</script>

<style scoped lang="scss">
.user-details {
  flex: 0 0 270px;
  margin-top: 30px;
  margin-right: 26px;
}
.user-img img {
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
</style>
