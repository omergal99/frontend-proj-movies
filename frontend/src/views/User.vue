<template>
  <section>
    <h2>User Page</h2>

    <div class="div-login">
      <label>Enter to your account</label>
      <form class="form-login flex flex-col" @submit.prevent="onLogin">
        <input class="margin-bottom6" type="text" placeholder="User name" v-model="user.name">
        <input class="margin-bottom6" type="text" placeholder="Password" v-model="user.pass">
        <button class="margin-bottom6" type="submit">Login</button>
      </form>
      <p class="msg-login-fail">{{msgFailLogin}}</p>
    </div>

    <!-- <div class="div-register">
      <label>New here? Let's register</label>
      <form class="form-register flex flex-col" 
        @submit.prevent="onRegister">
        <input type="text" required placeholder="New user name" v-model="newUser.name">
        <input type="text" required placeholder="Password" v-model="newUser.pass">
        <input type="text" required placeholder="Favorite fruit" v-model="newUser.fruit">
        <button type="submit">Register</button>
      </form>
    </div>-->
    <!-- - - - {{loggedInUser}} -->
  </section>
</template>

<script>
import UserService from "../services/UserService.js"

export default {
  name: 'user',
  data() {
    return {
      user: {
        name: '',
        pass: ''
      },
      // newUser: {
      //   name: '',
      //   pass: '',
      //   fruit: ''
      // },
      isMsgFailLog: false,
    }
  },
  methods: {
    onLogin() {
      UserService.isNameAndPassOk(this.user.name, this.user.pass)
        .then((user) => {
          if (user && user.userId) {
            console.log('LOGGED IN!', user);
            this.$store.dispatch({ type: 'usersModule/loadUser', user })
              .then(() => {
                // this.$router.push('/movies');
              })
          } else {
            console.log('WRONG TO LOGGED IN');
            this.isMsgFailLog = true;
          }
        })
    },
    onRegister() {
      if (this.newUser.name && this.newUser.pass) {
        homeService.register(this.newUser)
          .then((res) => {
            if (res) {
              console.log('register NEW SUCCESS!');
              this.$router.push('/bug-app');
            } else {
              console.log('register FAIL');
            }
          })
          .catch((err) => {
            console.log('WRONG TO register - ', err);
          })
      }
    }
  },
  computed: {
    msgFailLogin() {
      if (this.isMsgFailLog) {
        setTimeout(() => this.isMsgFailLog = false, 3000)
        return 'Wrong name or password - You stay in Guest mode';
      } else {
        return '';
      }
    },
    loggedInUser() {
      return this.$store.state.usersModule.currUser
    },
  },
  components: {
  }
};
</script>

<style scoped>
.margin-bottom6 {
  margin-bottom: 6px;
}
.div-login{
  width: 80vw;
  margin: 0 auto;
}

.div-login button {
  width: 40vw;
  margin: 0 auto;
  cursor: pointer;
  border: none;
  color: white;
  border-radius: 4px;
  outline: none;
  font-family: cursive, arial, serif, sans-serif;
  background-color: rgb(59, 196, 70);
  font-size: 0.8em;
  padding: 8px 4px;
  transition: background-color 0.3s;
}
.div-login button:hover {
  background-color: rgb(57, 202, 105)
}
h2 {
  margin: 0 0 6px 0;
}
</style>