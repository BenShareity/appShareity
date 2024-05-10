<template>
  <LoadingLogo v-if="loading" data-app />
  <div v-else class="container-route">
    <div class="padre" v-if="view">
      <div class="container-media" v-if="view">
        <div v-if="showModalTime" class="modal-tutorial">
          <div class="modal-tutorial-padre">
            <div class="padre-text">
              <div class="padre-text__title">GET READY!</div>
              <div class="animation1" style="color: white;">
                <div>It's as simple as :</div>
              </div>
              <div class="padre-text__title-items animation1">
                <div class="items-number">1</div>
                <div class="items-text-padre">
                  <div class="items-text-padre__title"> SNAP </div>
                  <div class="items-text-padre__title__text">Take a pic/vid doing the challenge</div>
                </div>
              </div>
              <div class="padre-text__title-items animation2">
                <div class="items-number">2</div>
                <div class="items-text-padre">
                  <div class="items-text-padre__title">RAISE</div>
                  <div class="items-text-padre__title__text"> Raise money as your Brand donates because of you</div>
                </div>
              </div>
              <div class="padre-text__title-items animation3">
                <div class="items-number">3</div>
                <div class="items-text-padre">
                  <div class="items-text-padre__title">SHARE</div>
                  <div class="items-text-padre__title__text"> Share your challenge with friends and family to raise more
                  </div>
                </div>
              </div>
            </div>
            <div class="padre-button">
              <v-btn color="#33A9F2" @click="closeModalTime" class="button-secons">GOT IT! ({{ timeModalSecunds }}
                SECS)</v-btn>
            </div>
          </div>
        </div>
        <Header :item="userChallengeInfo" data-app />
        <div class="container-videoEimage">
          <div v-if="userChallengeInfo.resource.id === 3 || userChallengeInfo?.typeMedia == 'mp4'" class="overlay-bg"
            @click="play()"></div>
          <div v-else class="overlay-bg"></div>
          <div v-if="userChallengeInfo.resource.id === 3 || userChallengeInfo?.typeMedia == 'mp4'" class="video-url">
            <v-icon id="icon-none" class="video-search-play" v-if="!stateVideo" color="white" @click="play()"
              size="100">
              mdi-play-circle
            </v-icon>
            <video class="video-search-video" preload="auto" @click="play()" muted playsinline
              style="object-fit: cover !important; " :poster="urlBucket + userChallengeInfo.photoUrl"
              :src="urlBucket + userChallengeInfo.url" ref="myvideo">
            </video>
          </div>
          <div v-else>
            <img :src="urlBucket + userChallengeInfo.url" alt="">
          </div>
          <div class="center-buttons">
            <div class="text-description" v-if="!stateVideo" style="font-family: sans-serif; z-index: 200; ">
              <p style=" color: white; font-size: larger; text-align: left; padding: 0px 20px; ">{{
    userChallengeInfo.description }}</p>
            </div>
            <div>
              <v-btn v-if="userChallengeInfo.challengeUser" class="button-go" @click="goRoute">
                <v-icon left> mdi-camera </v-icon>
                Go to Shareity!
              </v-btn>
              <template v-else>
                <AcceptChallenge v-if="userChallengeInfo?.status === 1 && userChallengeInfo?.endDate" from="Challenge"
                  :item="userChallengeInfo" :iconPlay="!stateVideo" :userProps="userId" />
              </template>
              <div>
                <p class="terms">
                  By clicking you accept the <span @click="$nuxt.$emit('UseTerms2', true)">Terms of Use</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- <UseTerms1 data-app /> -->
    <UseTerms2 data-app />
    <UseTerms3 data-app />
    <UseTermsVideo />
    <FullScreenLoginChallenge data-app />
    <Login data-app />

  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Loading from "@/components/Loading.vue";
