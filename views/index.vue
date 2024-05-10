<template>
  <div>
    <LoadingLogo v-if="skeleton" />
    <template>
      <div class="app">
        <div class="bg-gray">
          <div :class="[!user && 'card-padre-trending', user?.id && 'scroll-paddng']">
            <virtual-list class="m-custom-list" :page-mode="true" @tobottom="handleScroll" make :bottomThreshold="1000"
              :keeps="5" list :offset="200" ref="exampleScroll" scrollable :data-key="'id'"
              :data-sources="userChallenges" :data-component="itemComponent" :estimate-size="390"
              :item-class="'list-item-page'" :extra-props="{ userData: user, array: userChallenges }" />
            <div v-show="!user && userChallenges.length > 0 && animationBtton"
              :class="animationBtton ? 'button-home' : ''">
              <v-btn @click="openModalLogin" class="btn-challenge">
                Login to see more challenges
              </v-btn>
            </div>
            <div v-if="loading" class="loading-progres">
              <v-progress-circular size="40" indeterminate color="black"></v-progress-circular>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showInfo" class="welcome-notification" @click="closeInfo()">
        <img class="welcome-notification__img" src="../assets/img/png/steve1Screen.png" />

        <v-icon size="25px" class="button-close" @click="closeInfo()" dark> mdi-close </v-icon>

        <div
          style="position: absolute; width: 100%;  top: 25px;   padding-top: 20px;  display: flex; justify-content: flex-start;  align-items: center; flex-direction: column; height: 100dvh;">
          <h2 style="
    font-size: 15px;
    color: white;
    background: #3799e3;
    padding: 8px;
    border-radius: 12px;">ADD SHAREITY YOUR HOME SCREEN</h2>
          <img src="../assets/img/png/arrowHomeScreen.png" class="welcome-arrow_img">
          <div class="contend-ios">
            <div v-if="heightBroser && widthBroser" class="contend-ios__marco"
              :style="{ 'height': `calc(${heightBroser}px -  ${heightBroser < 800 ? '20% ' : '30% '} )`, 'width': `calc(${widthBroser}px -  ${widthBroser < 380 ? '25%' : '28%'}  )` }">
              <div class="contend-ios__marco_isla-dinamica">
                {{ heightBroser }}
                <div class="contend-ios__marco_isla-dinamica_borde">
                  <div class="contend-ios__marco_isla-dinamica_borde-punto"></div>
                </div>
              </div>
              <div class="button-volumen-timbre"></div>
              <div class="button-volumen-mas"></div>
              <div class="button-volumen-menos"></div>
              <div class="button-volumen-on"></div>
              <div class="button-volumen-nouth"></div>
              <div class="contend-ios__marco-contenido">
                <img style="width: 100%; height: 100%;" v-if="showAppleInfo" src="../assets/home-screen-apple.gif" />
                <img style="width: 100%; height: 100%;" v-else src="../assets/home-screen-google.gif" />
              </div>
            </div>
            <div class="contend-ios__marco-bottom"
              :style="{ 'height': `calc(${heightBroser}px -  ${heightBroser < 800 ? '20%' : '30% '} )`, 'width': `calc(${widthBroser}px -  ${widthBroser < 380 ? '25%' : '28%'}  )` }">
            </div>
          </div>
        </div>

      </div>
      <!--   <BubblyAnimation /> -->
      <!-- <Unsponsored/> -->
      <!--   <CloudsAnimation /> -->
    </template>

  </div>
</template>

