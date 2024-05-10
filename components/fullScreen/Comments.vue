<template>
  <v-row justify="center">
    <v-dialog v-model="show" content-class="contend-comment" con hide-overlay transition="dialog-bottom-transition">
      <v-card style="background-color: #ffffffcc">
        <div class="header-comunnities">
          <div class="header_icons">
            <div class="ripple" @click="close()">
              <img
                style="width: 35px; transform: rotate(270deg); border-radius: 100%; object-fit: contain;     box-shadow: rgba(0, 0, 0, 0.25) -2px 0px 4px 0px;"
                src="@/assets/img/button-float/backwhite.png" alt="">
            </div>
            <div style="color: #2F4B75; font-weight: 600;font-size: 1.25rem; " class="icon_text">
              Comments</div>
            <div style="display: flex; align-items: center; visibility: hidden;">
              <img style="width: 30px; height: 30px; object-fit: cover; " src="" alt="">
            </div>
          </div>
        </div>
        <div class="padre-notifications">
          <div class="padre-comments__container" ref="commentContainer">
            <div v-for="(item, index) in messageInfo" :key="index" ref="comment" class="animation-container-before">
              <v-card outlined shaped elevation="4" color="#fff" dark>
                <v-card-actions :class="{ shadow: 'shadow__' }">
                  <v-list-item class="grid-container">
                    <div class="container-avatar" v-if="item.user.imagen">
                      <img class="avatar-notifications" alt="" :src="urlBucket + item.user.imagen" />
                    </div>
                    <div class="container-avatar" v-else>
                      <img class="avatar-notifications" alt="" src="@/assets/img/png/profile/user_profile_blue.png" />
                    </div>
                    <v-list-item-content>
                      <v-list-item-title>
                        <div>
                          <div class="d-flex justify-space-between align-end">
                            <div class="text-title">
                              {{ item.user.firstName }}
                            </div>
                            <div class="text-date" v-if="item.createdAt">
                              {{ item.createdAt.slice(0, -14) }}
                            </div>
                          </div>

                          <p class="text-message">{{ item.comment }}</p>
                        </div>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-card-actions>
              </v-card>
            </div>
          </div>
          <div class="input-comment">
            <input placeholder="Write a comment..." style="width: 85%" v-model="valueComments"
              :class="valueErros ? 'input-comments-error' : 'input-comments'" class="ml-1" ref="commentText" />
            <v-btn style="background-color: #33a9f2; color: white" @click="sendComment()" :error="false">
              comment
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
const imgLink = require("@/assets/img/png/footer/icoLogo.png");
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("phoneSize", ["windowWidthT"]),
    ...mapState("user", ["userData"]),
    ...mapGetters("user", ["getAccountComents"]),
    urlBucket() {
      return process.env.api_assets_url;
    },
    commentText() {
      return this.$refs.commentText;
    },
  },
  data() {
    return {
      valueComments: "",
      valueErros: false,
      messageInfo: [],
      show: false,
      imgLink,
      viewDetails: false,
      userChallengeInfo: {},
      items: [{ title: "Eliminar Notification" }, { title: "Ver perfil" }],
      animation: {
        status: false,
        beforeAnimation: true,
      },
    };
  },
  methods: {
    ...mapActions("user", ["sumaComments"]),
    toListenWidth() {
      return window.innerWidth;
    },
    async sendComment() {
      if (!this.valueComments) {
        this.valueErros = true;
      } else {
        this.valueErros = false;
        await this.$axios
          .$post("/comment/create", {
            idUserChallenge: this.userChallengeInfo.id,
            idUser: this.userData.id,
            comment: this.commentText.value,
          })
          .then((res) => {
            console.log('res', res)
            this.sumaComments((this.getAccountComents += 1));
            this.messageInfo.push({
              user: {
                firstName: this.getUserData.firstName,
                imagen: this.getUserData.imagen,
              },
              comment: this.commentText.value,
            });
            this.valueComments = "";

            setTimeout(() => {
              this.$refs.comment[this.$refs.comment.length - 1].className =
                "animation-container";
              this.$refs.commentContainer.scrollTop =
                this.$refs.commentContainer.scrollHeight;
            }, 1);
          })
          .catch((err) => console.log("🚧 catch", err));
      }
    },
    close() {
      this.messageInfo = [];
      this.show = false;

      // parche para bug de scroll al abrir comentarios
      if (document.getElementById("scroll-bug"))
        document.getElementById("scroll-bug").style.display = "flex";
      if (document.getElementById("scroll-bug-communities"))
        document.getElementById("scroll-bug-communities").style.display =
          "block";
    },
  },
  created() {
    // parche para bug de scroll al abrir comentarios
    this.$nuxt.$off("openModalComments");
    this.$nuxt.$on("openModalComments", (option) => {
      if (document.getElementById("scroll-bug"))
        document.getElementById("scroll-bug").style.display = "none";
      if (document.getElementById("scroll-bug-communities"))
        document.getElementById("scroll-bug-communities").style.display =
          "none";

      this.show = option.status;
      this.userChallengeInfo = option.data;
      let userID = option.user;

      this.$axios
        .$get("/user/get-by-username/" + this.userData.username)
        .then((response) => {
          this.getUserData = response;
        })
        .catch((err) => console.log("🚧 catch", err));

      this.$axios
        .$post("/user-challenge/get-one", {
          idChallenge:
            this.userChallengeInfo?.challenge?.id || this.userChallengeInfo?.id,
          idUser: this.userChallengeInfo?.user?.id || userID?.id,
        })
        .then((res) => {
          console.log('res', res)
          this.sumaComments(res.comments.length);
          this.messageInfo.push(...res.comments);
          setTimeout(() => {
            this.$refs.comment.forEach((element) => {
              element.className = "animation-container";
            });
            this.$refs.commentContainer.scrollTop =
              this.$refs.commentContainer.scrollHeight;
          }, 1);
        })
        .catch((err) => console.log(err));
    });
  },
};
</script>
<style lang="scss" scoped>
.input-comment {
  margin-bottom: -1px;
  width: 400px;
  display: flex;
  justify-content: space-between;
  padding: 7px;
  gap: 7px;
  position: fixed;
  bottom: 0;
}

