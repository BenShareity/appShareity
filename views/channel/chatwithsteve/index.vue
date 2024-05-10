<template>
  
  <LoadingLogo v-if="loadingSteve"/>
    <div class="container-chat-with-steve" v-else-if="chatSteveMessage.length > 0">
    <div class="container-chat-steve" >
      <div class="h-steve-information">
        <div class="info-steve">
          <div class="steve--">
            <v-btn width="35px" height="35px"fab dark color="#33a9f2b3" @click="$router.push('/channel')">
              <v-icon size="24px" dark> mdi-arrow-left </v-icon>
            </v-btn>
            <div class="about-steve">
              <span>Steve</span>
              <p>Hello, I'm Steve</p>
            </div>
            <div class="container-image-steve">
              <img class="image-steve" :src="require('~/assets/img/png/channel/chat-steve.png')" alt="">
            </div>
          </div>
        </div>
      </div>

      <div class="chat-steve">
        <div class="container-message">
          <v-card v-for="(item, index) in chatSteveMessage" :key="index" :class="'bubble-chat ' +
    (item.me ? 'bubble-right-chat' : 'bubble-left-chat')
    " outlined elevation="4" color="#fff" max-width="400" class="top--">
            <v-card-text class="message-for-steve">
              <!-- <div>
                <div>
                  <img :src=" urlBucket + item.userFrom.imagen">
                </div>
              </div> -->
              <span>{{ item.message }}</span>

            </v-card-text>
          </v-card>
        </div>
      </div>
      <div class="container-send-message">
        <div class="send-message-box">
          <input type="text" placeholder="Write a message" v-model="message" class="input-send-message-steve" />
          <button @click="sendMessage" class="button-message-steve">
            <v-icon color="#fff" size="27"> mdi-send-variant-outline </v-icon>
          </button>
        </div>
      </div>
    </div>
  </div>

  <v-container class="container" v-else>
    <v-container>
      <v-row justify="center" align="center" class="cstitle d-flex flex-column mt-6">
        Chat With Steve
        <v-img class="mt-4" height="147" width="128" :src="require('~/assets/img/png/channel/chat-steve.png')"></v-img>
      </v-row>

      <v-row class="coment-text">
        We didn’t just create a platform to share charity, we created a platform
        for the people - where everyone who participates owns a piece of the
        project.
      </v-row>

      <v-col class="pt-5">
        <v-text-field label="WHAT'S ON YOUR MIND?" v-model="message" solo></v-text-field>
        <v-row justify="center" class="post-abs">
          <button style="
      position: relative;
    top: 34px;
    background: rgb(200 199 204);
    font-size: 19px;
    color: white;
    width: 78px;
    height: 77px;
    border-radius: 56%;
          
          " @click="sendMessage">SEND</button>
          <!-- <v-btn fab dark large color="#c8c7cc" p> SEND </v-btn> -->
        </v-row>
      </v-col>
    </v-container>

    <v-btn class="button-close" width="45px" height="45px" fab dark color="#33a9f2b3" @click="$router.push('/channel')">
      <v-icon size="25px" dark> mdi-arrow-left </v-icon>
    </v-btn>
  </v-container>
  


</template>

