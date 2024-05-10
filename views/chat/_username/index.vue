<template>
  <v-container class="container-chat" v-if="!!showView">
    <header class="header-chat">
      <div class="header_icons-chat">
        <img @click="$router.back()"
          style="width: 35px; border-radius: 100%; object-fit: contain; box-shadow: 0px 4px 4px 0px #00000040;"
          src="@/assets/img/button-float/backwhite.png" alt="">
        <div class="icon_text-chat">{{ friend.firstName }}</div>
        <div class="container-avatar" v-if="friend.imagen">
          <img :src="urlBucket + friend.imagen" />
        </div>
        <div class="container-avatar" v-else>
          <img src="@/assets/img/png/user.png" />
        </div>
      </div>
    </header>

    <section class="section-chat">
      <div class="section-message-chat">
        <v-card v-for="(item, index) in messageInfo" :key="index" :class="'bubble-chat ' +
    (item.me ? 'bubble-right-chat' : 'bubble-left-chat')
    " outlined elevation="4" color="#fff" max-width="400">
          <v-card-text>
            <p class="mx-3">{{ item.message }} </p>

            <p class="text-end">
              <v-icon :class="!!item.read ? 'text-readed' : ''" size="20">
                mdi-check-all
              </v-icon>
            </p>
          </v-card-text>
        </v-card>
      </div>

      <form class="form-chat" @submit.prevent="sendMessage">
        <v-text-field outlined dense placeholder="Write ..." v-model="message"></v-text-field>
        <v-btn type="submit" class="btn-chat" icon="" :disabled="!!isLoading || message.length < 1">
          <v-icon color="#fff" size="27"> mdi-send-variant-outline </v-icon>
        </v-btn>
      </form>
    </section>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
// import type { NuxtSocket } from 'nuxt-socket-io';
import emojiRegex from 'emoji-regex'
const imgLink = require("@/assets/img/png/footer/icoLogo.png");

export default {

  data() {
    return {
      friend: {},
      session: {},
      messageInfo: [],
      image: imgLink,
      isLoading: true,
      showView: false,
      socket: null,
      message: "",
      emojis: ""
    };
  },
  computed: {
    urlBucket() {
      return process.env.api_assets_url;
    },
  },
  methods: {
    ...mapActions("user", [
      "usernameAction",
      "nicknameAction",
      "messagesCountAction",
    ]),

    sendMessage() {
      const emoji = this.message
      const encodeemoji = encodeURIComponent(emoji)
      this.isLoading = true;
      const dataSend = {
        idFrom: this.session.id,
        idTo: this.friend.id,
        message: encodeemoji
      };
      // console.log(this.emojis = /\\p{Emoji}/gu.test(this.message));
      console.log("hlameojo", dataSend);

      this.$socket.emit("createMessage", dataSend, (data) => {
        this.message = ""
        this.isLoading = false;
        console.log("smile", data);
      });

    },

    getMessages() {
      const dataGet = {
        userId: this.session.id,
        friendId: this.friend.id,
      };

      this.$socket.emit("findAllMessages", dataGet, (response) => {
        response.map((msg) => {
          const encoded = msg.message
          const decodedUriComponent = decodeURIComponent(encoded)
          console.log("recibid", decodedUriComponent);
          msg.me = msg.userFrom.id == this.session.id ? true : false;
          msg.message = decodedUriComponent
        });
        this.messageInfo = response.reverse();
        this.isLoading = false;
        this.refreshScroll();
      });
    },



    readMessages(getMessages = false) {
      const dataGet = {
        userId: this.session.id,
        friendId: this.friend.id,
      };

      this.$socket.emit("setMessagesRead", dataGet, (response) => {
        setTimeout(() => {
          let countMessages =
            localStorage.getItem("messages") - response.length;
          localStorage.setItem("messages", countMessages);
          if (getMessages) this.getMessages();
        }, 5);
      });
    },
    refreshScroll() {
      if (this.messageInfo.length > 3) {
        // ir al final de pagina
        setTimeout(() => {
          const scroll = document.querySelector(".section-message-chat");
          scroll.scrollTop = scroll.scrollHeight;
        }, 5);
      }
    },
  },
  mounted() {
    this.nicknameAction().then((session) => {
      if (!session) {
        // session necesaria para abrir un chat
        this.$router.push({ path: `/` });
      } else {
        this.session = session;

        this.usernameAction(this.$route.params.username).then((friend) => {
          // obtener id del amigo
          this.friend = friend;
          this.readMessages(true);

          this.$socket.on("newMessageSended", () => {
            this.getMessages();
          });

          this.$socket.on("newMessageResived", () => {
            // Verificar que este dentro del chat para marcar como leido
            // Sigue escuchando una vez que entra en esta vista
            if (this.$route.path == `/chat/${this.friend.username}`)
              this.readMessages(true);
          });
        });

        this.showView = true;
      }
    });
  },
  created() {

  }

};
</script>

<style scoped>
.container-chat {
  position: relative;
  width: 400px;
  height: 100dvh;
  overflow-y: auto;
  padding: 0px;
  background-color: #e9f1f8;
  box-shadow: -2px 2px 20px #0000007a;
  overflow: hidden;
}

.header-chat {
  position: fixed;
  display: flex;
  position: fixed;
  justify-content: space-between;
  background-color: #ffffff;
  height: 70px;
  width: 400px;
  border-bottom-right-radius: 30px;
  z-index: 10;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
}

.header_icons-chat {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  gap: 20px;
  padding: 5px;
}

.icon_text-chat {
  width: 100%;
  font-size: 1.25rem;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #2f4b75;
}

.form-chat {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: #fff;
  box-shadow: 0px 2px 10px 0px rgb(0 0 0 / 50%);
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 20px 0;
  gap: 10px;
  position: absolute;
}

.section-chat {
  width: 100%;
  position: relative;
}

.section-message-chat {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20% 10px 15px;
  width: 100%;
  height: 100dvh;
  padding-bottom: 100px;
  overflow: auto;
}

.section-message-chat::-webkit-scrollbar {
  display: none;
}

.grid-container {
  display: grid;
  grid-template-columns: 20% 65% auto;
  gap: 5px;
  padding: 0px 15px 0px 0px !important;
  height: auto;
}

.container-avatar img {
  border-radius: 100%;
  width: 52px;
  height: 52px;
  padding: 3px;
  box-shadow: 0px 2px 10px 0px rgb(0 0 0 / 50%);
  background-color: #fff;
}

.btn-chat {
  /* background-color: #33A9F2 !important; */
  background-image: linear-gradient(#0a84e8, #13c6de);
  color: white;
  padding: 20px;
}

.text-title {
  color: black;
  text-transform: capitalize;
  font-size: 1rem;
  font-weight: 700;
}

.text-end {
  text-align: right;
}

.text-readed {
  color: #33a9f2;
}

.bubble-chat {
  border: 0;
}

.bubble-left-chat {
  background-color: #fff !important;
  border-radius: 24px 24px 24px 0;
  margin-right: 50px;
}

.bubble-right-chat {
  background-color: rgba(19, 168, 222, 0.3) !important;
  border-radius: 24px 24px 0 24px;
  margin-left: 50px;
}

@media (max-width: 640px) {
  .header-chat {
    width: 100%;
  }

  .bubble-right-chat {
    margin-right: 10px;
  }

  .bubble-left-chat {
    margin-left: 10px;
  }

  .container-chat {
    width: 100%;
  }
}
</style>