import Header from '@/components/fullScreen/Header.vue'
import AcceptChallenge from "@/components/fullScreen/AcceptChallenge.vue";
import FullScreenLoginChallenge from "@/components/FullScreenLoginChallenge";
import Login from "@/components/Login";
import UseTerms1 from "@/components/UseTerms1.vue";
import UseTerms2 from "@/components/UseTerms2.vue";
import UseTerms3 from "@/components/UseTerms3.vue";
import LoadingLogo from "@/components/loader/LoadingLogo.vue";
export default {
  components: {
    Loading,
    Header,
    AcceptChallenge,
    Login,
    FullScreenLoginChallenge,
    UseTerms1,
    UseTerms2,
    UseTerms3,
    LoadingLogo
  },
  data() {
    return {
      userChallengeInfo: "",
      isPlaying: false,
      isActive: true,
      infoChallenge: "",
      view: false,
      img: "",
      stateVideo: false,
      option: {
        mode: "fill",
        textBaseline: "middle",
        font: "15px Arial",
        fillStyle: "#20d6fe",
        content: "SHAREITY",
        rotate: 45,
        fontWeight: "800"
      },
      source: null,
      active: false,
      activeFullScreen: false,
      dispositivo: false,
      userId: null,
      timeModalSecunds: 15,
      showModalTime: false,
      clearTime: false,
      loading: true
    };
  },

  async asyncData({ params, $axios }) {
    return $axios.get(`/challenge/get-by-id/${params.idChallenge}`)
      .then((res) => {
        console.log('res', res)
        return {
          info: res.data
        }
      })
  },


  head(vm) {
    return {
      title: vm.info.shareMessage,
      meta: [
        {
          hid: "og-title",
          property: "og:title",
          content: vm.info.shareMessage,
        },
        { hid: "og-type", property: "og:type", content: "website" },
        {
          hid: "og-desc",
          property: "og:description",
          /*  content: `Join me in doing Good! Accept my ${vm.info.name} challenge and share with friends!`, */
          content: vm.info.shareMessage,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          href: this.urlBucket + vm.info.lowPhotoUrl,
          content: this.urlBucket + vm.info.lowPhotoUrl,
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: this.urlBucket + vm.info.lowPhotoUrl,
        },
        {
          hid: "og-image",
          property: "og:image",
          itemprop: "image",
          content: this.urlBucket + vm.info.lowPhotoUrl,
        },
        {
          property: "og:site_name",
          content: "Accept the gtesr challenge",
        },
        {
          property: "og:type",
          content: "article",
        },
        {
          property: "og:updated_time",
          content: "1440432930",
        },
        {
          property: "og:url",
          content: "https://chgsdev.shareity.com",
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          hid: "twitter:site",
          name: "twitter:site",
          content: "@shareityapp",
        },
        {
          hid: "twitter:creator",
          name: "twitter:creator",
          content: "@shareityapp",
        },
        {
          hid: "twitter:type",
          name: "twitter:type",
          content: "website",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: `Accept the ${vm.info.name} challenge`,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: vm.info.shareMessage,
        },
      ],
    };
  },
  watch: {
    // whenever question changes, this function will run
    isPlaying(value) {
      if (value) {
        this.$refs.myvideo.play();
        this.$refs.myvideo.muted = false;
        this.stateVideo = true
      }
      else {
        this.$refs.myvideo.pause();
        this.stateVideo = false
        this.$refs.myvideo.muted = true;
      }
    },
  },
  computed: {
    ...mapState("phoneSize", ["windowWidthT", "windowLeftT"]),
    ...mapGetters("userChallenge", ["getUserChallengeInfo"]),
    urlBucket() {
      return process.env.api_assets_url;
    },
  },
  methods: {
    ...mapActions("userChallenge", ["userChallengeAction"]),
    ...mapActions("phoneSize", ["onRezise"]),
    ...mapActions("user", ["nicknameAction"]),
    play() {
      this.isPlaying = !this.isPlaying;
    },
    opneModalComunnities() {
      this.$router.push({ path: "/mycommunities", query: { name: this.userChallengeInfo.name, idchallenge: this.$route.query.idchallenge, img: this.userChallengeInfo.image } });
    },
    openFullScren() {
      this.activeFullScreen = !this.activeFullScreen
    },
    goRoute() {
      if (this.userId) {
        this.$router.push({ path: `/challenges/${this.userChallengeInfo.id}/communities` })
      }

    },
    closeVideo() {
      this.activeFullScreen = false

    },
    openSharedModal() {
      if (this.isActive === false) {
        this.isActive = true;
      }
      else {
        this.isActive = false;
      }
      if (this.isActive === true) {
        this.isActive = false;
      }
      else {
        this.isActive = true;
      }
    },
    async toDataURL(url) {
      return fetch(url)
        .then((response) => {
          return response.blob();
        })
        .then((blob) => {
          return URL.createObjectURL(blob);
        });
    },
    async download(url, name = "download", type = "png") {
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = await this.toDataURL(url);
      a.download = name + "." + type;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    closeModalTime() {
      this.showModalTime = false
      this.timeModalSecunds = 0
    },
    timeModal() {
      if (this.timeModalSecunds > 0) {
        this.showModalTime = true
        setTimeout(() => {
          this.timeModalSecunds -= 1
          this.timeModal()
        }, 1000)
      } else {
        this.showModalTime = false
      }

    }
  },
  beforeUpdate() {
    if (this.userId) {
      this.userId.userChallenges.forEach((element) => {
        if (element.challenge.id === this.userChallengeInfo.id) {
          this.userChallengeInfo.challengeUser = true;
        }
      });
    }
  },

  created() {
    if (process.client) {
      this.loading = true
      this.nicknameAction()
        .then(user => {
          this.userId = user
        })
      this.timeModal()
      this.onRezise();
      window?.addEventListener("resize", () => {
        this.onRezise();
      });
      this.active = true;
      this.$axios
        .$get(`/challenge/get-by-id/${this.$route.params.idChallenge}`)
        .then(res => {
          console.log('res', res)
          res.typeMedia = res.url.split("?")[0].split("#")[0].split('.').pop();
          res.challengeUser = false;
          this.userChallengeInfo = res;
          this.view = true;
          this.$nuxt.$emit("openModalShareFriends", this.userChallengeInfo);
          this.loading = false
        })
        .catch(err => console.log(err));
      this.active = false;
      this.loading = false
    }
  },

};
</script>

<style scoped>
.container-route {
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  position: relative;
  height: 100dvh;
  overflow: hidden;
}

.center-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-direction: column;
  position: absolute;
  bottom: 2%;
  z-index: 100;
}