<script>
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { mapActions, mapGetters, mapState } from "vuex";
import CardImpact from "@/components/cards/CardImpact";
import CardTrending from "@/components/cards/CardTrending";
import SearchChallenges from "@/components/cards/SearchChallenges";
import SearchModal from "@/components/modals/SearchModal.vue";
import Message from "../components/elements/message/Message.vue";
import SkeletonChallenge from "../components/loader/SkeletonChallenge.vue";
import LoadingLogo from "../components/loader/LoadingLogo.vue";
import VirtualList from 'vue-virtual-scroll-list'
import imgPhoneMarco from '../assets/img/png/iphone14p.png'
import gifApple from '../assets/home-screen-apple.gif'
import gifAndroid from '../assets/home-screen-google.gif'
import marcoIO from '../assets/img/svg/iphone14pro.svg'
import BubblyAnimation from '../components/animationsChallenge/BubblyAnimation.vue'
import Unsponsored from '../components/animationsChallenge/Unsponsored.vue'
import CloudsAnimation from '../components/animationsChallenge/CloudsAnimation.vue'
export default {
  components: {
    CardImpact,
    SearchChallenges,
    SearchModal,
    Message,
    SkeletonChallenge,
    LoadingLogo,
    BubblyAnimation,
    Unsponsored,
    CloudsAnimation,
    'virtual-list': VirtualList
  },
  layout(context) {
    return "App";
  },
  data() {
    return {
      searchText: "",
      showInfo: false,
      showAppleInfo: false,
      loading: false,
      page: 1,
      itemsPerPage: 10,
      postsTrending: [],
      activeLoading: false,
      skeleton: false,
      user: null,
      control: false,
      animationBtton: false,
      itemComponent: CardTrending,
      imgPhoneMarco,
      gifAndroid,
      gifApple,
      marcoIO
    };
  },
  watch: {
    searchText(value) {
      value = value.toLowerCase();
      this.promotional = [];
      this.getPromotional.map((item) => {
        if (item.name.toLowerCase().indexOf(value) >= 0)
          this.promotional.push(item);
      });
    },
  },
  computed: {
    ...mapGetters("challenges", ["getChallenges"]),
    ...mapGetters("content", ["getContentView"]),
    ...mapState("infiniteScroll", ["userChallenges", "userChallengesPages"]),
    items() {
      let end = this.itemsPerPage
      if (this.user) {
        end = this.itemsPerPage * this.page
      }
      return this.userChallenges.slice(0, end)
    },
    heightBroser() {
      return process.client && window.innerHeight
    },
    widthBroser() {
      return process.client && window.innerWidth
    }
  },

  methods: {
    ...mapActions("user", ["nicknameAction"]),
    ...mapActions("infiniteScroll", ["getNetxPage"]),
    ...mapActions("content", ["changeContentView"]),
    openModalLogin() {
      this.$nuxt.$emit("openLogin", [true]);
    },
    /*  loadMoreChallenge(e) {
       if (this.user) {
         if (window.location.pathname == "/" && this.getContentView === 2) {
           this.loading = true;
           let { scrollTop, clientHeight, scrollHeight } = e.target;
           if (scrollTop + clientHeight >= (scrollHeight * 8) / 8) {
             this.getNetxPage({
               page: this.userChallengesPages + 1,
               from: "Trending",
               idProfile: this.user.id,
             }).then((res) => {
               setTimeout(() => {
                 this.loading = false;
               }, 1000);
               setTimeout(this.statusControl(true), 100);
             });
           }
         }
       }
     }, */
    go(e) {
      console.log('dfsdfsdfsdfcvhjkl', e)

    },
    onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      let scrolledToBottom =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;

      if (scrolledToBottom) {
        console.log('hola')
      }
    },
    handleScroll(e) {
      if (window.location.pathname == "/" && this.getContentView === 2 && this.user) {

        if (!this.loading) {
          this.loading = true
          this.getNetxPage({
            page: this.userChallengesPages + 1,
            items: 10,
            from: "Trending",
            idProfile: this.user.id,
          }).then((res) => {
            console.log('res', res)
            this.loading = false;
          });
        }

      }
      if (!this.user && !this.animationBtton) {
        console.log('hola')
        this.animationBtton = true
        setTimeout(() => {
          this.animationBtton = false
        }, 6000);
      }

      console.log('hola')
    },
    statusControl(status) {
      this.control = status;
    },
    closeInfo() {
      this.showInfo = false;
      localStorage.setItem("trending", 0);
    },
  },

  unmounted() {
    if (process.client && document.body.clientHeight) {
      window.removeEventListener("scroll", this.onScroll);
    }
  },

  mounted() {
    this.skeleton = true;
    document.documentElement.style.overflow = "hidden";
    this.statusControl(false);

    this.nicknameAction().then((user) => {
      this.getNetxPage({
        page: 1,
        items: 10,
        from: "Trending",
        idProfile: user.id,
      }).then((res) => {
        document.documentElement.style.overflow = "auto";
        this.skeleton = false;
        setTimeout(this.statusControl(true), 100);
        if (!this.user) {
          this.userChallenges.slice(0, 10)
        }
      });
      window.addEventListener("scroll", this.onScroll);
      setTimeout(this.statusControl(true), 2000);
    });

  },

  created() {
    this.changeContentView(2)
    this.nicknameAction().then((user) => {
      this.user = user;
      if (process.client) {
        const res = localStorage?.getItem("trending");
        this.showInfo = res == 1 ? true : false;
        this.showAppleInfo = navigator.vendor.includes("Apple");
      }
    });
  },
};
</script>

