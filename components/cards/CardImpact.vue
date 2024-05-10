<template>
  <div class="card-component" style="position: relative;">
    <template>
      <video v-if="challenge.resource.id == 3" class="video-search-video" preload="none" muted playsinline
        :poster="urlBucket + challenge?.photoUrl" :src="urlBucket + challenge.url" ref="videoSearch"></video>
      <v-img v-else :style="{ backgroundImage: 'url(' + imageVideo + ')' }" :src="urlBucket + challenge.url"
        class="white--text align-end img-componente" height="100%" />
      <div class="card-component__positions">
        <div class="click-events" @click="openVideo"></div>
        <template v-if="challenge.resource.id == 3">
          <img v-if="!stateVideo" @click="play()" style="width: 33px;" class="video-search-play" :src="buttomPlay"
            alt="">
          <img v-else @click="play()" style="width: 33px;" class="video-search-pause" :src="buttomPaused" alt="">
        </template>

        <!--   <div class="header-sponsorr">
          <div style="width: 100%">
            <div v-if="challenge.challenge.sponsors.length > 0" style="height: 28px; width: 100%; padding: 0px 20px">
              <div class="img-Back" :style="{
        backgroundImage: `url(${urlBucket + challenge.challenge.sponsors[0].sponsor.logo
          })`,
      }"></div>
            </div>
          </div>
          <div style="width: 80px; position: relative; height: 100%">
            <img @click="infoCommnities(challenge.challenge)"
              style="width: 100%; position: absolute; z-index: 100; top: -8px"
              :src="urlBucket + challenge.challenge.badge" alt="" />
          </div>
          <div v-if="challenge.challenge.organization" style="
              width: 100%;
              display: flex;
              justify-content: center;
              height: 45px;
            ">
            <img :src="urlBucket + challenge.challenge.organization.logo" alt="" />
          </div>
        </div> -->
        <div class="d-flex flex-row justify-space-between description" height="5%">
          <div class="d-flex ml-2">
            <div class="d-flex align-center flex-end my-1">
              <div @click="$router.push({ path: `/profile/${challenge?.user?.username}` })">
                <img v-if="challenge?.user?.imagen !== null &&
        challenge.user.imagen !== '' &&
        challenge.user.imagen !== '-'" class="imagen-no-avatar" :src="urlBucket + challenge.user.imagen" />
                <svg v-else class="imagen-no-avatar" width="50" height="50" viewBox="0 0 50 50" fill="none"
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <rect width="50" height="50" fill="url(#pattern0_868_217)" />
                  <defs>
                    <pattern id="pattern0_868_217" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlink:href="#image0_868_217" transform="scale(0.00529101)" />
                    </pattern>
                    <image id="image0_868_217" width="189" height="189"
                      xlink:href="data:image/png;base64,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" />
                  </defs>
                </svg>
              </div>

              <div class="user-compoennte">
                <v-card-title class="user-compoennte__cards" color="#33A9F2">
                  <div style="display: flex; gap: 5px; align-items: center">
                    <P style="padding: 0; margin: 0; text-transform: capitalize" v-if="challenge?.user?.firstName">{{
        challenge?.user?.firstName }}</P>
                    <P style="padding: 0; margin: 0" v-if="challenge?.user?.lastName">{{ challenge?.user?.lastName }}
                    </P>
                  </div>
                </v-card-title>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 60px;     position: absolute;
    top: 18px;
    right: 10px;">
        <img @click="infoCommnities(challenge.challenge)"
          style="width: 100%; position: absolute; z-index: 100; top: -8px" :src="urlBucket + challenge.challenge.badge"
          alt="" />
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import noAvatar from "../../assets/img/png/userfeed.png";
import imageVideo from "../../assets/e.gif";
import buttomPlay from "@/assets/img/svg/play.svg"
import buttomPaused from "@/assets/img/svg/paused.svg"
export default {
  props: {
    ChallengesFront: String,
    challenge: Object,
    index: Number,
    challenges: Array,
    page: Number,
    members: Number,
    postsImpact: Array,
    userData: Object,
  },

  data() {
    return {
      id: null,
      imgNoUser: noAvatar,
      isPlaying: false,
      stateVideo: false,
      imageVideo,
      loading: false,
      buttomPlay,
      buttomPaused
    };
  },
  computed: {
    ...mapGetters("login", ["$cookies.get('username')"]),
    ...mapState("challenges", ["AllUserChallenge"]),
    urlBucket() {
      return process.env.api_assets_url;
    },
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
  methods: {
    ...mapActions("challenges", ["fullChallengeAction"]),
    openVideo() {
      this.$nuxt.$emit("fullScreenDefinitive", {
        status: true,
        content: this.postsImpact,
        index: this.index,
        from: "Impact",
        user: this.userData,
      });
    },
    play() {
      this.isPlaying = !this.isPlaying;
    },
    handleScroll() {
      /* var content_margin_top = window?.innerHeight * 0.30;
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
    infoCommnities(info) {
      console.log(' this.members,', this.postsImpact)
      this.$nuxt.$emit("openModalInfoCommunities", [
        true,
        info,
        this.members,
        "closetApp",
      ]);
    },
    loadVideo(e) {
      if (this.$refs.videoSearch.readyState > 3) {
        this.loading = false;
      } else {
        this.loading = true;
      }
    },
  },
  mounted() {
    /* window.addEventListener("scroll", this.handleScroll); */
  },
  destroyed() {
    /*    window.removeEventListener("scroll", this.handleScroll); */
  },
};
</script>

<style lang="scss" scoped>
.card-component {
  width: 390px;
  height: 390px;
  margin: 0 auto;
}

.card-component__positions {
  position: relative;
  width: 100%;
  height: 100%;
  top: -100%;
  z-index: 10;
}

.img-componente {
  border-bottom-right-radius: 40px !important;
  background-position: center;
  background-size: auto;
  background-repeat: no-repeat;
  border-radius: 24px 10px !important;
}

.user-compoennte {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}

.cards-green {
  position: absolute;
  bottom: 0;
}

.click-events {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 50;
}

.user-compoennte__cards {
  font-size: 18px;
  padding-left: 8px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px;
  display: block;
}

.description {
  background: rgb(0, 0, 0);
  background: linear-gradient(180deg,
      rgba(0, 0, 0, 0) 1%,
      rgba(0, 0, 0, 1) 100%);
  position: absolute;
  bottom: 5px;
  width: 100%;
  z-index: 150;
  /*  padding: 10px 0px; */
  border-bottom-right-radius: 40px;
}

.vidotest {
  width: 100%;
  height: 300px;
}

.imagen-no-avatar {
  width: 53px;
  height: 53px;
  /*  border-radius: 50%;
  border: 1px solid rgb(255, 255, 255);
  box-shadow: 0px 0px 8px 1px #616161; */
  object-fit: cover;
  border-radius: 100%
}

.img-Back {
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position-y: center;
  background-position-x: center;
  object-fit: fill;
}

.CardTrending-Container {
  -webkit-border-bottom-right-radius: 40px;
  -moz-border-radius-bottomright: 40px;
  border-bottom-right-radius: 40px !important;
}

.header-sponsorr {
  background-color: white;
  height: 60px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 15% 1fr;
  place-content: center;
  place-items: center;
  height: 60px;
  position: relative;
  box-shadow: 1px 1px 11px -3px black;
  top: -8px;
}

.video-search {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-search-play {
  position: absolute;
  top: 20px;
  z-index: 200;
  left: 15px;
}

.video-search-pause {
  position: absolute;
  top: 20px;
  z-index: 200;
  left: 15px;
}

.video-search-video {
  width: 100%;
  height: 100%;
  z-index: 1;
  border-top-left-radius: 40px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 40px;
  object-fit: cover;
  object-position: center center;
  box-shadow: 1px 1px 5px 2px #747474;

}

@media (max-width: 640px) {
  .card-component {
    width: 100%;
  }
}
</style>