<script>
import { mapActions } from "vuex";
import LoadingLogo from '@/components/loader/LoadingLogo.vue';
export default {
  components: {

    LoadingLogo,
    
  },
  layout(context) {
    return "App";
  },
  data() {
    return {
      message: "",
      session: {},
      idSteve: 1,
      socket: null,
      isLoading: true,
      chatSteveMessage: [],
      information: {},
      loadingSteve: false
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
      console.log("Hola");
      const emoji = this.message
      const encodeemoji = encodeURIComponent(emoji)
      const dataSend = {
        idFrom: this.session.id,
        idTo: this.idSteve,
        message: encodeemoji
      }
      this.$socket.emit('createMessage', dataSend, (data) => {
        if (data) {
          console.log(data);
          this.message = ''
          this.getMessage()
        } 
      })
    },
    getMessage() {
      const dataSendGet = {
        userId: this.session.id,
        friendId: this.idSteve,
      }
      this.$socket.emit('findAllMessages', dataSendGet, (get) => {
        this.loadingSteve = true
        get.map((msg) => {
          const encoded = msg.message
          const decodedUriComponent = decodeURIComponent(encoded)
          console.log("recibid", decodedUriComponent);
          msg.me = msg.userFrom.id == this.session.id ? true : false;
          msg.message = decodedUriComponent
        })
        if (get) {
          this.chatSteveMessage = get.reverse()
          this.loadingSteve = false
          this.newMessageRefreshScroll()
          
        } else {
          console.log("No");
        }

      
      })
    },
    newMessageRefreshScroll(message){
      setTimeout(() => {
        const scrolling = document.querySelector('.container-message')
  
      scrolling.scrollTop = scrolling.scrollHeight
      
        }, 5);
  },
  },
  mounted() {
    this.loadingSteve = true
    this.nicknameAction().then((session) => {
      this.session = session;
      // if (this.information) { 
      //   console.log(this.information);
      // }
     
      this.getMessage()
      this.$socket.on("newMessageResived", () => {
        console.log("Steve te mando un mensaje");
        this.getMessage()
      })
    });
  },
};
</script>
<style lang="scss" scoped>
.edit-modal {
  background: #2384f2;
  height: 100vh;
}

.container {
  padding: 60px 20px;
  font-family: "robotobold_condensed" !important;
  color: white;
  position: relative;
  z-index: 150;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  background: #2384f2;
}

.cstitle {
  font-size: 14px;
  text-transform: uppercase;
}


.coment-text {
  font-size: 18px;
  margin-top: 8%;
  text-align: center;
  line-height: 1.4;
  padding: 10px 50px 0px;
}
.top--{
  position: relative;
  top: 651;
}
.v-text-field.v-text-field--solo .v-input__control {
  min-height: 120px;
  max-width: 90%;
  padding: 0;
  margin: auto;
}

.v-input__slot {
  align-items: flex-start;
}

.v-input {
  text-align: center;
}

.v-text-field__details {
  display: none;
}

.v-text-field.v-text-field--solo .v-label {
  top: calc(50% - 7px);
  left: 0 !important;
  right: 0 !important;
}

.v-text-field fieldset,
.v-text-field .v-input__control,
.v-text-field .v-input__slot {
  border-radius: 10px;
}

.v-text-field .v-label {
  max-width: 100%;
}

.v-btn--fab.v-size--large {
  height: 80px;
  width: 80px;
}

.v-btn.v-size--large {
  font-size: 1rem;
}

.post-abs {
  margin-top: -46px;
}
.button-close {
  position: fixed;
  bottom: 2%;
  z-index: 200;

}
.info-steve{
  display: flex;
height: 100%;
align-items: center;
padding-left: 10px
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

.container-chat-with-steve {
  position: relative;
  z-index: 10000000000000;
  background-color: snow;
}
.h-steve-information{
   width: 100%;
    height: 75px;
    box-shadow: 1px 1px 7px 1px #bdbdbd;
    position: relative;
    z-index: 1;
}
.message-for-steve {
  margin: 10px;
}
.container-chat-steve {
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column
}
.steve--{
  display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
}
.about-steve{
  display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.about-steve span{
  font-size: 20px;
}
.about-steve p{
  margin: 0;
    font-size: 11px;
    color: #acaaaa;
}
.container-image-steve{
  width: 17%;
    height: 67px;
}
.image-steve{
  width: 100%;
    height: 100%;
    object-fit: fill;
}
.chat-steve {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.container-message {
  overflow: auto;

  height: 100%;
  padding: 10px;
}

.container-send-message {
  width: 100%;
  box-shadow: 1px 1px 7px 1px #80808078;
  position: relative;
  border-radius: 13px;

}

.send-message-box {
  padding: 6px;
}

.input-send-message-steve {
  padding: 5px;
  width: 91%;
  outline: #13c6de;
  border-radius: 9px;
  background: #b2b2b230;
}

.button-message-steve {
  background-image: linear-gradient(#0a84e8, #13c6de) !important;
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
