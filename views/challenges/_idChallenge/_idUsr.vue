<template>
  <v-container class="padre">
    <div class="container-media">
      <template v-if="userChallengeInfo">
        <Header :item="userChallengeInfo?.challenge" data-app />
      </template>

      <div class="container-videoEimage">
        <template v-if="userChallengeInfo?.resource?.id === 3">
          <v-icon id="icon-none" class="video-url-play" v-if="!stateVideo" @click="play()" size="100">
            mdi-play-circle
          </v-icon>
          <video class="video-url-video" preload="auto" @click="play()" muted playsinline
            style="object-fit: cover; !important" :poster="urlBucket + userChallengeInfo?.photoUrl"
            :src="urlBucket + userChallengeInfo?.url" ref="myvideo">
          </video>
        </template>
        <div class="container-videoEimage_img" v-else>
          <img :src="urlBucket + userChallengeInfo?.url" alt="">
        </div>
        <div style=" position: absolute; bottom: 18%; font-family: sans-serif; ">
          <p style=" color: white; text-align: left; font-size: large; padding: 0px 20px; ">{{
            userChallengeInfo?.challenge?.description
          }}</p>
        </div>
        <div v-if="userChallengeInfo"
          style="width: 100%;  position: absolute; bottom: 10%; display: flex; justify-content: center; align-items: center;">
          <AcceptChallenge from="Trending" :item="userChallengeInfo" :userProps="userId" />
        </div>
        <div @click="goRoute(userChallengeInfo)" style="position: absolute;
                            bottom: 2%;
                            width: 100%;
                            text-align: right;
                            padding: 0px 20px;">
          <v-btn class="button-go">
            Go to Shareity!
          </v-btn>
        </div>
        <!--  <LoadingChallenge :active="true" :progress="progress" /> -->
      </div>
    </div>
    <FullScreenLoginChallenge data-app />
    <Login data-app />
  </v-container>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import AcceptChallenge from "@/components/fullScreen/AcceptChallenge.vue";
import Loading from "@/components/Loading.vue";
import Login from "@/components/Login";
import FullScreenLoginChallenge from "@/components/FullScreenLoginChallenge";
import Header from "@/components/fullScreen/Header.vue";

export default {
  /*   async asyncData({ params, $axios }) {
      let userChallengeInfo
      await $axios.post("/user-challenge/get-one", {
        idChallenge: params.idChallenge,
        idUser: params.idUsr,
      })
        .then((res) => {
          res['challengeUser'] = false
          console.log('resdsdss', res)
          return { userChallengeInfo };
        });
    }, */

  data() {
    return {
      userChallengeInfo: "",
      isPlaying: false,
      isActive: true,
      infoChallenge: "",
      view: false,
      stateVideo: false,
      img: "",
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
    };
  },
  watch: {
    // whenever question changes, this function will run
    isPlaying(value) {
      if (value) {
        this.$refs.myvideo.play();
        this.stateVideo = true
      }
      else {
        this.$refs.myvideo.pause();
        this.stateVideo = false
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
      this.$router.push({
        path: "/mycommunities",
        query: {
          name: this.userChallengeInfo.challenge.name,
          idchallenge: this.$route.query.idchallenge,
          img: this.userChallengeInfo.challenge.image,
        },
      });
    },
    openFullScren() {
      this.activeFullScreen = !this.activeFullScreen;
    },
    goRoute() {
      this.$router.push({ path: "/" });
    },
    closeVideo() {
      this.activeFullScreen = false;
    },
    playAndPause() {
      if (!this.$refs.videoFULL.paused) {
        this.$refs.videoFULL.pause();
      } else {
        this.$refs.videoFULL.play();
      }
    },
    openSharedModal() {
      if (this.isActive === false) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
      if (this.isActive === true) {
        this.isActive = false;
      } else {
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
  },
  created() {
    if (process.client) {
      this.nicknameAction().then((user) => {
        this.userId = user;
      });
      if (navigator.userAgent.match(/iPhone/i)) {
        this.dispositivo = true;
      } else {
        this.dispositivo = false;
      }
      if (localStorage.getItem('username') != this.$route.query.usr) {
        this.isActive = false;
      }

      this.onRezise();
      window.addEventListener("resize", () => {
        this.onRezise();
      });
      this.active = true;
      this.$axios
        .$post("/user-challenge/get-one", {
          idChallenge: this.$route.params.idChallenge,
          idUser: this.$route.params.idUsr,
        })
        .then((res) => {
          res['challengeUser'] = false
          this.userChallengeInfo = res;
          this.userId.userChallenges.forEach((element) => {
            if (element.challenge.id === this.userChallengeInfo.challenge.id)
              this.userChallengeInfo.challengeUser = true;
            return this.userChallengeInfo;

          });
          this.view = true;
        })
        .catch((err) => console.log("🚧 catch", err));
      this.active = false;
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.videoFULL.play();
    }, 1000);
  },
  components: {
    Loading,
    AcceptChallenge,
    Login,
    FullScreenLoginChallenge,
    Header,
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

.btn-challenge {
  color: white;
  height: 45px !important;
  border-radius: 10px;
  text-transform: uppercase;
  font-weight: 700;
  background: linear-gradient(90deg, #12A4DB 0%, #044F85 100%);

  font-family: sans-serif;
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

@media(max-width:640px) {
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