<style>
.country-selector__list .vue-recycle-scroller.ready .vue-recycle-scroller__item-view {
  position: initial !important;
}

.country-selector__list .vue-recycle-scroller.direction-vertical:not(.page-mode) {
  overflow: hidden !important;
}

.country-selector__list .vue-recycle-scroller.direction-vertical .vue-recycle-scroller__item-wrapper {
  width: 100%;
  height: fit-content;
  padding-bottom: 290px;
}

.v-dialog:not(.v-dialog--fullscreen) {
  max-height: inherit !important;
}
</style>

<style scoped>
.scroller {
  height: 100dvh;
  padding-top: 60px;
  padding-bottom: 160px;
}

.parent {
  position: relative;
  top: 0px;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-iphone-homeScreen {
  width: 1175px;
  object-fit: cover;
  position: relative;
  left: 89px;
  top: 55px;
}

.vue-recycle-scroller__item-view {
  position: initial !important;
}

.button-close {
  position: absolute;
  right: 10px;
  top: 10px;
  color: white;
}

.input-search {
  padding: 4px 2px;
  margin-bottom: 6px;
  border: 2px solid #33a9f2;
  border-radius: 5px;
  display: block;
  width: 80%;
}

.loading-progres {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 85px;
}

.container {
  position: absolute;
  top: -380px;
  left: 0;
  background: rgba(0, 0, 0, 0.793);
  width: 75px;
  border-radius: 0 10px 10px 0;
  font-size: 14px;
}

/* .card-padre-trending {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-bottom: 130px;
  padding-top: 100px;
} */

.bg-gray {
  /*  background: linear-gradient(#818181, #00000047); */
  background: #f3f4f6;

}

.card-padre-impact {
  display: flex;
  flex-direction: column;
  gap: 40px;
  background: linear-gradient(#dddddd, #00000047);
  padding-bottom: 130px;
  padding-top: 100px;
  height: 100dvh;
}

.bg-active::before {
  background: linear-gradient(90deg,
      rgba(41, 46, 50, 0) 49%,
      rgba(255, 255, 255, 0.40379901960784315) 100%) !important;
  border-radius: 22px !important;
  opacity: 1 !important;
}

.button-home {
  position: absolute;
  bottom: 75px;
  display: flex;
  justify-content: center;
  width: 100%;
  animation: fadeInBottom 1.5s forwards;
}



@keyframes fadeInBottom {
  from {
    opacity: 0;
    transform: translateY(100%);
  }

  to {
    opacity: 1
  }
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

.moreContent {
  text-align: center;
}

.welcome-notification {
  position: fixed;
  background: rgb(126, 126, 126);
  background: linear-gradient(180deg, rgb(126 126 126 / 17%) -30%, rgba(0, 0, 0, 1) 96%);
  z-index: 9999 !important;
  top: 0;
  width: 400px;
  height: 100dvh;
}

.welcome-notification__img {
  position: absolute;
  right: 0;
  z-index: 100;
  bottom: 0;
  height: 19%;
}

.p-homeScreen-content {
  color: white;
  font-size: 14px;
  margin-top: 14px;
  background-color: #3192d9;
  border-radius: 10px;
  width: 260px;
  padding: 10px;
  position: relative;
  top: 185px;
  left: 42px;
}

.welcome-notification__container {
  position: absolute;
  right: 0px;
  padding: 0;
  width: 100%;
  border-radius: 20px;
  font-size: 1.2rem;
  line-height: 23px;
  font-weight: bold;
  text-align: center;
  height: 100%;
  top: 0;
}

.welcome-arrow_img {
  position: relative;
  top: -4%;
  right: -184px;
  height: 145px;
}

.list-page {
  width: 100%;
  border: 2px solid;
  border-radius: 3px;
  overflow-y: auto;
  border-color: dimgray;
}

.scroll-paddng {
  padding-bottom: 150px;
}

.list-item-page {
  display: flex;
  align-items: center;
  padding: 1em;
  border-bottom: 1px solid;
  border-color: lightgray;

}

.bottom {
  padding: 2em 0;
}

.welcome-notification__gif {
  border-radius: 36px;
  height: 543px;
  -o-object-fit: contain;
  object-fit: contain;
  position: relative;
  z-index: -2;
  top: 49px;
  right: 624px;
}

/* @media all and (orientation:portrait) {
  .mensaje {
    display: none;
  }
}

@media(min-width:1024px) {
  .mensaje {
    display: none;
  }
}

:root {
  touch-action: pan-x pan-y;
  height: 100% 
}

@media all and (orientation:landscape) {

  .mensaje {
    position: fixed;
    height: 100vh;
    background: white;
    top: 0;
    rotate: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 9999999999;
    width: 100%;
  }
} */


/* .iphone{
  width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
} */
.iphone-14 {
  width: 227px;
  height: 478px;
  border: 5px solid black;
  background: white;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 47px;
  position: relative;
  margin: 0 auto;
}

.operator-name {
  position: absolute;
  top: 16px;
  left: 30px;
  font-size: 14px;
  color: white;
}

.dynamic-island {
  width: 84px;
  height: 26px;
  background: black;
  border-radius: 50px;
  margin: 0 auto;
  margin-top: 10px;
  position: absolute;
  left: 65px;
  z-index: 99999;
  transition: all .5s;
}

.dynamic-island-camera {
  color: white;
  position: absolute;
  top: 18px;
  right: 128px;
  background: #121212;
  box-shadow: 0 0 1px grey;
  width: 10px;
  height: 10px;
  border-radius: 50px;
  z-index: 99999;
  transition: all .5s;
}

.operator-icons {
  position: absolute;
  top: 16px;
  right: 50px;
  font-size: 14px;
  transition: all .2s;
  color: white;
}

.battery {
  width: 20px;
  height: 10px;
  border: 2px solid #fff;
  border-radius: 4px;
  font-size: 10px;
  text-align: center;
  color: #000;
  background: #Fefefe;
  font-weight: bold;
  position: absolute;
  top: 0px;
  right: -28px;
}

.date-area {
  margin-top: 60px;
  width: 100%;
  text-align: center;
  color: white;
}

.clock-area {
  margin-top: 5px;
  width: 100%;
  text-align: center;
  font-size: 60px;
  font-family: 'Monoton', cursive;
  color: white;
}

.widget-area {
  margin-top: 10px;
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: white;
}

.widget {
  margin: 0 5px;
  padding: 5px;
  border-radius: 10px;
  transition: all 1s;
  cursor: pointer;
}

.widget i {
  transition: all 1s;
}

.widget:hover .spotify {
  color: #1ED760;
}

.quiet {
  display: none;
  color: gray;
  transition: all 2s;
  animation: bellNtf 2s;
}

@keyframes bellNtf {

  0%,
  40%,
  80%,
  100% {
    color: gray;
  }

  10%,
  60%,
  90% {
    color: red;
  }
}

.notification {
  margin: 0 40px;
  margin-top: 50px;
  padding: 15px;
  border-radius: 10px;
  position: absolute;
  visibility: hidden;
  background-color: rgba(255, 255, 255, 0.250);
  transition: all .5s;
  animation: notification .5s forwards;
  animation-delay: 10s;
  color: white;

}


@keyframes notification {
  from {
    bottom: 180px;
    opacity: 0;
    visibility: hidden;
  }

  to {
    bottom: 100px;
    opacity: 1;
    visibility: visible;
  }
}

.notification-text {
  font-size: 15px;
  color: #fff;
}

.flash-and-camera img {
  position: absolute;
  bottom: 30px;
  left: 20px;
  filter: invert(100%);
  padding: 10px;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.337);
  transition: all .5s;
  cursor: pointer;
  z-index: 99999;
}

.flash-and-camera img:hover {
  background-color: rgba(255, 255, 255, 1);
}

.flash-and-camera i {
  position: absolute;
  bottom: 30px;
  right: 20px;
  color: black;
  filter: invert(100%);
  padding: 10px;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.337);
  z-index: 99999;
  cursor: pointer;
  transition: all .5s;
}

.flash-and-camera i:hover {
  background-color: rgba(255, 255, 255, 1);
}


.bell-animation-area {
  width: 100px;
  height: 25px;
  background: black;
  border-radius: 47px;
  position: absolute;
  left: 100px;
  top: 10px;
  z-index: 99999;
  display: none;
  color: #fff;
  animation: dynamicIslandAnm 7s;
}

@keyframes dynamicIslandAnm {

  0%,
  100% {
    width: 100px;
    height: 25px;
    left: 100px;
    opacity: 0 !important;
  }

  20%,
  80% {
    width: 270px;
    height: 40px;
    left: 15px;
    display: block;
  }
}

.bell-animation {
  position: absolute;
  width: 100%;
  top: 15px;
  visibility: hidden;
  opacity: 0;
  left: 0;
  text-align: center;
  z-index: 99999;
  transition: all 1s;
  animation: dynamicIslandText 5s;
  animation-delay: .5s;
  display: none;
  color: #fff;
}

@keyframes dynamicIslandText {

  0%,
  100% {
    top: 10px;
    visibility: hidden;
    opacity: 0
  }

  20%,
  80% {
    top: 22px;
    visibility: visible;
    opacity: 1
  }
}

.bell-animation i {
  color: red;
}


.bell-animation-area-slash {
  width: 100px;
  height: 25px;
  background: #000;
  border-radius: 47px;
  position: absolute;
  left: 100px;
  top: 10px;
  z-index: 99999;
  display: none;
  color: #fff;
  animation: dynamicIslandAnm 7s;
}

@keyframes dynamicIslandAnm {

  0%,
  100% {
    width: 100px;
    height: 25px;
    left: 100px;
    opacity: 0 !important;
  }

  20%,
  80% {
    width: 270px;
    height: 40px;
    left: 15px;
    display: block;
  }
}

.bell-animation-slash {
  position: absolute;
  width: 100%;
  top: 15px;
  visibility: hidden;
  opacity: 0;
  left: 0;
  text-align: center;
  z-index: 99999;
  transition: all 1s;
  animation-delay: .5s;
  display: none;
  color: #fff;
}

.bell-animation-slash i {
  color: red;
}



.c-gray {
  color: gray;
}

.bi-soundwave {
  position: absolute;
  top: 14px;
  color: #fff;
  left: 120px;
  z-index: 99999;
  animation: volumeUp 3s infinite;
  display: none;
  cursor: pointer;
  transition: all .5s;
}

@keyframes volumeUp {

  0%,
  50%,
  100% {
    color: #fff;
    opacity: 1;
  }

  20%,
  40%,
  60%,
  80% {
    color: #ffd0c7;
    opacity: .8;
  }
}

.music-player {
  text-align: center;
  margin-top: 0px;
  visibility: hidden;
  opacity: 0;
  transition: all .5s;
}

.music-poster {
  width: 250px;
  height: 200px;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transform: scale(.9);
  transition: all .5s;
  text-align: center;
  margin: 0 auto;
  margin-left: 5px;
}

.bi-pause-fill {
  display: none;
}

.music-details {
  width: 225px;
  text-align: center;
  background: rgba(255, 255, 255, 0.925);
  backdrop-filter: blur(5px);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  color: #000;
  padding: 10px;
  border-radius: 10px;
  margin-left: 30px;
  margin-top: 5px;
  overflow: hidden;
  position: relative;
}

#sarki {
  height: 15px;
  width: 430px;
  position: absolute;
  left: -110px;
  margin-top: 10px;
}

