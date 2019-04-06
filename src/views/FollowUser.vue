<template>
  <section>

    <div class="follow" v-if="isSelfProfile">
      <button @click="onFollowUser" class="btn-follow" title="Follow User">
        Follow {{viewUser.name}}! <i class="fas fa-user-plus"></i>
      </button>
      <div v-if="isLogin">Please login to follow the user...</div>
    </div>

    <div v-if="isAlreadyFollowed">You already follow this user</div>

  </section>
</template>

<script>
export default {
  name: 'FollowUser',
  data() {
    return {
      isLogin: false, 
      isAlreadyFollowed: false
    }
  },
  created() {
    if(this.viewUser){
      this.$emit('viewUserFollowedBy', this.viewUserFollowedBy)  // followers
      this.$emit('viewUserFollowAfter', this.viewUserFollowAfter)  // following
    }
  },
  computed: {
    currUser() {
      return this.$store.state.usersModule.currUser;
    },
    viewUser() {
      return this.$store.state.usersModule.viewUser;
    },
    isSelfProfile() {
      if (this.currUser.name === this.viewUser.name) {
        return false
      } else {
        return true
      }
    },
    viewUserFollowAfter(){
      return this.viewUser.follow.followAfter;
    },
    viewUserFollowedBy(){
      return this.viewUser.follow.followedBy;
    }
  },
  methods: {
    onFollowUser() {
      // check log in
      var loggedInUser = this.currUser
      var followedUser = this.viewUser
      if (loggedInUser.name === 'Guest') {
        this.isLogin = !this.isLogin
        setTimeout(() => {
          this.isLogin = !this.isLogin;
        }, 2000)   // 2 secs to show "Please login to follow the user..."
        return
      }

      // check if already follow
      var already = this.checkIfAlreadyFollow(loggedInUser, followedUser)
      if (already) return

      // send to backend
      var users = { "loggedInUser": {"_id": loggedInUser._id, "name": loggedInUser.name}, 
                    "followedUser": {"_id": followedUser._id, "name": followedUser.name}}
      this.$store.dispatch({ type: "usersModule/addFollower", users })
    },
    checkIfAlreadyFollow(loggedInUser, followedUser){
      if (loggedInUser && followedUser) {
        var loggedInUserName = JSON.parse(JSON.stringify(loggedInUser.name))
        var followedUserList = JSON.parse(JSON.stringify(followedUser.follow.followedBy))

        for(var i=0; i < followedUserList.length; i++){
          if (loggedInUserName === followedUserList[i]){
            // console.log('already')
            this.isAlreadyFollowed = true
            setTimeout(() => {
              this.isAlreadyFollowed = false;
            }, 3000)   // 3 secs to show "The user is already followed by ..."
            return true
          }
        }
        return false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
section{
    color: white;
}
.btn-follow {
  color: white;
  padding: 7px;
  cursor: pointer;
  border: 1px solid white;
  border-radius: 3px;
  outline: none;
  background-color: #1a181800;
  transition: 0.3s;
  margin-right: 3px;
  &:hover {
    color: #3481b4;
    background-color: #1a1818;
  }
}
</style>
