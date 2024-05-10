<template>
  <div style="background-color: #f3f4f5">
    <template>
      <!--   <v-card color="transparent" class="mb-16 card-container" height="390px">
        <v-card-actions style="background-color: white !important">
          <p class="card-title my-2">{{ challenge.name }}</p>
        </v-card-actions>
        <div class="video-search" v-if="challenge.typeMedia == 'mp4' || challenge.resource.id == 3">
          <video class="video-search-video" preload="none" muted playsinline :poster="urlBucket + challenge?.photoUrl"
            :src="urlBucket + challenge?.url" ref="videoSearch">
          </video>
          <div class="d-flex flex-column justify-center acceptCallenge-btn-container"
            style="position: absolute; z-index: 5 ;height: 390px;">
            <div style="position: relative; width: 100%; height: 100%; ">
              <v-icon class="video-search-play" v-if="!stateVideo" color="white" @click="play()" size="40">
                mdi-play-circle
              </v-icon>
              <v-icon class="video-search-pause" v-else color="white" @click="play()" size="40">
                mdi-pause-circle
              </v-icon>
              <p class="acceptCallenge-des" :style="challenge.challengeUser ? { height: '70%' } : { height: '80%' }"
                @click="openFullScreen()">
                {{ description }}...
                <a href="#" style="text-decoration: none"> More...</a>
              </p>
              <div v-if="challenge.challengeUser" class="btn-c">Challenge Completed!</div>
              <v-btn v-else height="45px" class="acceptCallenge-btn">
                <v-icon v-if="challenge.resource.id == 3">
                  mdi-video-outline
                </v-icon>
                <v-icon v-else> mdi-camera-outline </v-icon>
                <div class="show-button">
                  <input v-if="challenge.resource.id == 3" id="fileInputVideo" type="file"
                    @change="onFileSelect($event, challenge)" accept="video/*" />
                  <input v-else id="fileInputImage" type="file" @change="onFileSelect($event, challenge)"
                    accept="image/*" />
                </div>

                <h1 style="font-size: 15px; margin-left: 10px">
                  Accept Video Challenge!
                </h1>
              </v-btn>
              <div v-if="challenge.challengeUser" class="go-button">
                <div @click="goCommunities(challenge)" class="go-button__buton">Go to Communities</div>
              </div>
            </div>

          </div>
        </div>
        <v-img v-else :src="!challenge.url
            ? 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.gif'
            : urlBucket + challenge.url
            " gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="346px"
          style="background-position: center; background-color: black" :style="challenge.url ? { backgroundImage: 'url(' + imageVideo + ')' } : ''
            ">
          <div class="d-flex flex-column justify-center acceptCallenge-btn-container">
            <p class="acceptCallenge-des" :style="challenge.challengeUser ? { height: '46%' } : { height: '51%' }"
              @click="openFullScreen()">
              {{ description }}...
              <span style="text-decoration: none"> More...</span>
            </p>

            <div v-if="challenge.challengeUser" class="btn-c">Challenge Completed!</div>
            <v-btn v-else height="45px" class="acceptCallenge-btn">
              <v-icon v-if="challenge?.resource?.id == 3">
                mdi-video-outline
              </v-icon>
              <v-icon v-else> mdi-camera-outline </v-icon>
              <div class="show-button">
                <input v-if="challenge?.resource?.id == 3" id="fileInputVideo" type="file"
                  @change="onFileSelect($event, challenge)" accept="video/*" />
                <input v-else id="fileInputImage" type="file" @change="onFileSelect($event, challenge)"
                  accept="image/*" />
              </div>
              <h1 style="font-size: 15px; margin-left: 10px">
                Accept Selfie Challenge!
              </h1>
            </v-btn>
            <div v-if="challenge.challengeUser" class="go-button">
              <div @click="goCommunities(challenge)" class="go-button__buton">Go to Communities</div>
            </div>

          </div>
        </v-img>
      </v-card> -->
      <div class="search-card">
        <div class="search-card_contend">
          <div class="search-card_contend-header">
            <div class="search-card_contend-header-back"> </div>
            <p class="search-card_contend-header-title">{{ challenge.name }}</p>
          </div>
          <video @click="openFullScreen()" v-if="challenge.typeMedia == 'mp4' || challenge.resource.id == 3"
            class="video-search-video" preload="none" muted playsinline :poster="urlBucket + challenge?.photoUrl"
            :src="urlBucket + challenge?.url" ref="videoSearch">
          </video>
          <img @click="openFullScreen()" class="search-card_contend-imagen" v-else :src="!challenge.url
              ? 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.gif'
              : urlBucket + challenge.url
              " gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="346px"
            style="background-position: center; background-color: black; box-shadow: 1px 1px 5px 2px #747474;" :style="challenge.url ? { backgroundImage: 'url(' + imageVideo + ')' } : ''
              " />
          <template v-if="challenge?.resource.id === 3">
            <img v-if="!stateVideo" @click="play()" style="width: 33px;" class="video-search-play" :src="buttomPlay"
              alt="">
            <img v-else @click="play()" style="width: 33px;" class="video-search-pause" :src="buttomPaused" alt="">

          </template>
          <div class="search-card_contend-footer">
            <div class="search-card_contend-footer-title">
              <p>{{ description }}</p>
              <!-- <p>More...</p> -->
            </div>
            <div class="search-card_contend-footer-section-buttom">
              <div v-if="challenge.challengeUser" class="btn-c">Challenge Completed!</div>
              <button v-else class="search-card_contend-footer-section-buttom_button">
                <v-icon v-if="challenge.resource.id == 3">
                  mdi-video-outline
                </v-icon>
                <v-icon v-else> mdi-camera-outline </v-icon>
                <div class="show-button">
                  <input v-if="challenge.resource.id == 3" id="fileInputVideo" type="file"
                    @change="onFileSelect($event, challenge)" accept="video/*" />
                  <input v-else id="fileInputImage" type="file" @change="onFileSelect($event, challenge)"
                    accept="image/*" />
                </div>

                <p v-if="challenge.resource.id == 3" style="font-size: 15px; margin-bottom: 0; margin-left: 10px">
                  Accept Video Challenge!
                </p>
                <p v-else style="font-size: 15px; margin-bottom: 0; margin-left: 10px">
                  Accept Challenge!
                </p>
              </button>
              <div v-if="challenge.challengeUser" class="go-button">
                <div @click="goCommunities(challenge)" class="go-button__buton">Go to Community</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <LoadingChallenge :active="active" :progress="progress" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import LoadingChallenge from "@/components/LoadingChallenge.vue";
