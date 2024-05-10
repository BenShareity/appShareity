<template>
  <div>
    <LoadingLogo v-if="loading" />
    <v-container v-else class="padre">
      <div class="container-media">
        <Header :item="dataChallange?.challenge" :from="'sharedLink' || ''" data-app />
        <div class="container-videoEimage">
          <div v-if="dataChallange?.resource?.id === 3" class="overlay-bg" @click="play()"></div>
          <div v-else class="overlay-bg"></div>
          <template v-if="dataChallange?.resource?.id === 3 || dataChallange?.typeMedia == 'mp4'">
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
          <div
            style="position: absolute; display: flex; align-items: center; width: 100%; flex-direction: column; gap: 15px; bottom: 0%; padding-bottom: 15px; z-index: 200;">
            <div class="text-description" v-if="!stateVideo">
              <p style="color: white; text-align: left; font-size: large; font-family: sans-serif; padding: 0px 20px; ">
                {{ dataChallange?.challenge?.description }}
              </p>
            </div>
            <!-- <div v-if="!checKTerms && !userId?.id" style="display: flex; justify-content: center;">
            <v-btn type="button" class="btn-checKTerms">
              <span> <v-icon size="25" left> mdi-camera </v-icon> Accept the Challenge! </span>
            </v-btn>
          </div> -->
            <template v-if="this.$route.query.twilio && userId.id">
              <div v-if="dataChallange?.challengeUser" class="btn-c">
                Challenge Completed!
              </div>
              <v-btn v-else class="btn-challenge" tile>
                <v-icon size="26" left> mdi-camera </v-icon>
                <span>Accept the Challenge! Twilio</span>
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
                <AcceptChallenge v-if="dataChallange?.challenge?.status == 1 && dataChallange?.dateNow" from="shared"
                  :iconPlay="!stateVideo ? true : false" :item="dataChallange" :userProps="userId" :isShared="idLink" />
                <div v-else class="btn-c" style="width: 100%;">
                  Cannot Do this Challenge
                </div>
              </div>
            </div>
            <p v-if="!userId?.id" class="terms">
              By clicking you accept the <span @click="$nuxt.$emit('UseTerms1', true)">Terms of Use</span>
            </p>

            <!--  <div class="go-button" @click="goRoute(dataChallange)">
              <v-btn class="button-go"> Go to Shareity! </v-btn>
            </div> -->
          </div>
        </div>
      </div>
      <UseTerms1 data-app />
      <UseTerms2 data-app />
      <UseTerms3 data-app />
      <UseTermsVideo />
      <FullScreenLoginChallenge data-app />
      <Login data-app />

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
import LoadingLogo from "../../../../components/loader/LoadingLogo.vue";
import UseTerms1 from "@/components/UseTerms1.vue";
import UseTerms2 from "@/components/UseTerms2.vue";
import UseTerms3 from "@/components/UseTerms3.vue";


export default {
  components: {
    Loading,
    AcceptChallenge,
    LoadingChallenge,
    Login,
    FullScreenLoginChallenge,
    Header,
    LoadingLogo,
    UseTerms1,
    UseTerms2,
    UseTerms3
  },

  async asyncData({ params, $axios }) {
    console.log('params.idUserChallenge', params.idUserChallenge)
    let dataInfo = await $axios.$get("/user-challenge/get-by-id/" + params.idUserChallenge)
    console.log('dataInfo', dataInfo)
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
      terms: null,
      idLink: "",
      loading: false,
      checKTerms: null
    };
  },
  head(vm) {
    return {
      title: vm.dataInfo.challenge.shareMessage,
      meta: [
        {
          hid: "og-title",
          property: "og:title",
          content: vm.dataInfo.challenge.shareMessage,
        },
        { hid: "og-type", property: "og:type", content: "website" },
        {
          hid: "og-desc",
          property: "og:description",
          content: vm.dataInfo.challenge.shareMessage,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          href: this.urlBucket + vm.dataInfo.watermark,
          content: this.urlBucket + vm.dataInfo.watermark,
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: this.urlBucket + vm.dataInfo.watermark,
        },
        {
          hid: "og-image",
          property: "og:image",
          itemprop: "image",
          content: this.urlBucket + vm.dataInfo.watermark,
        },
        /* {
          hid: "og:title",
          property: "og:title",
          content: "iPhone",
        }, */
        {
          hid: "og:image",
          property: "og:image",
          href: this.urlBucket + vm.dataInfo?.photoUrl,
          content: this.urlBucket + vm.dataInfo?.photoUrl,
        },
        {
          property: "og:site_name",
          content: "Accept the gtesr challenge",
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
          content: `Accept the ${vm.dataInfo.challenge.name} challenge`,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: vm.dataInfo.challenge.shareMessage,
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
    terms(value) {
      this.checKTerms = value

    }
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
      this.$nuxt.$emit("openUserName", [true, e, data, this.idLink, this.userId, 'shared']);
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
      this.idLink = this.$route.params;
      this.$axios.$get("/stats/UserChallenge/ViewShare/" + this.$route.params.idShare)
        .then((res) => {
          console.log('res ViewShare', res)
          res.typeMedia = res.url.split("?")[0].split("#")[0].split('.').pop();
          if (!localStorage.getItem('recordStepId')) {
            this.$axios
              .$post(`/stats/record`, {
                step: "SHARE_VIEW",
                challengeId: res.challenge.id
              })
              .then((steps) => {
                const idStep = steps.id;
                localStorage.setItem("recordStepId", idStep);
              })
              .catch((err) => {
                console.error("🚧 catch", err);
              });
          }
          let fechaVieja;
          let fechaNueva;
          fechaNueva = new Date()
          fechaVieja = new Date(res.challenge.endDate)
          res["challengeUser"] = false;
          let result = fechaVieja > fechaNueva
          res["dateNow"] = result
          this.dataChallange = res
          if (this.dataChallange) {
            this.nicknameAction().then((user) => {
              this.userId = user;
              user.userChallenges.forEach((element) => {
                console.log('element', element)
                if (element.challenge.id === this.dataChallange.challenge.id) {
                  this.dataChallange["challengeUser"] = true;
                  return this.dataChallange;
                }
              });
              this.loading = false
            });
            this.loading = false
          }
        })
      console.log('this.userId', this.userId)
      console.log('this.$route.params', this.$route.query)
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

.btn-challenge {
  color: white;
  height: 45px !important;
  border-radius: 10px;
  text-transform: uppercase;
  font-weight: 700;
  background: linear-gradient(90deg, #12A4DB 0%, #044F85 100%);
  font-family: sans-serif;
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

.btn-checKTerms {
  height: 45px !important;
  border-radius: 10px;
  background: #aeaeae !important;
  color: white;
  text-transform: uppercase;
  font-weight: 700;
  font-family: sans-serif;
  padding: 22px 16px !important;
  font-size: 0.875rem;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
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
}

.terms span {
  color: #33a9f2;
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
  flex-direction: column;
  gap: 20px;
  z-index: 200;
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
