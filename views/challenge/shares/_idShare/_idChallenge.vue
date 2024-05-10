<template>
  <div>
    <LoadingLogo v-if="loading" data-app />
    <v-container v-else class="padre">
      <div class="container-media">
        <Header :item="dataChallange" data-app />
        <div class="container-videoEimage">
          <div class="overlay-bg" @click="play()"></div>
          <template v-if="dataChallange?.resource?.id === 3">
            <v-icon id="icon-none" class="video-url-play" v-if="!stateVideo" @click="play()" size="100">
              mdi-play-circle
            </v-icon>
            <video class="video-url-video" preload="auto" @click="play()" muted playsinline
              style="object-fit: cover !important; " :poster="urlBucket + dataChallange?.photoUrl"
              :src="urlBucket + dataChallange?.url" ref="myvideo"></video>
          </template>
          <div class="container-videoEimage__img" v-else>
            <img :src="urlBucket + dataChallange?.url" alt="" />
          </div>
          <div class="center-buttons">
            <div v-if="!stateVideo" style="font-family: sans-serif;">
              <p class="text-description" style="color: white; text-align: left; padding: 0px 20px">
                {{ dataChallange?.description }}
              </p>
            </div>
            <template v-if="this.$route.query.twilio && userId?.id">
              <div v-if="dataChallange?.challengeUser" class="btn-c">
                Challenge Completed!
              </div>
              <v-btn v-else class="btn-challenge">
                <v-icon size="26" left> mdi-camera </v-icon>
                <span>Accept the Challenge!</span>
                <div v-if="dataChallange?.resource?.id === 3">
                  <input class="ocultar-button" type="file" ref="imageUploader"
                    @change="onFileTwilio($event, dataChallange)" accept="video/*" />
                </div>
                <div v-else>
                  <input class="ocultar-button" type="file" ref="imageUploader"
                    @change="onFileTwilio($event, dataChallange)" accept="image/*" />
                </div>
              </v-btn>
            </template>
            <div v-else class="button-shared">
              <div v-if="dataChallange?.challengeUser" class="btn-c">
                Challenge Completed!
              </div>
              <div v-else>
                <AcceptChallenge v-if="dataChallange?.status === 1 && dataChallange?.dateNow" from="Challenge"
                  :item="dataChallange" :userProps="userId" :iconPlay="!stateVideo ? true : false" :isShared="idLink" />
                <div v-else class="btn-c" style="width: 100%;">
                  Cannot Do this Challenge
                </div>
              </div>
            </div>
            <p v-if="!userId" class="terms">
              By clicking you accept the <span @click="$nuxt.$emit('UseTerms2', true)">Terms of Use</span>
            </p>
            <!--  <div class="go-button" @click="goRoute(dataChallange)">
              <v-btn class="button-go"> Go to Shareity! </v-btn>
            </div> -->
          </div>
          <video :src="urlBucket + dataChallange?.url" alt="" />


          <!--  <LoadingChallenge :active="true" :progress="progress" /> -->
        </div>
      </div>
      <FullScreenLoginChallenge data-app />
      <Login data-app />
      <!--  <UseTerms1 data-app /> -->
      <UseTerms2 data-app />
      <UseTerms3 data-app />
      <UseTermsVideo />
    </v-container>
    <ModalUserName data-app />
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import AcceptChallenge from "@/components/fullScreen/AcceptChallenge.vue";
import Loading from "@/components/Loading.vue";
import Login from "@/components/Login";
import FullScreenLoginChallenge from "@/components/FullScreenLoginChallenge";
import Header from "@/components/fullScreen/Header.vue";
import LoadingChallenge from "@/components/LoadingChallenge.vue";
import LoadingLogo from "@/components/loader/LoadingLogo.vue";
export default {
  components: {
    Loading,
    AcceptChallenge,
    LoadingChallenge,
    Login,
    FullScreenLoginChallenge,
    Header,
    LoadingLogo
  },

  async asyncData({ params, $axios }) {
    let dataInfo = await $axios.$get("/challenge/get-by-id/" + params.idChallenge)
    return { dataInfo };
  },
  data(vm) {
    return {
      dataInfo: "",
      dataChallange: null,
      isPlaying: false,
      isActive: true,
      loadingChallenge: false,
      progress: 0,
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
        fontWeight: "800",
      },
      source: null,
      active: false,
      activeFullScreen: false,
      dispositivo: false,
      userId: null,
      idLink: "",
      loading: false,
    };
  },
  head(vm) {
    return {
      title: vm.dataInfo.shareMessage,
      meta: [
        {
          hid: "og-title",
          property: "og:title",
          content: vm.dataInfo.shareMessage,
        },
        { hid: "og-type", property: "og:type", content: "website" },
        {
          hid: "og-desc",
          property: "og:description",
          content: `${vm.dataInfo.description}`,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          href: this.urlBucket + vm.dataInfo.lowPhotoUrl,
          content: this.urlBucket + vm.dataInfo.lowPhotoUrl,
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: this.urlBucket + vm.dataInfo.lowPhotoUrl,
        },
        {
          hid: "og-image",
          property: "og:image",
          itemprop: "image",
          content: this.urlBucket + vm.dataInfo.lowPhotoUrl,
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
          content: `Accept the ${vm.dataInfo.name} challenge`,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: `${vm.dataInfo.description}`,
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
        this.stateVideo = true;

      } else {
        this.$refs.myvideo.pause();
        this.$refs.myvideo.muted = true;
        this.stateVideo = false;
      }
    },
  },
  computed: {
    ...mapState("phoneSize", ["windowWidthT", "windowLeftT"]),
    ...mapGetters("userChallenge", ["getUserChallengeInfo"]),
    urlBucket() {
      return process.env.api_assets_url;
    },
    application() {
      return {
        name: this.applicants.name,
        status: null,
        company: null,
        role: this.applicants.role,
        // user: this.loggedInUser.id
      };
    },
  },
  methods: {
    ...mapActions("userChallenge", ["userChallengeAction"]),
    ...mapActions("phoneSize", ["onRezise"]),
    ...mapActions("user", ["nicknameAction"]),
    onFileTwilio(e, data) {
      console.log('e', e)
      console.log('data', data)
      console.log('this.idLink', this.idLink)
      console.log('this.userId', this.userId)
      this.$nuxt.$emit("openUserName", [true, e, data, this.idLink, this.userId, 'Challenge']);
    },
    play() {
      this.isPlaying = !this.isPlaying;
    },
    goRoute(info) {
      this.$router.push({ path: "/" });
    },
    playAndPause() {
      if (!this.$refs.videoFULL.paused) {
        this.$refs.videoFULL.pause();
      } else {
        this.$refs.videoFULL.play();
      }
    },
  },
  created(vm) {
    this.loading = true
    if (process.client) {
      this.dataChallange = null
      this.idLink = this.$route.params;

      this.$axios.$get("/stats/Challenge/ViewShare/" + this.$route.params.idShare)
        .then((res) => {
          this.dataChallange = res
          let fechaVieja;
          let fechaNueva;
          fechaNueva = new Date()
          fechaVieja = new Date(res.endDate)
          res["challengeUser"] = false;
          let result = fechaVieja > fechaNueva
          res["dateNow"] = result
          this.dataChallange = res
          if (this.dataChallange) {
            this.nicknameAction().then((user) => {
              console.log('user', user)
              this.userId = user;
              user.userChallenges.forEach((element) => {
                if (element.challenge.id === this.dataChallange.id)
                  this.dataChallange.challengeUser = true;
                return this.dataChallange;
              });
              this.loading = false
            });
          }
          this.loading = false
        })
    }
  },
};
</script>