.music-details::before {
  content: "";
  width: 15px;
  height: 50px;
  background: #efeff2;
  position: absolute;
  top: 40px;
  left: 0;
  z-index: 999999;
}

.music-details::after {
  content: "";
  width: 15px;
  height: 50px;
  background-color: #efeff2;
  position: absolute;
  top: 40px;
  right: 0;
  z-index: 999999;
}

.player {
  margin-top: 30px;
}

.player i {
  font-size: 25px;
  margin: 0 10px;
}

.bi-cast {
  position: absolute;
  bottom: 15px;
  right: 10px;
  font-size: 15px !important;
}

.player button {
  background: transparent;
  border: none;
  cursor: pointer;
}

.fuel-area {
  position: absolute;
  left: 0;
  border-radius: 10px;
  bottom: 100px;
  width: 267px;
  padding: 10px;
  margin: 0 6px;
  visibility: hidden;
  opacity: 0;
  transition: all .5s;
  background-color: rgba(255, 255, 255, 0.750);
  backdrop-filter: blur(5px);
}

.fuel-area img {
  width: 110px;
  height: 101px;
  border-radius: 10px;
}

.fuel-ntf-app {
  position: absolute;
  top: 15px;
  left: 130px;
}

.bi-geo-alt-fill {
  color: #fff;
  position: absolute;
  top: 11px;
  right: 100px;
  font-size: 12px;
  padding: 5px;
  background: #000;
  border-radius: 50px;
  z-index: 99999;
  visibility: hidden;
  opacity: 0;
  transition: all .5s;
  animation: fuel 3s infinite;
  text-align: center;
}