import imageVideo from "../../assets/e.gif";
import buttomPlay from "@/assets/img/svg/play.svg"
import buttomPaused from "@/assets/img/svg/paused.svg"
export default {
  data() {
    return {
      active: false,
      activeShare: false,
      isPlaying: false,
      stateVideo: false,
      description: "",
      progress: 0,
      indexContent: [],
      imageVideo,
      loading: false,
      buttomPlay,
      buttomPaused
    };
  },
  props: {
    challenge: Object,
    index: Number,
    user: Object,
  },
  watch: {
    isPlaying(value) {
      if (value) {
        this.$refs.videoSearch.play();
        this.stateVideo = true;
      } else {
        this.$refs.videoSearch.pause();
        this.stateVideo = false;
      }
    },
  },
  components: {
    LoadingChallenge,
  },
  computed: {
    ...mapGetters("challenges", ["getChallenge", "getPromotional"]),
    urlBucket() {
      return process.env.api_assets_url;
    },
  },
  methods: {
    ...mapActions("challenges", ["fullChallengeAction", "indexContentAction"]),
    ...mapActions("createUserChallenge", ["createUserChallengeAction"]),
    ...mapActions("login", ["openCloseLogin"]),

    openFullScreen() {
      this.$nuxt.$emit("fullScreenDefinitive", {
        status: true,
        content: this.getPromotional,
        index: this.index,
        from: "Challenge",
        user: this.user
      });
    },
    play() {
      this.isPlaying = !this.isPlaying;
    },
    loadVideo(e) {
      if (this.$refs.videoSearch.readyState > 3) {
        this.loading = false;
      } else {
        this.loading = true;
      }
    },
    goCommunities(challenge) {
      console.log('id', challenge.id)
      this.$router.push({
        path: `/challenges/${challenge.id}/communities`,
      });

    },
    onFileSelect(e, item) {
      let file = e.target.files[0];
      if (
        file.type == "video/mp4" ||
        file.type == "video/MOV" ||
        file.type == "video/3GP" ||
        file.type == "video/AVI" ||
        file.type == "video/quicktime"
      ) {
        if (localStorage.getItem('username')) {
          this.active = true;
          this.activeShare = false;
          this.createUserChallengeAction({
            file: file,
            idchallenge: item.id,
            idUser: this.user.id,
          }).then((res) => {
            setTimeout(() => {
              this.progress = 20;
            }, 1000);
            setTimeout(() => {
              this.progress = 50;
            }, 1500);
            setTimeout(() => {
              this.progress = 80;
            }, 3000);

            setTimeout(() => {
              this.active = false;
              this.$router.push({
                path: "/mycommunities",
                query: {
                  tab: "communities",
                  usr: localStorage.getItem('username'),
                  idchallenge: item.id,
                  img: item.badge,
                  name: item.name,
                },
              });

              this.activeShare = true;
            }, 5000);
          });
        } else {
          this.$nuxt.$emit("FullScreenLoginChallenge", [true, file, item, 3]);
        }
      }
      if (
        file.type == "image/jpg" ||
        file.type == "image/jpeg" ||
        file.type == "image/png" ||
        file.type == "image/gif"
      ) {
        if (localStorage.getItem('username')) {
          this.active = true;
          this.activeShare = false;
          this.createUserChallengeAction({
            file: file,
            idchallenge: item.id,
            idUser: this.user.id,
          }).then((res) => {
            setTimeout(() => {
              this.progress = 20;
            }, 1000);
            setTimeout(() => {
              this.progress = 50;
            }, 1500);
            setTimeout(() => {
              this.progress = 80;
            }, 3000);

            setTimeout(() => {
              this.active = false;
              this.$router.push({
                path: "/mycommunities",
                query: {
                  tab: "communities",
                  usr: localStorage.getItem('username'),
                  idchallenge: item.id,
                  img: item.badge,
                  name: item.name,
                },
              });
              this.activeShare = true;
            }, 6000);
          });
        } else {
          this.$nuxt.$emit("FullScreenLoginChallenge", [true, file, item, 1]);
        }
      }
    },
    handleScroll() {
      /*  var content_margin_top = window?.innerHeight * 0.30;
       var middle_line = window.scrollY + (window.innerHeight / 1.4);
       if ((this.$refs.videoSearch?.offsetTop + content_margin_top) < middle_line && (this.$refs.videoSearch?.offsetTop + this.$refs.videoSearch.clientHeight + content_margin_top) > middle_line) {
         let playPromise = this.$refs.videoSearch.play();
         if (playPromise !== undefined) {
           playPromise.then(_ => {
             this.$refs.videoSearch?.play();
           })
             .catch(error => {
               this.$refs.videoSearch?.pause();
             });
         }
         this.stateVideo = true;
       } else {
         this.$refs.videoSearch?.pause();
         this.stateVideo = false;
       } */
    },
  },
  mounted() {
    /*   window.addEventListener("scroll", this.handleScroll); */
  },

  destroyed() {
    /*  window.removeEventListener("scroll", this.handleScroll); */
  },
  created() {
    this.description = this.challenge.description
    let sumarMin = 0;
    let sumarMax = window.innerHeight;
    for (let i = 0; i < this.getPromotional.length; i++) {
      this.indexContent.push({
        index: i,
        location: {
          min: sumarMin,
          max: sumarMax,
        },
        status: false,
      });
      sumarMin = sumarMin + window.innerHeight;
      sumarMax = sumarMax + window.innerHeight;
    }
    this.indexContent[0].status = true;
    this.indexContent[1].status = true;
    this.indexContentAction(this.indexContent);
  },
};
</script>

