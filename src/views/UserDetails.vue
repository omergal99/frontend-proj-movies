<template>
  <section class="user-profile container-movies flex column">
    <!-- left column with user details -->
    <!-- <div class="user-details" v-if="viewUser"> -->
     

      
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

      <div>
      <input style="display: none" type="file" @change="onfileSelected" ref="fileInput" >  
      <button class="add-img" @click="$refs.fileInput.click()">Add your picture</button>  

      </div>

      
      <!-- <button @click="onUpload">upload</button> -->


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
    

      </div>
    </div>

    <!-- right column with user reviews -->
    <div class="user-reviews full" >
      <review-list  :directAndId="detailsForShowReviews"></review-list>
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
    },
    followedByList(){
      // followedByList = JSON.parse(JSON.stringify(followedByList))
      // console.log('ev:', ev)
      // console.log('followedByList:', this.followedByList)
      // return followedByList;
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
.user-img{
  width: 150px;
  margin: 0 auto;
}
.user-img img {
  border-radius: 3px;
  // width: 150px;
  
}
.add-img{
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

</style>
