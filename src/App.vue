<template>
  <div id="app">
    <p class="app-user-show" v-if="loggedInUser">
      Hello {{loggedInUser.name}}!</p>
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/movies">Movies</router-link>|
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
  }
}
</script>

<style lang="scss">
.app-user-show{
  margin: 4px 0 4px 0;
}
#app {
  text-align: center;
  color: #2c3e50;
}
#nav {
  font-size: 1.4em;
  padding: 10px 20px 20px 20px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