.overlay-bg {
  position: absolute;
  width: 100%;
  height: 50%;
  z-index: 20;
  opacity: 1;
  background-image: linear-gradient(179deg, transparent, rgba(0, 0, 0, .86));
  bottom: 0;
}

.padre {
  padding: 0;
  background: rgba(0, 0, 0, 0.7098);
  overflow: hidden;
  width: 400px;
  position: fixed;
  top: 0;
  height: 100%;
}

.text-description {
  animation: fadetext 0.3s alternate both;
}

@keyframes fadetext {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }

}

.terms {
  color: white;
  font-size: 12px;
  opacity: 0.7;
  font-weight: 500;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: 20px;
}

.terms span {
  color: #33a9f2;
}

.fullScreen-video {

  height: 100vh;
  background-color: black;
  position: absolute;
  top: 0;
  z-index: 999999999;
}

.icon-preview {
  color: white;
  font-size: 70px;
}

.container-media {
  height: 100%;
  position: relative;
}

.container-videoEimage {
  height: 100%;
  display: flex;
  justify-content: center;

}

.video-search-video {
  width: 100%;
  height: 100%;
}

.video-url {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-search-play {
  position: absolute;
  top: 0;
  z-index: 1;
  right: 15px;
  bottom: 0;
  left: 0;
  color: white;
}

.video-search-pause {
  position: absolute;
  top: 0;
  z-index: 1;
  right: 15px;
  bottom: 0;
  left: 0;
  color: white;
}

.img__full {
  width: 100%;
  object-fit: cover;
  height: 100%;
}

.modal-tutorial {
  width: 100%;
  height: 100dvh;
  background-color: #092037c4;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999999999;

}

.modal-tutorial-padre {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
}

.padre-text {
  height: 85%;
  padding: 0px 17px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  flex-direction: column;

}

.padre-text__title {
  font-size: 2.5rem;
  color: white;
  font-weight: 700;
  font-family: poppinsbold;
  animation: fadeInRight 0.5s ease-in-out;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(300px);
  }

  to {
    opacity: 1;
  }
}