@keyframes fuel {

  0%,
  50%,
  100% {
    color: #fff;
    opacity: 1;
  }

  20%,
  40%,
  60%,
  80% {
    color: red;
    opacity: .8;
  }
}

.m-custom-list {
  padding-top: 60px;
}


@media (max-width: 640px) {
  .button-home {
    bottom: 75px;
    width: 100%;
  }



  .m-custom-list {
    padding: 10px;
    padding-top: 60px;
  }

  /*   .card-padre-trending {
    padding-bottom: 30%;
  } */

  .app {
    width: 100%;
  }

  .welcome-notification {
    width: 100% !important;
  }
}

/* @media (max-height: 750px) {
  .iphone-14 {
  width: 70vw;
  height: 80vh;
}
.dynamic-island,.line{
  left: 80px;
}
} */
</style>


<style scoped>
.button-volumen-menos::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 43px;
  background-color: black;
  left: -12px;
  top: 140px;
  box-shadow: -4px -1px 0px -2.8px #ffffff70;
}

.button-volumen-mas::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 43px;
  background-color: black;
  left: -12px;
  top: 200px;
  box-shadow: -4px -1px 0px -2.8px #ffffff70;
}

.button-volumen-timbre::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 23px;
  background-color: black;
  left: -12px;
  top: 100px;
  box-shadow: -4px -1px 0px -2.8px #ffffff70;
}

