<template>
  <section>
    <transition name="fade2-px">
      <div :key="title">
        <h2>{{title}}</h2>
      </div>
    </transition>

    <!-- <button class="go-back-btn" @click="goBack">Back</button> -->
    <transition name="fade">
      <div key="1" v-if="isInLogin" class="login">
        <p class>Enter Your Details</p>

        <form class="form-login flex flex-col" @submit.prevent="onLogin">
          <input required autofocus class type="text" placeholder="User name" v-model="user.name">
          <input required class type="text" placeholder="Password" v-model="user.pass">
          <button class type="submit">Login</button>
        </form>

        <p class="msg-login-fail">{{msgFailLogin}}</p>
      </div>

      <div key="2" v-else class="register">
        <p class>Choose a name and password</p>

        <form class="form-register flex flex-col" @submit.prevent="onRegister">
          <input class type="text" required placeholder="New user name" v-model="newUser.name">
          <input class type="text" required placeholder="Password" v-model="newUser.pass">
          <button class type="submit">Register</button>
        </form>

        <p class="msg-login-fail">{{msgFailReg}}</p>
      </div>
    </transition>

    <transition name="fade-px">
      <div :key="textLogReg" class="switch-link">
        <a @click="toggleLogReg">{{textLogReg}}</a>
      </div>
    </transition>
  </section>
</template>

<script>
import UserService from '../services/UserService.js';

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
      isFailLog: false,
      isFailReg: false,
      isInLogin: true
    };
  },
  methods: {
    onLogin() {
      this.$store
        .dispatch({ type: 'usersModule/doLogin', user: this.user })
        .then(user => {
          if (user && user._id) {
            this.$router.go(-1);
          } else {
            this.isFailLog = true;
          }
        })
    },
    onRegister() {
      if (this.newUser.name && this.newUser.pass) {
        this.$store.dispatch({ type: 'usersModule/addUser', newUser: this.newUser })
          .then(res => {
            if (res) {
              this.$router.go(-1);
            } else {
              this.isFailReg = true;
            }
          })
      }
    },
    logoutUser() {
      this.$store.dispatch({ type: 'usersModule/logoutUser' });
    },
    goBack() {
      this.$router.go(-1);
    },
    toggleLogReg() {
      this.isInLogin = !this.isInLogin
    }
  },

  computed: {
    loggedInUser() {
      return this.$store.state.usersModule.currUser;
    },
    title() {
      return (this.isInLogin) ? 'Register' : 'Login'
    },
    textLogReg() {
      if (this.isInLogin) {
        return 'New Here? Let\'s Register!'
      } else {
        return 'Already Member?'
      }
    },
    msgFailLogin() {
      if (this.isFailLog) {
        setTimeout(() => {
          this.isFailLog = false;
        }, 3000);
        return 'Wrong name or password - You stay in Guest mode';
      } else {
        return '';
      }
    },
    msgFailReg() {
      if (this.isFailReg) {
        setTimeout(() => {
          this.isFailReg = false;
        }, 3000);
        return 'This name is already in use';
      } else {
        return '';
      }
    },
  },
  components: {
    UserService
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/_vars.scss";

*:focus {
  outline: 1px solid rgba(0, 0, 255, 0);
}

h2 {
  margin: 6px 0 6px 0;
  color: white;
}
p {
  margin: $margin6;
  color: white;
}

.switch-link {
  margin: 20px auto 10px auto;
  a {
    cursor: pointer;
    color: #f7f3f3;
    text-decoration: underline;
  }
}

.login,
.register {
  margin: 0 auto;
  background-color: #4a4a52;
  padding: 10px;
  width: 100vw;
  height: 200px;
  border-radius: 2px;
  button {
    cursor: pointer;
    width: 50%;
    margin: 12px auto 10px auto;
    border: none;
    color: white;
    border-radius: 4px;
    // font-family: cursive, arial, serif, sans-serif;
    background-color: #005780;
    font-size: 1.1em;
    padding: 4px 4px;
    transition: background-color 0.2s;
    &:hover {
      background-color: #005279;
    }
  }
}

.form-login input,
.form-register input {
  width: 80%;
  margin: $margin6;
  border-radius: 2px;
  padding: 2px 10px 2px 10px;
  background-color: #d4c2c8;
  border: none;
  font-size: 1.1em;
  color: rgb(15, 15, 15);
  // font-family: cursive, arial, serif, sans-serif;

  &::placeholder {
    color: rgba(29, 29, 29, 0.7);
  }
}

@media (min-width: 500px) {
  .login,
  .register {
    width: 60vw;
  }
}

@media (min-width: 1030px) {
  .login,
  .register {
    width: 50vw;
  }
}
</style>