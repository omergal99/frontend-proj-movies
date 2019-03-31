<template>
  <section class="user-profile container-movies flex column">
    <!-- left column with user details -->
    <div class="user-container" v-if="viewUser">

      <div class="btns flex space-between">
        <div class="follow-link">
          <follow-user></follow-user>
        </div>
        <div class="chat-link">
          <user-chat/>
        </div>
      </div>
    

      <div class="user-img">
        <img :src="viewUser.userImg">
      </div>

      <div class="user-details ">
        <h2>{{viewUser.name}}</h2>
        <div class="user-data flex space-between ">
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
        </div>

        <!-- <div @emitList="followedByList"></div>
        {{followedByList}} -->
      

        <br>
        <br>
        <br>
        <br>
        <br>
        <label for="avatar">Choose a profile picture:</label>

        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg">
        <button @click="onAddImage()">submit</button>

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

export default {
  name: "UserDetails",
  data() {
    return {
      isTellLogin: false,
      isAlreadyFollowed: false,
      isUserChatOpen: false
    };
  },
  created() {
    const userId = this.$route.params.userId;
    this.$store.dispatch({ type: "usersModule/loadViewUser", userId });
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
    followedByList(){
      // followedByList = JSON.parse(JSON.stringify(followedByList))
      // console.log('ev:', ev)
      // console.log('followedByList:', this.followedByList)
      // return followedByList;
    }
  },
  methods: {
    onAddImage(a){
      console.log('hello',a)
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
.user-profile{
  color: white;
  text-align: left;
}

.user-container {
  flex: 0 0 270px;
  margin-top: 30px;
  margin-right: 26px;
}
.user-img img {
  border-radius: 3px;
}

</style>