.padre-text__title-items {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.animation1 {
  animation: fadeInRightText 1s ease-in-out;
}

@keyframes fadeInRightText {
  from {
    opacity: 0;
    transform: translateX(300px);
  }

  to {
    opacity: 1;
  }
}

.animation2 {
  animation: fadeInRightText2 1.3s ease-in-out;
}

@keyframes fadeInRightText2 {
  from {
    opacity: 0;
    transform: translateX(300px);
  }

  to {
    opacity: 1;
  }
}

.animation3 {
  animation: fadeInRightText3 1.6s ease-in-out;
}

@keyframes fadeInRightText3 {
  from {
    opacity: 0;
    transform: translateX(300px);
  }

  to {
    opacity: 1;
  }
}

.items-number {
  color: white;
  font-size: 4rem;
  display: flex;
  font-weight: 700;
  justify-content: center;
  align-items: center;
}

.items-text-padre {
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 10px;
}

.items-text-padre__title {
  color: white;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  font-family: poppinsbold;
}

.items-text-padre__title__text {
  color: white;
  text-align: center;
  font-size: 18px;
}

.padre-button {
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeInRightText2 1.9s ease-in-out;
}

@keyframes fadeInRightText {
  from {
    opacity: 0;
    transform: translateX(300px);
  }

  to {
    opacity: 1;
  }
}

video #backgroundvid {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
  /* background: url(polina.jpg) no-repeat; */
  background-size: cover;
}

.button-secons {
  background: linear-gradient(0deg, rgba(#0A84E8, 1) 0%, rgba(#13A7DE, 1) 100%);
  width: 80% !important;
  height: 50px !important;
  border-radius: 20px;
  color: white;
  font-family: poppinsbold;
}

.full-screen {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  /*  a {
    position: relative;
  } */
}

.container-svg {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.full-screen_ios {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-close {
  position: absolute;
  z-index: 999999999999;
  color: white;
  top: 0;
  right: 0;
  padding: 30px;
}

.header {
  height: 130px;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 10;
}

.header-top {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25%;
  background-color: black;
}

.header-top-title {
  font-size: 1.3rem;
  color: white;
  width: 100%;
  text-align: center;
  font-size: medium;
  font-weight: 700;
  font-family: sans-serif;
}

.header-description {
  padding: 7px 15px 20px 15px;
  position: relative;
  height: 75%;
  background: rgba(255, 255, 255, 0.688);
  -webkit-border-bottom-right-radius: 15px;
  -webkit-border-bottom-left-radius: 15px;
  -moz-border-radius-bottomright: 15px;
  -moz-border-radius-bottomleft: 15px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
}


.header-description-items {
  display: grid;
  grid-template-columns: 25% auto auto auto;
}

.header-description-item span {
  font-size: medium;
  font-weight: 700;
  font-family: sans-serif;
}

.header-description-item {
  display: flex;
  flex-direction: column;
  gap: 20%;
  padding-top: 7px;
  text-align: center;
}

.header-description-item img {
  width: 60px;
  object-fit: cover;
}

.header-description-item h1 {
  font-size: 15px;
  text-align: center;
}

.button-go {
  color: white;
  height: 45px;
  border-radius: 10px;
  text-transform: uppercase;
  font-weight: 700;
  background: linear-gradient(0deg, #33A9F2, #13A7DE);
  font-size: medium;
  font-weight: 700;
  font-family: sans-serif;
}

@media(max-height:700px) {

  .padre-text {
    gap: 0px;
  }

}

@media(max-width:640px) {
  .padre {
    padding: 0;
    margin: 0 auto;
    overflow: hidden;
    width: 100% !important;
  }

  /* 
  .full-screen {
    height: calc(100% - 15%);
  } */

  .items-number {

    font-size: 3rem;
  }

  .container-media {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .media-video {
    margin: 0 auto;
    position: relative;
    z-index: 9999999999999999;
    height: calc(100vh - 10%);
  }

  .fullScreen-video {
    width: 100%;
    height: 100vh;
    background-color: black;
    position: absolute;
    top: 0;
    z-index: 999999999;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

}
</style>