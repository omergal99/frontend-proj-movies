<template>
  <section class="chat-user-container">
    <button class="btn-chat" @click="toggleUserChat">
      Lets Chat!
      <i class="far fa-comments"></i>
    </button>

    <label v-if="isUserChatOpen" class="info-msg">{{infoMsg}}</label>

    <div class="chat-box" v-if="isUserChatOpen" :class="{ 'min-box': isMinimize }">
      <div @click.stop="minimizeChat" class="top-line flex space-between">
        <label>Chat movie: {{currMovie.details.name}}</label>
        <button @click.stop="toggleUserChat">Close X</button>
      </div>

      <!-- contant -->
      <div class="messages" v-if="!isMinimize">
        <div v-for="(msg, idx) in msgs" :key="idx" class="message" :class="msgClass(msg)">
          <label class="user-name">{{msg.from}}:</label>
          <label class="user-text">&nbsp;{{msg.txt}}</label>
        </div>

        <form @submit.prevent="send" class="botton-line flex space-between">
          <input autofocus v-model="newMsg.txt" type="text" placeholder="Write some code..">
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import SocketRoomService from "../services/SocketRoomService.js";

export default {
  name: 'movieChat',
  data() {
    return {
      isUserChatOpen: false,
      isMinimize: false,
      msgs: [],
      newMsg: null,
      infoMsg: '',
      nickName: 'omererrerer123124124523',
    };
  },
   mounted() {
    // const movieId = this.$route.params.movieId;
    // var user = (this.currUser) ? this.currUser.name : 'Guest';
    // SocketRoomService.init(movieId, user);
  },
  created() {
    this.newMsg = SocketRoomService.createEmptyMsg();
    this.newMsg.from = (this.currUser) && this.currUser.name !==' Guest'
    ? this.currUser.name : 'Guest-' + Math.floor(Math.random()*10);
    this.msgs = SocketRoomService.getMsgs();

    const movieId = this.$route.params.movieId;
    var user = (this.currUser) ? this.currUser.name : 'Guest';
    SocketRoomService.init(movieId, user);
    SocketRoomService.on('userConnected', (user) => {
      this.showInfoMsg(`${user} Just joined the room`);
      console.log(`${user} Just joined the room`)
    })
  },
  destroyed() {
    // SocketRoomService.disconnect();
  },
  computed: {
    currUser() {
      return this.$store.state.usersModule.currUser;
    },
    currMovie() {
      return this.$store.state.moviesModule.currMovie;
    },
  },
  watch: {
    'currUser.name': function(curr,prev) {
      console.log('prev',prev)
      console.log('curr',curr)
      // alert('user CHANGED')
    }
  },
  methods: {
    send() {
      // SocketRoomService.emit('post-msg', this.newMsg);
      console.log('MovieChat on send', this.newMsg)
      SocketRoomService.send(this.newMsg);
      this.newMsg = SocketRoomService.createEmptyMsg();
      this.newMsg.from = (this.currUser) ? this.currUser.name : 'Guest-4';
    },
    showInfoMsg(infoMsg) {
      this.infoMsg = infoMsg;
      setTimeout(() => this.infoMsg = '', 3000);
    },
    toggleUserChat() {
      this.isUserChatOpen = !this.isUserChatOpen;
      this.isMinimize = false;
    },
    minimizeChat() {
      this.isMinimize = !this.isMinimize;
    },
    msgClass(msg) {
      return (msg.from !== this.nickName) ? 'received' : 'sent';
    },
  },

}
</script>

<style lang="scss" scoped>
.info-msg {
  position: absolute;
  top: 45px;
  left: 10px;
  color: white;
  font-size: 20px;
  z-index: 15;
  background-color: #323251;
}
// .chat-user-container {
//   // padding: 10px;
// }

.btn-chat {
  color: white;
  padding: 10px;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  outline: none;
  font-family: cursive, arial, serif, sans-serif;
  background-color: #1a1818;
  transition: 0.3s;
  margin-right: 3px;
  &:hover {
    color: #3481b4;
  }
}

.messages {
  overflow-y: scroll;
  height: 224px;
  background-color: #b6c3e4;
  .message {
    padding: 2px 0 0 4px;
    text-align: left;
    label {
      overflow-wrap: break-word;
      &.user-name {
        color: #23213a;
        font-weight: bold;
        text-decoration: underline;
      }
      &.user-text {
        color: #151517;
      }
    }
  }
}

.chat-box {
  color: #060606;
  position: fixed;
  bottom: 0px;
  left: 50px;
  background-color: #d6e8f7;
  width: 280px;
  height: 300px;
  transition: height 0.3s;
  z-index: 5;
  border-radius: 6px 6px 0 0;
  &.min-box {
    height: 46px;
  }
  .top-line {
    cursor: pointer;
    padding: 4px 4px 4px 8px;
    background-color: #4e4c4c;
    border-radius: 4px 4px 0 0;
    min-height: 46px;
    label {
      cursor: pointer;
      color: #f7f7f7;
      top: 2px;
      position: relative;
      margin: auto 0;
    }
    button {
      cursor: pointer;
      background-color: #353742;
      color: #f9f6f1;
      border: none;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: #404350;
    }
  }
  .botton-line {
    background-color: rgb(37, 37, 41);
    position: absolute;
    bottom: 0px;
    width: 100%;
    input {
      width: 85%;
      padding: 4px 4px 4px 4px;
      font-size: 1.1em;
      border: solid 1px #f5f6fb;
      background-color: #f5f6fb;
    }
    button {
      width: 18%;
      cursor: pointer;
      background-color: #33694a;
      color: #f9f6f1;
      border: #33694a;
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: #3b7956;
    }
  }
}
</style>
