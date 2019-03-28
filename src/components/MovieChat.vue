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
  created() {
    this.newMsg = SocketRoomService.createEmptyMsg();
    this.newMsg.from = (this.currUser) ? this.currUser.name : 'Guest-3';

    this.msgs = SocketRoomService.getMsgs();

    const movieId = this.$route.params.movieId;
    var user = (this.newMsg.from) ? this.newMsg.from : 'Guest';
    SocketRoomService.init(movieId, user);

    SocketRoomService.on('userConnected', (user) => {
      this.showInfoMsg(`${user} Just joined the room`)
    })

  },
  computed: {
    currUser() {
      return this.$store.state.usersModule.currUser;
    },
    currMovie() {
      return this.$store.state.moviesModule.currMovie;
    },
  },
  methods: {
    send() {
      // SocketRoomService.emit('post-msg', this.newMsg);
      // console.log('asfasgsaw4214', this.newMsg)
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
.chat-user-container {
  padding: 10px;
}

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
  height: 240px;
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
  &.min-box {
    height: 30px;
  }
  .top-line {
    cursor: pointer;
    padding: 4px 4px 4px 8px;
    background-color: #cacaca;
    label {
      color: #0c0c0d;
      top: 2px;
      position: relative;
    }
  }
  .botton-line {
    background-color: rgb(194, 111, 111);
    position: absolute;
    bottom: 0px;
    width: 100%;
    input {
      width: 85%;
      padding: 2px 4px 2px 4px;
      font-size: 1.1em;
    }
    button {
      width: 15%;
    }
  }
}
</style>
