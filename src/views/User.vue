<template>
  <section>
    <h2>User Page</h2>

    <div class="flex flex-col" v-if="loggedInUser && loggedInUser._id">
      <label class="margin-bottom6">Hi {{loggedInUser.name}}! You need to logout first</label>
      <router-link to="/login">
        <button class="logout-btn" @click="logoutUser">Logout</button>
      </router-link>
    </div>

    <div v-else>
      <div class="div-login">
        <p class="margin-bottom6">Enter to your account</p>
        <form class="form-login flex flex-col" @submit.prevent="onLogin">
          <input required autofocus class="margin-bottom6" type="text" placeholder="User name" 
            v-model="user.name">
          <input required class="margin-bottom6" type="text" placeholder="Password" 
            v-model="user.pass">
          <button class="margin-bottom6" type="submit">Login</button>
        </form>
        <p class="msg-login-fail">{{msgFailLogin}}</p>
      </div>

      <div class="div-register">
        <p class="margin-bottom6">New here? Let's register</p>
        <form class="form-register flex flex-col" @submit.prevent="onRegister">
          <input class="margin-bottom6" type="text" required placeholder="New user name" v-model="newUser.name">
          <input class="margin-bottom6" type="text" required placeholder="Password" v-model="newUser.pass">
          <button class="margin-bottom6" type="submit">Register</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import UserService from "../services/UserService.js";

export default {
  name: 'user',
  data() {
    return {
      user: {
        name: '',
        pass: ''
      },
      newUser: {
        name: '',
        pass: ''
      },
      isMsgFailLog: false,
      textFailLog: ''
    };
  },
  methods: {
    onLogin() {
      this.$store.dispatch({ type: 'usersModule/doLogin', user: this.user })
        .then(user => {
        if (user && user._id) {
          console.log('LOGGED IN!', user);
              // this.$router.push('/movies');
        } else {
          console.log('WRONG TO LOGGED IN');
          this.textFailLog = 'Wrong name or password - You stay in Guest mode';
          this.isMsgFailLog = true;
        }
      });
    },
    onRegister() {
      if (this.newUser.name && this.newUser.pass) {
        UserService.isNameNotInUse(this.newUser.name)
          .then(() => {
            this.$store.dispatch({ type: 'usersModule/addUser', newUser: this.newUser })
              .then(res => {
                if (res) {
                  console.log('register NEW SUCCESS!');
                  this.$router.push('/movies');
                } else {
                  console.log('register FAIL');
                }
              })
              .catch(err => {
                console.log('WRONG TO register - ', err);
              });
          })
          .catch((err) => {
            this.textFailLog = 'This name is already in use';
            this.isMsgFailLog = true;
          })
      }
    },
    logoutUser() {
      this.$store.dispatch({ type: 'usersModule/logoutUser' })
    },
  },
  computed: {
    msgFailLogin() {
      if (this.isMsgFailLog) {
        setTimeout(() => {
          this.isMsgFailLog = false;
        }, 3000);
        return this.textFailLog;
      } else {
        return '';
      }
    },
    loggedInUser() {
      return this.$store.state.usersModule.currUser;
    }
  },
  components: {
    UserService
  }
};
</script>

<style scoped>
.form-login input,
.form-register input {
  border-radius: 4px;
  padding: 2px 10px 2px 10px;
  background-color: #750a2c;
  border: none;
  font-size: 1.2em;
  color: rgb(250, 250, 250);
  font-family: cursive, arial, serif, sans-serif;
}
.form-login input::placeholder,
.form-register input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

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
  background-color: rgb(180, 99, 52);
  margin-bottom: 6px;
}

.logout-btn:hover {
  background-color: rgb(148, 82, 44);
}

.margin-bottom6 {
  margin-bottom: 6px;
}
.div-login,
.div-register {
  width: 80vw;
  margin: 0 auto;
}

.div-login button,
.div-register button {
  width: 70vw;
  margin: 0 auto;
  cursor: pointer;
  border: none;
  color: white;
  border-radius: 4px;
  outline: none;
  font-family: cursive, arial, serif, sans-serif;
  background-color: #005780;
  font-size: 1.1em;
  padding: 4px 4px;
  transition: background-color 0.2s;
}
.div-login button:hover,
.div-register button:hover {
  background-color: #005279;
}

h2 {
  margin: 0 0 6px 0;
}

@media (min-width: 500px) {
  .div-login,
  .div-register {
    width: 60vw;
  }
  .div-login button,
.div-register button {
  width: 50vw;
}
}

@media (min-width: 1030px) {
  .div-login,
  .div-register {
    width: 40vw;
  }
   .div-login button,
.div-register button {
  width: 30vw;
}
}
</style>