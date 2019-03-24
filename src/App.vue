<template>
  <div id="app">

    <div v-if="loggedInUser" class="div-hello flex wrap space-between">
      <p class="user-name">Hello {{loggedInUser.name}}!</p>
      <div>
        <router-link to="/login">
          <button class="login-btn" v-if="!loggedInUser._id">Login</button>
        </router-link>

        <router-link to="/">
          <button class="logout-btn" v-if="loggedInUser._id" @click="logoutUser">Logout</button>
        </router-link>
      </div>
    </div>

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <!-- <router-link to="/about">About</router-link> | -->
      <router-link to="/movies">Movies</router-link> |
      <router-link to="/login">Login</router-link>
    </div>

    <router-view/> 
    
  </div>
</template>

<script>
import UserService from "./services/UserService.js"

export default {

  name: 'mainApp',
  mounted() {
    if (!this.$store.state.usersModule.currUser) {
      var guestUser = UserService.getGuestUser();
      this.$store.dispatch({ type: 'usersModule/loadUser', user: guestUser });
    }
  },
  computed: {
    loggedInUser() {
      if (this.$store.state.usersModule.currUser) {
        return JSON.parse(JSON.stringify(this.$store.state.usersModule.currUser))
      }
    }
  },
  methods: {
    logoutUser() {
      this.$store.dispatch({ type: 'usersModule/logoutUser' })
    },
  },
}
</script>

<style scoped lang="scss">

.div-hello{
  padding: 6px 8px 6px 8px;
  background-color: #520000;
}
.user-name {
  margin: 0;
  text-align: left;
  font-size: 1.2em;
  font-weight: bold;
  font-family: cursive, 'Courier New', Courier, monospace;
}

.login-btn,
.logout-btn {
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 4px;
  outline: none;
  font-family: cursive, arial, serif, sans-serif;
  font-size: 1em;
  width: 80px;
  padding: 4px 0;
  transition: background-color 0.3s;
}

.logout-btn {
  background-color: rgb(180, 99, 52);
}
.logout-btn:hover {
  background-color: rgb(187, 105, 58);
}

.login-btn {
  background-color: rgb(52, 129, 180);
}
.login-btn:hover {
  background-color: rgb(58, 136, 186);
}

#nav {
  background-color: #520000;
  font-size: 1.4em;
  padding: 0px 2px 10px 2px;
  a {
    font-weight: bold;
    color: #dbd5d5;
    &.router-link-exact-active {
      color: #488bc9;
    }
  }
}
</style>