<style lang="scss" scoped>
.card-container {
  -webkit-border-top-left-radius: 40px;
  -webkit-border-bottom-right-radius: 40px;
  -moz-border-radius-topleft: 40px;
  -moz-border-radius-bottomright: 40px;
  border-top-left-radius: 40px;
  border-bottom-right-radius: 40px;
  position: initial !important;
}

.acceptCallenge-des {
  height: 80%;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  color: white;
}

.go-button {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 15px;
}

.go-button__buton {
  font-family: sans-serif;
  font-weight: 700;
  padding: 5px 20px;
  color: white;
  background: linear-gradient(90.02deg, #2F4B75 0.02%, #47A4E7 24.51%, #78C6FF 48.5%, #47A4E7 73.49%, #2F4B75 99.98%);
  border-radius: 10px;
  width: fit-content;
  padding-right: 10px;

}

.acceptCallenge-btn-container {
  padding: 10px 15px;
  background: rgb(47, 39, 90);
  background: linear-gradient(180deg,
      rgba(0, 0, 0, 0) 30%,
      rgba(58, 94, 168, 0.927608543417367) 100%);
  width: 100%;
  height: 390px;
  border-top-left-radius: 40px;
  border-bottom-right-radius: 40px;
}

.show-button {
  opacity: 0;
  position: absolute;
 
}

.acceptCallenge-btn-container p {
  text-shadow: 1px 1px 1px black;
  font-size: 20px;
  margin-left: 5px;
}

.btn-c {
  color: #fdfdfd;
  border-radius: 10px;
  text-transform: uppercase;
  font-weight: 700;
  background: #aeaeae !important;
  font-family: sans-serif;
  width: 90%;
  text-align: center;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  position: relative;

  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.acceptCallenge-btn {
  background: linear-gradient(0deg,
      rgba(#0A84E8, 1) 0%,
      rgba(#13A7DE, 1) 100%);
  color: white;
  margin: 0 27px;
  border-radius: 10px;
}

.card-title {
  text-align: center;
  width: 100%;
  font-family: gotham_htfmedium;
  font-size: 16.9px;
  color: black;
  text-transform: uppercase;
}

.video-search {
  width: 100%;
  height: 390px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-search-play {
  position: absolute;
  top: 17%;
  z-index: 40;
  left: 15px;
}

.video-search-pause {
  position: absolute;
  top: 17%;
  z-index: 40;
  left: 15px;
}

.video-search-video {
  width: 100%;
  height: 100%;
  z-index: 1;
  border-bottom-right-radius: 40px;
  object-fit: cover;
  object-position: center center;
  border-top-left-radius: 40px !important;
  box-shadow: 1px 1px 5px 2px #747474;
  border-top-right-radius: 10px;
}

.search-card {
  height: 390px;
  width: 100%;
  position: relative;
}

.search-card_contend {
  width: 100%;
  height: 100%;
}

.search-card_contend-header {
  position: absolute;
  top: 0px;
  width: 100%;
  background: white;
  border-top-left-radius: 40px !important;
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 10px;
}

.search-card_contend-header-back {
  background: linear-gradient(186.65deg, #737373 5.22%, #FFFFFF 94.78%);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
  opacity: 0.4;
  border-top-left-radius: 40px !important;
  border-top-right-radius: 10px;
}contend-options_text

.search-card_contend-header-title {
  font-weight: 600;
  font-weight: 900;
  margin: 0;
}

.search-card_contend .search-card_contend-imagen {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 40px !important;
   border-bottom-right-radius: 40px !important;
   border-top-right-radius: 10px;
}

.search-card_contend-footer {
  position: absolute;
  bottom: -1px;
  width: 100%;
  background: linear-gradient(0deg, rgb(0 0 0 / 88%) 2%, rgb(0 0 0 / 4%) 99%, rgba(0, 0, 0, 0) 54%);
  padding: 10px 20px;
  border-bottom-right-radius: 40px;
}

.search-card_contend-footer-title {
  display: flex;
  gap: 2px;
  align-items: center;
}

.search-card_contend-footer-title p:nth-child(1) {
  font-size: 14px;
  color: white;
  width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
display: -webkit-box;
}

.search-card_contend-footer-title p:nth-child(2) {
  font-size: 14px;
  font-weight: 600;
  color: #4BB4FF;
}

.search-card_contend-footer-section-buttom {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.search-card_contend-footer-section-buttom_button {
  display: flex;
  color: white;
  font-size: 12px;
  gap: 5px;
  align-items: center;
  border-radius: 10px;
  text-transform: uppercase;
  padding: 5px 20px;
  background: linear-gradient(90.02deg, #2F4B75 0.02%, #47A4E7 24.51%, #78C6FF 48.5%, #47A4E7 73.49%, #2F4B75 99.98%);
}
</style>
