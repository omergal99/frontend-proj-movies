<template>
  <header class="header-wrap">
    <div v-if="loggedInUser" class="login-logout flex wrap space-between">
      <router-link to="/">
        <span class="logo logo1">Movies&Reviews</span>
        <!-- <br>
        <span class="logo logo2">Movies&Reviews</span>
        <br>
        <span class="logo logo3">Movies&Reviews</span>
        <br>
        <span class="logo logo4">Movies&Reviews</span>
        <br>
        <span class="logo logo5">Movies&Reviews</span>
        <br>
        <span class="logo logo6">Movies&Reviews</span>
        <br>
        <span class="logo logo7">Movies&Reviews</span> -->
      </router-link>

      <div class="links">
        <!-- GUEST IN WEB -->
        <span class="profile" v-if="!loggedInUser._id">Hello Guest</span>

        <router-link to="/login">
          <span class="login" v-if="!loggedInUser._id" >Login</span>
        </router-link>

        <!-- SOMEONE LOGIN -->
        <router-link v-if="loggedInUser._id" :to="'/user/details/'+ loggedInUser._id">
          <span class="profile" v-if="loggedInUser._id">{{loggedInUser.name}} Profile</span>
        </router-link>

        <router-link to="/login">
          <span class="logout" v-if="loggedInUser._id" @click="logoutUser">Logout</span>
        </router-link>
      </div>
    </div>

    <!-- <div id="nav">
      <router-link to="/">
        <span class="link">Home</span>
      </router-link>
      <span class="line">&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;</span>
      <router-link to="/movies">
        <span class="link">Movies</span>
      </router-link>
    </div> -->
  </header>
</template>

<script>
import UserService from "../services/UserService.js";
// import SocketService from '../services/SocketService.js';
// import SocketRoomService from "../services/SocketRoomService.js";

export default {
  name: "mainBar",
  mounted() {
    if (!this.$store.state.usersModule.currUser && !UserService.getLoggedInUser()) {
    // console.log('3333333333333333333')
      var guestUser = UserService.getGuestUser();
      this.$store.dispatch({ type: "usersModule/loadUser", user: guestUser });
    }
  },
  created() {
    var isUserInStrg = UserService.getLoggedInUser();
    if (isUserInStrg) {
    // console.log('2222222222222')
    this.$store.dispatch({ type: "usersModule/loadUser", user: isUserInStrg });
    }
  },
  computed: {
    loggedInUser() {
      if (this.$store.state.usersModule.currUser) {
        return JSON.parse(JSON.stringify(this.$store.state.usersModule.currUser));
      }
    }
  },
  methods: {
    logoutUser() {
      localStorage.removeItem(UserService.USER_STORAGE);
      this.$store.dispatch({ type: "usersModule/logoutUser" });
      // SocketRoomService.disconnect();
    }
  }
};
</script>

<style lang="scss" scoped>
.header-wrap{
  background-color: #1a1818;
  height: fit-content;
}

.logo {
  font-size: 1.2em;
  color: #149cf7;
  // font-family: merienda,badScript, cursive, Arial, Helvetica, sans-serif, serif;
  // font-family: undeveloped, movieFilmstrip,
  // krAction ,Faster_One ,acFilmstrip;
  // font-weight: bold;
}
.logo1 {
  font-family: badScript, cursive, Arial, Helvetica, sans-serif, serif;
      font-weight: bold;
}
.logo2 {
  font-family: undeveloped;
}
.logo3 {
  font-family: movieFilmstrip;
}
.logo4 {
  font-family: krAction;
}
.logo5 {
  font-family: Faster_One, acFilmstrip;
}
.logo6 {
  font-family: acFilmstrip;
}
.logo7 {
  font-family: neogrey;
}

.links {
  margin: auto 0;
  font-family: Arial, serif, sans-serif, Helvetica;
}

.login-logout {
  position: fixed;
    z-index: 20;
    width: 100%;
  // height: fit-content;
  background-color: #1a1818;
  padding: 4px 25px 0px 25px;
  .profile,
  .login,
  .logout {
    cursor: pointer;
    color: #dbd5d5;
    font-size: .9em;
    &:hover {
      color: #3481b4;
    }
  }
  .logout,
  .login {
    margin-left: 25px;
  }
}

// #nav{
//   margin: 3px 0 15px 0;
//   // background-color: #1a1818;
// }
// a{
//   color: white;
//   &:hover {
//       color: #3481b4;
//     }
// }
// .link{
//   font-weight: 600;
// }
// .line{
//   color: #dbd5d5;
//   font-size: 1.3em;
// }
@media (min-width: 720px) {
  .logo {
    font-size: 2em;
  }
  .login-logout {
    .profile,
    .login,
    .logout {
      font-size: 1.3em;
    }
  }
}
</style>