<style scoped>
.padre {
  padding: 0;
  background: #000000b5;
  height: 100dvh;
  width: 400px;
  overflow: hidden;
}

.btn-opacity {
  opacity: 0.5;
  transition: all linear 0.5;
}

.btn-challenge {
  color: white;
  height: 45px !important;
  border-radius: 10px;
  text-transform: uppercase;
  font-weight: 700;
  background: linear-gradient(90deg, #12A4DB 0%, #044F85 100%);

  font-family: sans-serif;
}

.center-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-direction: column;
  position: absolute;
  bottom: 2%;
  z-index: 100;
  width: 100%;
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


.ocultar-button {
  width: 242px;
  height: 43px;
  opacity: 0;
  position: absolute;
  left: -15px;
  top: -12px;
  background: aqua;
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

.terms {
  color: #fff;
  bottom: 3%;
  font-size: 12px;
  z-index: 90;
  bottom: 8px;
  opacity: .7;
  font-weight: 500;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 5px;
  gap: 5px;
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

.video-url-video {
  width: 100%;
  height: 100%;
}

.go-button {
  position: relative;
  width: 100%;
  text-align: right;
  padding: 0px 20px;
  z-index: 200;
}

.button-shared {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bg_grad {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0);
  background: linear-gradient(174deg, rgba(0, 0, 0, 0) 38.9%, rgba(0, 0, 0, 1));
  top: 0;
  left: 0;
  z-index: 10;
}

.btn-c {
  color: #fdfdfd;
  border-radius: 10px;
  text-transform: uppercase;
  font-weight: 700;
  background: #919191 !important;
  font-family: sans-serif;
  padding: 12px;
  width: 70%;
  text-align: center;
}

.video-url-play {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: white;
}


.video-fullScreen {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
  z-index: 0;
  object-fit: cover;
  background-color: white;
  background-position: center;
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
  position: relative;
  height: 100%;
}

.container-videoEimage__img {
  width: 100%;
  height: 100%;
}

.container-videoEimage__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

.img__full {
  width: 100%;
  object-fit: cover;
  height: 100%;
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

.button-go {
  color: #33A9F2;
  height: 45px;
  border-radius: 10px;
  text-transform: uppercase;
  font-weight: 700;
  background: azure;
  font-size: medium;
  font-weight: 700;
  font-family: sans-serif;
}

@media (max-width: 640px) {
  .padre {
    width: 100%;
    padding: 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .full-screen {
    height: calc(100% - 15%);
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
