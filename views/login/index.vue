<template>
  <div>
    <!--   <SkeletonChallenge v-if="skeleton" /> -->
    <LoadingLogo v-if="skeleton" />
    <template>
      <div class="app">
        <div class="bg-gray">
          <div :class="[!user && 'card-padre-trending', user?.id && 'scroll-paddng']">
            <!-- <RecycleScroller class="scroller" id="example-scroll" 
             @scroll-end="handleScroll" 
             :items="userChallenges"
              :item-size="390" 
              key-field="id" 
              v-slot="{ index, item }">
              <CardTrending 
              :index="index" 
              :challenge="item" 
              :array="userChallenges" 
              :userData="user" />

            </RecycleScroller> -->
            <virtual-list :page-mode="true" @tobottom="handleScroll" make :keeps="4" list scrollable :data-key="'id'"
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
        <img class="welcome-notification__img" src="../../assets/img/png/viewSteve.png" />
        <v-icon size="25px" class="button-close" dark> mdi-close </v-icon>
        <div class="welcome-notification__container">
          <p>Add Shareity to your Home screen</p>
          <img v-if="showAppleInfo" class="welcome-notification__gif" src="../../assets/home-screen-apple.gif" />
          <img v-else class="welcome-notification__gif" src="../../assets/home-screen-google.gif" />
        </div>
      </div>
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
import Message from "../../components/elements/message/Message.vue";
import SkeletonChallenge from "../../components/loader/SkeletonChallenge.vue";
import LoadingLogo from "../../components/loader/LoadingLogo.vue";
import VirtualList from 'vue-virtual-scroll-list'

export default {
  components: {
    CardImpact,
    SearchChallenges,
    SearchModal,
    Message,
    SkeletonChallenge,
    LoadingLogo,
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
      console.log('e', e)
      if (window.location.pathname == "/" && this.getContentView === 2 && this.user) {
        this.loading = true
        if (this.loading) {
          this.getNetxPage({
            page: this.userChallengesPages + 1,
            items: 10,
            from: "Trending",
            idProfile: this.user.id,
          }).then((res) => {
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
        this.$nuxt.$emit("openLoginTwilio", [true]);
        console.log('this.$route', this.$route)
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
</style>

<style scoped>
.scroller {
  height: 100dvh;
  padding-top: 60px;
  padding-bottom: 160px;
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
  background: linear-gradient(#dddddd, #00000047);

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
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999 !important;
  top: 0;
  width: 400px;
  height: 100%;
}

.welcome-notification__img {
  position: absolute;
  /* background-image: url(../assets/img/png/viewSteve.png) !important;
  background-size: 100%;
  background-repeat: no-repeat; */
  height: 35%;
  right: 0;
  z-index: -10;
  bottom: 0;
}

.welcome-notification__container {
  position: absolute;
  right: 15%;
  width: 70%;
  margin-top: 5%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 15px #33a9f2;
  border-radius: 20px;
  font-size: 1.2rem;
  line-height: 23px;
  font-weight: bold;
  text-align: center;
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
  width: 100%;
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

@media (max-width: 640px) {
  .button-home {
    bottom: 75px;
    width: 100%;
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

@media (max-height: 750px) {
  .welcome-notification__container {
    right: 20% !important;
    width: 60% !important;
  }
}
</style>
