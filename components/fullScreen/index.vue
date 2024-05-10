<template>
  <!--  <v-bottom-sheet v-model="allData.status" class="edit-fixed" persistent hide-overlay :width="windowWidthT + 14">
    <v-sheet height="100dvh"> -->
  <div v-show="allData.status" class="dialog-custom">
    <hooper ref="sliderRef" :key="componentKey" style="height: 100dvh; position: relative;" v-if="currentSlide >= 0"
      :mouseDrag="showHeader ? false : true" :touchDrag="showHeader ? false : true" :settings="hooperSettings"
      @slide="onSlide" :initialSlide="currentSlide">
      <slide class="slide" v-for="(item, index) in allData.from == 'Trending' ? userChallenges : newChallengeArray"
        ref="section" :key="index">
        <Header v-if="allData.from == 'Challenge' || allData.from == 'Profile' ||
    (allData.from === 'Trending' && showHeader)
    " :item="item.challenge || item" :array="array" />

        <Buttons v-if="(allData.from == 'Trending' && !showHeader) ||
    (allData.from == 'communities' && dataUser) ||
    (allData.from == 'Impact' && dataUser) ||
    (allData.from == 'Profile' && dataUser) ||
    allData.from == 'Notifications'
    " :from="allData.from" :item="item" :index="index" :idUser="dataUser" @communities="communities" />

        <template v-if="showHeader">
          <div v-if="iconPlay" class="item-descriptions">
            <span>
              {{ item?.challenge?.description }}
            </span>
          </div>
        </template>
        <div v-if="item?.resource?.id == 3 || item?.typeMedia == 'mp4'" class="overlay-bg" @click="onVideoClick(index)">
        </div>
        <div v-if="item?.resource?.id == 3 || item?.typeMedia == 'mp4'" :class="allData.from == 'Challenge' || showHeader
    ? 'sound-item-top'
    : 'sound-item'
    ">
          <div v-if="soundMuted && currentSlide == index">
            <v-icon class="sound-icon" @click="playSound" size="30px" color="white" dark>
              mdi-volume-high</v-icon>
          </div>
          <div v-else>
            <v-icon class="parpadea" @click="playSound" size="30px" color="white" dark>
              mdi-volume-off</v-icon>
          </div>
        </div>
        <template v-if="item?.resource?.id == 3 || item?.typeMedia == 'mp4'">
       <!--    <img class="video-url-play" v-if="iconPlay" src="../../assets/img/png/PlayBoton.png" alt=""
            @click="onVideoClick(index)" />
          <img class="video-url-play dipel-effect" v-else src="../../assets/img/png/PausaBoton.png" alt=""
            @click="onVideoClick(index)" /> -->



          <v-icon v-if="iconPlay" @click="onVideoClick(index)" class="video-url-play"  size="80">
            mdi-play-circle
          </v-icon>
          <v-icon v-else @click="onVideoClick(index)" class="video-url-play dipel-effect" size="80">
            mdi-pause-circle
          </v-icon>
        </template>
        <div v-if="(item?.resource?.id == 3 || item?.typeMedia == 'mp4')"
          style="width: 100%;height: 100%; position: relative; background-position: center center; background-size: cover;"
          :style="{ backgroundImage: `url(${urlBucket + item?.photoUrl})` }">
          <video ref="videoRef" playsinline muted preload="none" class="controls" :src="urlBucket + item.url"
            @click="onVideoClick(index)" />
          <!--   <img class="video-img-poster" v-show="!soundMuted" :src="urlBucket + item.photoUrl"> -->
        </div>

        <img v-else style="width: 100%; height: 100%; object-fit: cover" ref="videoRef" :src="urlBucket + item.url" />
        <template v-if="!soundMuted">
          <p v-if="allData.from == 'Challenge'" class="text-description">
            {{ item?.description }}
          </p>
        </template>

        <div class="bottom-container">

          <div :class="[
    (allData.from === 'communities' ||
      allData.from === 'Trending') &&
      dataUser?.id === item?.user.id
      ? 'buttons-container-left'
      : 'buttons-container',
  ]">
            <div style="display: flex; justify-content: flex-end ; align-items: center; ">
              <img v-if="showHeader" @click=" close('backAccepte')" style="width: 42px;  object-fit: cover;"
                src="@/assets/img/button-float/backwhite.png" alt="">
              <img v-else @click=" close()" style="width: 42px;   object-fit: cover;"
                src="@/assets/img/button-float/backwhite.png" alt="">
            </div>

            <!--  <v-btn v-if="showHeader" @click=" close('backAccepte')" width="45px" height="45px" fab dark
              color="#33a9f2b3">
              <v-icon size="25px" dark> mdi-arrow-left </v-icon>
            </v-btn>
            <v-btn v-else @click=" close()" width="45px" height="45px" fab dark color="#33a9f2b3">
              <v-icon size="25px" dark> mdi-arrow-left </v-icon>
            </v-btn> -->
            <!-- <div
              v-if="!checKTerms && !dataUser?.id && showHeader || (allData.from === 'Profile' && allData?.content?.id !== dataUser?.id)"
              class="checKTerms">
              <v-btn type="button" class="btn-checKTerms">

                <span> <v-icon size="25" left> mdi-camera </v-icon> Accept the Challenge! </span>
              </v-btn>
            </div> -->
            <div v-if="!showHeader && allData.from === 'Trending' && dataUser?.id !== item?.user?.id"
              @click="acepChallenge(item)" style="
                  width: 100%;
                  text-align: center;
                  position: relative;
                  z-index: 80;
                ">
              <v-btn class="btn-challenge " :class="!iconPlay ? 'btn-opacity' : ''">
                <span> See my challenge </span>
              </v-btn>
            </div>
            <div v-else :style="(
    allData.from === 'communities' ||
    allData.from === 'Trending') &&
    dataUser?.id === item?.user?.id
    ? 'display:none'
    : 'display: block; width: 100%; '
    ">
              <AcceptChallenge
                v-if="allData.from === 'Trending' || allData.from === 'Challenge' || (allData.from === 'Profile' && allData?.content?.id !== dataUser?.id)"
                @evetPause="pauseVideo" :item="item" :iconPlay="iconPlay" :from="allData.from" :index="index"
                :userProps="dataUser" />
            </div>
          </div>
        </div>
        <template v-if="(!dataUser?.id && showHeader) || !dataUser?.id && allData.from === 'Challenge'">
          <div
            v-if="allData.from === 'Trending' || allData.from === 'Challenge' || (allData.from === 'Profile' && allData?.content?.id !== dataUser?.id)">
            <p class="terms">
              By clicking you accept the <span @click="$nuxt.$emit('UseTerms1', true)">Terms of Use</span>
            </p>
          </div>
        </template>

      </slide>
    </hooper>
    <Comments />
    <ReportModal />
    <!-- <LoadingChallenge :active="loadingChallenge" :progress="progress" /> -->
  </div>

  <!-- </v-sheet>
  </v-bottom-sheet> -->
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";
import Header from "@/components/fullScreen/Header.vue";
import Buttons from "@/components/fullScreen/Buttons.vue";
import AcceptChallenge from "@/components/fullScreen/AcceptChallenge.vue";
import LoadingChallenge from "@/components/LoadingChallenge.vue";
import imageVideo from "@/assets/gif.gif";
import CardVideo from "../cards/CardVideo.vue";
import Comments from "./Comments.vue";
import ReportModal from './ReportModal'
export default {
  components: {
    LoadingChallenge,
    Buttons,
    AcceptChallenge,
    Header,
    Hooper,
    Slide,
    ReportModal,
    Comments
  },
  data() {
    return {
      hooperSettings: {
        itemsToShow: 1,
        vertical: true,
        centerMode: true,
      },
      slideData: {},
      currentSlide: -1,
      prevSlide: 0,
      imageVideo,
      progress: 0,
      array: [],
      yes: false,
      indexContent: [],
      allData: {},
      loadingChallenge: false,
      imageVideo,
      dataUser: null,
      statePlays: false,
      userChallege: [],
      page: null,
      status: true,
      showHeader: false,
      control: true,
      loading: false,
      from: "",
      fromArray: "",
      soundMuted: false,
      soundIndex: null,
      goVideo: false,
      iconPlay: false,
      showIconMuted: false,
      limitedChallenge: false,
      componentKey: 0,
      newChallengeArray: [],
      positionChallenge: 0,
      spinnerVideo: false,
      terms: null,
      checKTerms: null
    };
  },

  computed: {
    ...mapState("phoneSize", ["windowWidthT"]),
    ...mapState("infiniteScroll", ["userChallenges", "userChallengesPages"]),
    ...mapGetters("user", ["getUserData"]),
    urlBucket() {
      return process.env.api_assets_url;
    },
  },
  watch: {
    soundMuted(value) {
      if (this.$refs.videoRef) {
        if (this.$refs.videoRef[this.currentSlide]?.localName === "video") {
          if (value) {
            this.$refs.videoRef[this.currentSlide].muted = false;
          } else {
            this.$refs.videoRef[this.currentSlide].muted = true;
          }
        }
      }
    },
    terms(value) {
      console.log('value', value)
      this.checKTerms = value

    }
  },
  methods: {
    ...mapActions("challenges", ["getUserChallenges", "getImpacts"]),
    ...mapActions("phoneSize", ["onRezise"]),
    ...mapActions("user", ["nicknameAction"]),
    ...mapActions("infiniteScroll", ["getNetxPage"]),

    incrementM(value) {
      console.log("incrementM");
      this.comment_count = value;

    },
    acepChallenge(challenge) {
      document.documentElement.style.touchAction = "none";
      /*   localStorage.clear(); */
      this.$axios
        .$post(`/stats/record`, { step: "SHARE_VIEW", challengeId: challenge.challenge.id },
          {
            Headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          const idStep = res.id;
          localStorage.setItem("recordStepId", idStep);
        })
        .catch((err) => {
          console.error("🚧 catch", err);
        });
      this.showHeader = true;
      this.componentKey += 1;
    },
    pauseVideo(index) {
      this.$refs.videoRef[index].pause();
    },
    close(string) {
      if (string === "backAccepte") {
        this.showHeader = false;
        this.componentKey += 1;
      } else {
        this.status = false;
        document.documentElement.style.touchAction = "auto";
        this.array = [];
        this.currentSlide = -1;
        this.allData.status = false;
        this.showHeader = false;
        this.newChallengeArray = []
        this.checKTerms = false
        this.terms = null

      }
    },
    playSound() {
      this.soundMuted = !this.soundMuted;
    },
    async loadVideos() {

      if (this.allData.from == "Trending") {
        this.loading = true
        if (this.dataUser && this.loading) {
          /*   this.newChallengeArray = [...this.newChallengeArray, ...this.userChallenges.slice(this.positionChallenge, this.positionChallenge + 9)]
            this.positionChallenge += 10; */
          this.getNetxPage({
            page: this.userChallengesPages + 1,
            items: 10,
            from: "Trending",
          }).then((res) => {
            this.loading = false
            console.log('fullress', res)
          });

          await this.$refs.sliderRef.update();
        } else {
          if (this.currentSlide >= 9) {
            this.$nuxt.$emit("openLogin", [true]);
          }
        }
      } else {
        console.log('communities')
        if (!this.limitedChallenge) {
          this.limitedChallenge = true
          this.page += 1;
          this.getUserChallenges({
            page: this.page,
            idChallenge: this.array[0].challenge.id,
          }).then((res) => {
            setTimeout(() => {
              console.log('res', res)
              this.array = [...this.array, ...res.page];
              this.loading = false;
              this.newChallengeArray = [...this.newChallengeArray, ...this.array.slice(this.positionChallenge, this.positionChallenge + 9)]
              this.positionChallenge += 10;
              this.limitedChallenge = false
            }, 1000);
          }).catch((error) => {
            this.limitedChallenge = false
          })
        }

      }
    },
    loadMore() {
      if (this.allData.from == "communities") {
        if (this.currentSlide + 8 > this.newChallengeArray.length) {

          this.loadVideos();
        }
      } else {
        if (this.currentSlide + 3 > this.userChallenges.length) {
          this.loadVideos();
        }
      }
    },
    communities(value) {
      console.log('value', value)
      console.log('this.dataUser', this.dataUser)
      if (this.dataUser) {
        let res = this.dataUser?.userChallenges?.filter(
          (fill) => fill.challenge.id === value.challenge.id
        );
        if (res.length > 0) {
          this.$router.push({
            path: `/challenges/${value.challenge.id}/communities`,
          });
        } else {
          this.showHeader = true
        }
      } else {
        this.$router.push({
          path: `/challenges/${value.challenge.id}`,
        });
      }

    },
    /*   onVideoEnd(index) {
        this.$refs.sliderRef.slideNext();
        this.loadMore(index);
      }, */
    onVideoClick(index) {
      console.log('spinnerVideo')
      this.spinnerVideo = true
      let video = this.$refs.videoRef[index];
      if (video.paused) {
        this.iconPlay = false;
        this.spinnerVideo = false
        video?.play();
        this.$refs.videoRef[this.currentSlide].muted = false;
        this.soundMuted = true;
      } else {
        video?.pause();
        this.iconPlay = true;
        this.spinnerVideo = false
        this.$refs.videoRef[this.currentSlide].muted = true;
        this.soundMuted = false;
      }

    },
    onVideoPlay(index) {
      //this.$refs.videoRef[index].volume = 0
    },
    loadVideo() {
      if (this.$refs.videoRef[this.currentSlide].readyState > 3) {
        setTimeout(() => {
          this.goVideo = false;
        }, 1000);

        /* this.loading = false */
      } else {
        /*   this.loading = true */
        this.goVideo = true;
      }
    },
    onSlide({ currentSlide, slideFrom }) {
      this.currentSlide = currentSlide;
      this.prevSlide = slideFrom;
      var isPlaying =
        this.$refs.videoRef[currentSlide].currentTime > 0 &&
        !this.$refs.videoRef[currentSlide].paused &&
        !this.$refs.videoRef[currentSlide].ended &&
        this.$refs.videoRef[currentSlide].readyState >
        this.$refs.videoRef[currentSlide].HAVE_CURRENT_DATA;

      if (!isPlaying) {
        if (this.$refs.videoRef[currentSlide]?.localName === "video")
          this.$refs.videoRef[currentSlide]?.pause();
        this.$refs.videoRef[currentSlide].muted = true;
        this.soundMuted = false;
        this.iconPlay = true;
      }

      if (this.$refs.videoRef[slideFrom]?.localName === "video") {
        this.$refs.videoRef[slideFrom]?.pause();
        this.iconPlay = true;
        /* this.$refs.videoRef[slideFrom].muted = false;
        this.soundMuted = true; */
      }

      if (this.$refs.videoRef[currentSlide + 1]) {
        this.$refs.videoRef[currentSlide + 1].preload = "auto";
      }
      this.loadMore();
    },
    async restart() {
      return this.$nextTick().then(async () => {
        if (this.userChallenges.length > 0) {
          await this.$refs.sliderRef.update();
        }
      });
    },
  },
  created() {
    this.$nuxt.$on("fullScreenDefinitive", (allData) => {
      console.log('allData', allData)
      this.newChallengeArray = []
      if (allData?.closetLogn) {
        this.close()
        document.documentElement.style.touchAction = "auto";
      } else {
        document.documentElement.style.touchAction = "none";
      }
      /*  this.nicknameAction().then((user) => { */
      this.dataUser = allData.user;
      this.allData = allData;
      this.status = true;
      this.page = allData.page;
      this.onRezise();
      switch (this.allData.from) {
        case "Profile":
          this.fromArray = "Challenge";
          this.currentSlide = this.allData.index;
          this.positionChallenge = this.allData.index + 9;
          this.array = this.allData.content.userChallenges;
          this.newChallengeArray = this.array.slice(0, this.positionChallenge)
          break;
        case "Challenge":
          this.fromArray = "Challenge";
          if (this.dataUser.id) {
            this.allData.content.map(function (entry) {
              entry.challengeUser = false;
              return entry;
            });
            this.array = this.allData.content;
            this.currentSlide = this.allData.index;
            this.positionChallenge = this.allData.index + 9;
            this.newChallengeArray = this.array.slice(0, this.positionChallenge)
            this.dataUser.userChallenges.forEach((element) => {
              let result = this.newChallengeArray.map(function (promotional) {
                if (element.challenge.id === promotional.id)
                  promotional.challengeUser = true;
                return promotional;
              });
            });

          } else {
            this.currentSlide = this.allData.index;
            this.positionChallenge = this.allData.index + 9;
            this.array = this.allData.content;
            this.newChallengeArray = this.array.slice(0, this.positionChallenge)
          }
          break;
        case "Trending":
          this.fromArray = "Trending";
          this.currentSlide = this.allData.index;
          this.positionChallenge = this.allData.index + 9;
          this.newChallengeArray = this.userChallenges.slice(0, this.positionChallenge)
          break;
        case "Impact":
          this.fromArray = "Challenge";
          this.currentSlide = this.allData.index;
          this.positionChallenge = this.allData.index + 9;
          this.array = this.allData.content;
          this.newChallengeArray = this.array.slice(0, this.positionChallenge)
          break;
        case "Notifications":
          this.$axios
            .$post("/user-challenge/get-one", {
              idChallenge: this.allData.content.url,
              idUser: this.allData.content.user.id,
            })
            .then((r) => {
              this.array.push(r);
              if (allData.notificationType == 3)
                this.$nuxt.$emit("openModalComments", {
                  status: true,
                  data: r,
                });
            })
            .catch((err) => console.log("🚧 catch", err));
          break;
        case "communities":
          console.log('this.dataUser = allData.user;', this.dataUser)
          this.fromArray = "Challenge";
          this.currentSlide = this.allData.index;
          this.positionChallenge = this.allData.index + 9;
          this.array = this.allData.content;
          this.newChallengeArray = this.array.slice(0, this.positionChallenge)
          break;
      }
      /*  }); */
    });
  },
};
</script>
<style>
.spinner {
  height: 60px;
  width: 60px;
  border: solid 3px white;
  border-radius: 50%;
  border-bottom-color: transparent;
  border-right-color: transparent;
  will-change: transform;
  animation: spin 500ms infinite linear;
  position: absolute;
  z-index: 99999999;
  left: 50%;
  bottom: 80%;
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

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.hooper-track {
  padding-left: 0px !important;
}

/* @media (max-width: 640px) {
  .v-dialog {
    width: 100% !important;
  }
} */
</style>

<style lang="scss" scoped>
.dialog-custom {
  z-index: 200;
  height: 100dvh;
  width: 400px;
  background-color: #000000;
  position: fixed;
  top: 0;
}

.btn-opacity {
  opacity: 0.5;
  transition: all linear 0.5;
}

.containerFather {
  background: rgb(41, 46, 50);
  background: linear-gradient(180deg,
      rgba(41, 46, 50, 0) 50%,
      rgba(154, 154, 154, 0.404) 100%) !important;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 0 0;
  font-family: "Roboto", sans-serif;
  line-height: 1.5;
}

/* 
html {
  overflow: hidden;
  overscroll-behavior: none;
} */
.checKTerms {
  width: 100%;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 80;
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

.hooper-slide {
  height: 100vh;
  position: relative;
  color: #ffffff;
  font-size: 30px;
}

video::-webkit-media-controls-panel {
  display: none;
}

.sound-icon {
  text-shadow: 2px 0 4px rgb(102 102 102 / 91%);
}

.parpadea {
  margin-top: 15px;
  animation-name: parpadeo;
  animation-duration: 0.3s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  text-shadow: 2px 0 4px rgb(102 102 102 / 91%);
  -webkit-animation-name: parpadeo;
  -webkit-animation-duration: 1.8s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}

@-moz-keyframes parpadeo {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@-webkit-keyframes parpadeo {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes parpadeo {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

/* .slide {
  display: flex;
  align-items: center;
  position: relative;
  left: 0;
  top: 0;
} */
.container-svg {
  position: absolute;
  font-size: 54px;
  display: flex;
  justify-content: center;
  z-index: 4;
}

.item-descriptions {
  position: absolute;
  bottom: 13%;
  color: white;
  font-family: poppinsregular;
  padding: 25px 30px;
  font-size: 16px;
  z-index: 66;
}

.video-url-play {
  position: absolute;
  z-index: 99999;
  color: white;
  left: 42%;
  bottom: 45%;
  right: 50%;
  width: 70px;
}

.dipel-effect {
  animation: moveAndOpacity 1.2s forwards;
}

@keyframes moveAndOpacity {
  0% {
    transform: translateX(0);
    opacity: 1;
  }

  /* 
  50%  { transform: translateX(10rem); opacity: 0.; }  */
  100% {
    transform: translateX(0);
    opacity: 0;
  }
}

.container-svg i {
  color: white;
}

.video-img-poster {
  position: absolute;
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.text-description {
  color: white;
  font-family: sans-serif;
  font-size: 16px;
  line-height: normal;
  text-transform: capitalize !important;
  padding: 0px 20px;
  text-align: left;
  bottom: 100px;
  position: absolute;
  left: 0;
  z-index: 999;
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

.scroll-container {
  height: 100dvh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  width: 100%;
  overflow-x: hidden;
  background-position: center;
  background-size: auto;
  background-repeat: no-repeat;
  background-color: #33a9f2;
}

.controls[data-state="hidden"] {
  display: none;
}

.controls {
  width: 100%;
  /*  position: absolute; */
  height: 100%;
  object-fit: cover;
  z-index: 50;
  background-size: cover;
  background-position: center center;
}

section {
  height: 100%;
  scroll-snap-align: center;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #353535; */
}

.button-accept {
  position: absolute;
  bottom: 15%;
  width: 100%;
  display: flex;
  justify-content: center;
}

.sound-item {
  position: absolute;
  display: flex;
  right: 0;
  top: 0;
  padding: 20px;
  z-index: 300;
}

.sound-item-top {
  position: absolute;
  display: flex;
  right: 0;
  top: 17%;
  padding: 20px;
  z-index: 300;
}

.bottom-container {
  width: 100%;
  position: absolute;
  display: flex;
  bottom: 0;
  justify-content: space-between;
  flex-direction: column;
  padding: 50px 30px;
  align-items: center;
  z-index: 80;
  padding-left: 10px;
}

/* body {
  overflow: hidden !important;
} */

.buttons-container {
  display: flex;
  justify-content: flex-start;
  width: 340px;
  align-items: center;
}

.buttons-container-left {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
}

.terms {
  position: absolute;
  color: white;
  bottom: 3%;
  font-size: 12px;
  z-index: 90;
  bottom: 8px;
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

.button__play {
  position: absolute;
  color: white;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  font-size: 82px;
  z-index: 9999999999;
  display: block;
}

.button__stop {
  position: absolute;
  color: white;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  font-size: 82px;
  z-index: 9999999999;
  display: none;
}

@keyframes pulsee {
  0% {
    box-shadow: 0px 0px 0px 0px red;
  }

  100% {
    box-shadow: 0px 0px 5px 25px rgba(35, 130, 220, 0);
  }
}

.acceptCallenge-btn {
  background: linear-gradient(0deg, rgba(#0a84e8, 1) 0%, rgba(#13a7de, 1) 100%);
  color: white;
}

.donates {
  font-size: 30px;
  font-weight: 700;
  color: black;
  text-align: center;
}

.groups-text {
  position: absolute;
  bottom: 23%;
  color: #f5f5f5;
  width: 100%;
}

.groups-text__name-avatar {
  display: flex;
  padding: 20px;
  justify-content: left;
  align-items: center;
  gap: 20px;
}

.groups-text__name-avatar__title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 3;
  /* padding: 3px; */
  padding: 0 36px 0px 14px;
  overflow: hidden;
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

section h2 {
  opacity: 0;
  transition: all 3000ms;
}

section.is-visible h2 {
  opacity: 1;
  transform: scale(1.25);
}

@media (max-width: 640px) {
  .dialog-custom {
    width: 100%;
    left: 0
  }
}
</style>
