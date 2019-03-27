<template>
  <section class="chat-user-container">
    <button @click="toggleUserChat">Lets Chat!</button>

    <div class="chat-box" v-if="isUserChatOpen" :class="{ 'min-box': isMinimize }">
      <div @click.stop="minimizeChat" class="top-line flex space-between">
        <label>Talk with Omer</label>
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
import msgService from "../services/MsgService.js";

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
    msgService.emit('chat joined', this.currUser.name)

    this.newMsg = msgService.createEmptyMsg();
    this.newMsg.from = this.currUser.name;
    this.msgs = msgService.getMsgs();

    msgService.on('chat newUser', nickName => {
      console.log('New User JOINED', nickName);
    });

    msgService.on('chat historyMsgs', (msgs) => {
      console.log('Got history msg', msgs);
    });

    // msgService.on('chat newMsg', (msg) => {
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
      console.log('sending msg to the server...');
      msgService.send(this.newMsg);
      this.newMsg = msgService.createEmptyMsg();
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
.chat-user-container > button {
  margin: 12px;
  padding: 8px;
}
.chat-box {
  color: #060606;
  position: fixed;
  bottom: 0px;
  left: 222px;
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