.padre-notifications {
  width: 100%;
  height: 100vh;
}

.ripple {
  position: relative;
}

.ripple:active::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: #0b75ab;
  pointer-events: none;
  left: 50%;
  top: 50%;
  animation: ripple 0.3s linear forwards;
}

.header-comunnities {
  display: flex;
  position: fixed;
  justify-content: space-between;
  background-color: #ffffff;
  height: 55px;
  width: 400px;
  border-bottom-right-radius: 30px;
  z-index: 10;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
}



@keyframes ripple {

  0% {
    width: 0;
    height: 0;
    opacity: 0.2;
  }

  100% {
    width: 120px;
    height: 120px;
    opacity: 0;
  }
}

.animation-container-before {
  height: auto;
  opacity: 0;
}

.animation-container {
  opacity: 1 !important;
  transition: opacity 1s;
  transition-timing-function: linear;
}

.grid-container {
  display: grid;
  grid-template-columns: 20% 65% auto;
  gap: 5px;
  padding: 0px 15px 0px 0px !important;
}

.grid-container-animation {
  background: red;
}

.padre-comments__container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
  height: calc(100dvh - 190px) !important;
  overflow-y: auto;
  padding: 10px;
  padding-top: 65px;
}

.padre-comments__container::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

.padre-comments__container::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}

.padre-comments__container::-webkit-scrollbar-thumb {
  background-color: #696868;
}

.container-avatar {
  width: 60px;
  height: 60px;
}

.container-avatar img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: 0px 0px 1px 1px #20202045;
}

.text-title {
  color: black;
  text-transform: capitalize;
  font-size: 1rem;
  font-weight: 700;
}

.text-date {
  color: gray;
  font-size: 0.8rem;
  font-weight: 500;
}

.text-message {
  color: #8a8a8a;
  width: 100%;
  white-space: normal;
  margin: 5px 0;
}

.container-rigth {
  display: flex;
}

.container-rigth__number {
  width: 25px;
  height: 25px;
  background-color: #2ec96e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 2px 2px #20202045;
}

.container-rigth__number div {
  font-weight: 600;
  font-size: 10px;
}

.container_IMG {
  display: flex;
  justify-content: center;
  align-items: center;
}

.T_img {
  width: 36px;
  height: 41px;
}

.container-details {
  display: flex;
  gap: 20px;
  padding: 10px;
  align-items: center;
}

.container-details__options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.container-details__options-text {
  text-align: left;
  width: 60%;
  font-weight: 700;
  text-transform: capitalize;
}

.container-message {
  width: 100%;
  box-shadow: 1px 1px 12px -2px #bbbbbb;
  padding: 20px;
  margin: 20px;
  inline-size: auto;
}

.input-comments {
  border: 1px solid gray;
  padding-left: 5px;
}

.input-comments-error {
  border: 2px solid red;
}

.header_icons {
  width: 100%;
  display: flex;
  height: 100%;
  align-items: center;
  gap: 20px;
  padding: 5px;
  justify-content: space-between;

}

@media (max-width: 640px) {
  .input-comment {
    width: 100%;
  }

  .header-comunnities {
    width: 100%;
  }
}
</style>
<style>
.contend-comment {
  width: 400px !important;
  max-height: 100% !important;
  margin: 0;
}

@media (max-width: 640px) {

  .contend-comment {
    width: 100% !important;
    max-width: 100%;
    height: 100dvh;

  }
}
</style>
