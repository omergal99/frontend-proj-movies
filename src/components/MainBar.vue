<template>
    <header class="header-wrap">

      <div v-if="loggedInUser" class="hello flex wrap space-between">
          <span class="user-name">Hello {{loggedInUser.name}}! </span>

        <div class="login-logout">
          <router-link to="/login">
            <span class="log login" v-if="!loggedInUser._id">Login</span>
          </router-link>

          <router-link v-if="loggedInUser._id" :to="'/user/details/'+ loggedInUser._id">
            <span class="log profile" v-if="loggedInUser._id">My Profile</span>
          </router-link> 

          <router-link to="/">
            <span class="log logout" v-if="loggedInUser._id" @click="logoutUser">Logout</span>
          </router-link>
        </div>
      </div>

      <div id="nav">
        <router-link to="/"><span class="link">Home</span></router-link>
        <span class="line">&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;</span>
        <router-link to="/movies"><span class="link">Movies</span></router-link>
        
      </div>
    </header>
</template>

<script>
import UserService from "../services/UserService.js";

export default {
  name: "mainBar",
  mounted() {
    if (!this.$store.state.usersModule.currUser) {

      var guestUser = UserService.getGuestUser();
      this.$store.dispatch({ type: "usersModule/loadUser", user: guestUser });
    }
  },
  computed: {
    loggedInUser() {
      if (this.$store.state.usersModule.currUser) {
        return JSON.parse(
          JSON.stringify(this.$store.state.usersModule.currUser)
        );
      }
    }
  },
  methods: {
    logoutUser() {
      this.$store.dispatch({ type: "usersModule/logoutUser" });
    }
  }
};
</script>

<style lang="scss" scoped>
.header-wrap{
  background-color: #1a1818;
  height: fit-content;
}
.login-logout{
  margin: 25px 50px 0 0;
}
.user-name{
  margin: 25px 0 0 50px;
}
.log, .user-name, .link{
  color: #dbd5d5;
  font-size: 1.3em;
  cursor: pointer;
}
.log:hover, .user-name:hover, .link:hover{
  color: #3481b4;
}
.logout{
  margin-left: 25px;
}

#nav{
  margin: 3px 0 15px 0;
}
.link{
  font-weight: 600;
}
.line{
  color: #dbd5d5;
  font-size: 1.3em;
}
// #nav:hover{
//   color: #3481b4;
// }
// .login-btn{
//   color: 1a1818;
//   padding: 10px;
//   // margin-bottom: 40px;
//   // margin: 10px, 10px, 0, 0;
//   margin: 10px 10px 0 0;
//   border: none;
//   border-radius: 3px;
//   outline: none;
//   font-family: cursive, arial, serif, sans-serif;
//   background-color: #e6e2d3;
//   cursor: pointer;
//   transition: 0.3s;
//   &:hover {
//       background-color: #dac292;
//   }
// }

// .header-wrap {
//   padding-bottom: 80px;
// }
// header {
//   position: fixed;
//   width: 100%;
//   z-index: 10;
// }

// .div-hello {
//   padding: 6px 8px 6px 8px;
//   background-color: #1a1818;
// }
// .user-name {
//   color: white;
//   margin: 0;
//   color: #dbd5d5;
//   text-align: left;
//   font-size: 1.2em;
//   font-weight: bold;
//   font-family: cursive, "Courier New", Courier, monospace;
// }

// .login-btn,
// .logout-btn {
//   border: none;
//   cursor: pointer;
//   color: white;
//   border-radius: 4px;
//   outline: none;
//   font-family: cursive, arial, serif, sans-serif;
//   font-size: 1em;
//   width: 80px;
//   padding: 4px 0;
//   transition: background-color 0.3s;
// }

// .logout-btn {
//   background-color: rgb(180, 99, 52);
// }
// .logout-btn:hover {
//   background-color: rgb(187, 105, 58);
// }

// .login-btn {
//   background-color: rgb(52, 129, 180);
// }
// .login-btn:hover {
//   background-color: rgb(58, 136, 186);
// }

// #nav {
//   background-color: #1a1818;
//   font-size: 1.4em;
//   padding: 0px 2px 10px 2px;
//   color: #dbd5d5;
//   a {
//     font-weight: bold;
//     color: #dbd5d5;
//     &.router-link-exact-active {
//       color: #488bc9;
//     }
//   }
// }
// #nav>*{
//   color: white;
// }
</style>