.button-volumen-on::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 73px;
  background-color: black;
  right: -12px;
  top: 145px;
  box-shadow: 4px -1px 0px -2.8px #ffffff70;
}

.button-volumen-nouth {
  position: absolute;
  bottom: 1%;
  width: 50%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.623);

}

.contend-ios {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  position: absolute;
  top: 0;
}

.contend-ios__marco {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 8px solid black;
  /*   height: calc(932px - 232px); */
  /*   width: calc(430px - 25%); */
  margin: 0 auto;
  border-radius: 50px;
}

.contend-ios__marco_isla-dinamica {
  width: 40%;
  z-index: 9999;
  border: 1px solid #ffffff30;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: black;
  position: absolute;
  top: 1%;
  border-radius: 20px;
}

.contend-ios__marco_isla-dinamica_borde {
  width: 15px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15px;
  border: 1px solid rgba(255, 255, 255, 0.384);
  border-radius: 100%;
}

.contend-ios__marco_isla-dinamica_borde-punto {
  width: 2px;
  height: 2px;
  border-radius: 100%;
  background-color: #b2b2b2;
}

.contend-ios__marco-contenido {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 40px;
}

.contend-ios__marco-bottom {
  position: absolute;
  box-shadow: 0 0 5px rgb(255, 255, 255);
  border: 2px solid #b2b2b2;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  border-radius: 50px;
}

/* @media (max-width: 690px) {
  .contend-ios__marco {
    width: 75%;
    height: 70%;
  }

  .contend-ios__marco-bottom {
    width: 75%;
    height: 70%;
  }
}
@media (max-width: 375px) {
  .contend-ios__marco {
    width: 65%;
  }

  .contend-ios__marco-bottom {
    width: 65%;
  }
} */
</style>
