<template>
  <section class="chat-user-container">
    <button class="btn-chat" @click="toggleUserChat">
      Lets Chat!
      <i class="far fa-comments"></i>
    </button>

    <div class="chat-box" v-if="isUserChatOpen" :class="{ 'min-box': isMinimize }">
      <div @click.stop="minimizeChat" class="top-line flex space-between">
        <label>Chat with EveryOne!</label>
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
import SocketService from "../services/SocketService.js";

export default {
  name: 'userChat',
  data() {
    return {
      isUserChatOpen: false,
      isMinimize: false,
      msgs: [],
      nickName: 'omererrerer123124124523',
      newMsg: null
    };
  },
  created() {
    // this.nickName = prompt('Write your name!', 'User1');
    SocketService.emit('chat joined', this.currUser.name)

    this.newMsg = SocketService.createEmptyMsg();
    this.newMsg.from = this.currUser.name;
    this.msgs = SocketService.getMsgs();

    SocketService.on('chat newUser', nickName => {
      // console.log('New User JOINED', nickName);
    });

    SocketService.on('chat historyMsgs', (msgs) => {
      // console.log('Got history msg', msgs);
    });

    // SocketService.on('chat newMsg', (msg) => {
    //   // msg.from = this.currUser.name;
    //   console.log('Got new msg', msg);
    //   this.msgs.push(msg);
    // })

  },
  computed: {
    viewUser() {
      return this.$store.state.usersModule.viewUser;
    },
    currUser() {
      return this.$store.state.usersModule.currUser;
    },
  },
  methods: {
    msgClass(msg) {
      return (msg.from !== this.nickName) ? 'received' : 'sent';
    },
    send() {
      // console.log('sending msg to the server...');
      SocketService.send(this.newMsg);
      this.newMsg = SocketService.createEmptyMsg();
      this.newMsg.from = this.currUser.name;
    },
    toggleUserChat() {
      this.isUserChatOpen = !this.isUserChatOpen;
      this.isMinimize = false;
    },
    minimizeChat() {
      this.isMinimize = !this.isMinimize;
    },
  },
}
</script>

<style lang="scss" scoped>
.chat-user-container{
  margin-bottom: 10px;
}
.btn-chat {
  color: white;
  padding: 7px 14px;
  cursor: pointer;
  border: 1px solid white;
  border-radius: 3px;
  outline: none;
  background-color: #1a181800;
  transition: 0.3s;
  margin: 20px;
  &:hover {
    color: #3481b4;
    background-color: #1a1818;
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
