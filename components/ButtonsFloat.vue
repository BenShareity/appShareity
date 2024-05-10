<template>
  <!-- Footer Section -->
  <v-footer app  color="transparent" style="z-index: 100">
    <div v-model="selectedTab" background-color="transparent" icons-and-text slider-size="0"
      class="d-flex flex-column containerButtonsFloat" height="30px" :show-arrows="false" flat fixed-tabs centered
      :style="'right: ' + windowLeftT + 'px'">
      <template>
        <div class=" button-gloating text-center button-effect" style="margin-top: 9px; cursor: pointer"
          @click="goToButton('search')">
          <img style="width: 35px; object-fit: contain;" v-if="$route.path == '/search'"
            src="@/assets/img/button-float/search-activee.png" alt="">
          <img style="width: 35px; object-fit: contain;" v-else src="@/assets/img/button-float/search.png" alt="">
          <p style=" font-size: 10px;" :style="{ margin: 0, color: $route.path == '/search' ? '#00aef0' : '#e5e5e5' }">
            Search
          </p>
        </div>
        <div v-show="true" class=" button-gloating text-center button-effect" style="margin-top: 9px; cursor: pointer"
          @click="goToButton('Home')">
        

          <img style="width: 32px; object-fit: contain;" v-if="$route.path == '/'"
            src="@/assets/img/button-float/trending-active.png" alt="">
          <img style="width: 32px; object-fit: contain;" v-else src="@/assets/img/button-float/trending.png" alt="">
          <!--    <v-icon size="45" :color="getContentView === 2 ? '#00aef0' : '#e5e5e5'">
            mdi-fire</v-icon> -->
          <p style=" font-size: 10px;" :style="{ margin: 0, color: $route.path == '/' ? '#00aef0' : '#e5e5e5' }">
            Trending
          </p>
        </div>
        <div v-show="userData" class=" button-gloating text-center button-effect"
          style="margin-top: 9px; cursor: pointer" @click="goToButton('Impacts')">
          <img style="width: 35px; object-fit: contain;" v-if="$route.path == '/impacts'"
            src="@/assets/img/button-float/impact-active.png" alt="">
          <img style="width: 35px; object-fit: contain;" v-else src="@/assets/img/button-float/impact.png" alt="">


          <p style=" font-size: 10px;" :style="{ margin: 0, color: $route.path == '/impacts' ? '#00aef0' : '#e5e5e5' }">
            Impact
          </p>
        </div>
        <div v-show="userData" class=" button-gloating text-center button-effect" style=" cursor: pointer"
          @click="goToButton('community')">

          <svg v-if="$router.history.current.fullPath == '/mycommunities?tab=communities'" width="35" height="35"
            viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_942_94)">
              <rect x="6" y="2" width="13.1579" height="13.1579" rx="2" fill="url(#paint0_linear_942_94)" />
              <rect x="22.8422" y="2" width="13.1579" height="13.1579" rx="2" fill="url(#paint1_linear_942_94)" />
              <rect x="6" y="18.8423" width="13.1579" height="13.1579" rx="2" fill="url(#paint2_linear_942_94)" />
              <rect x="22.8422" y="18.8423" width="13.1579" height="13.1579" rx="6.57895"
                fill="url(#paint3_linear_942_94)" />
            </g>
            <defs>
              <filter id="filter0_d_942_94" x="0" y="0" width="42" height="42" filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="3" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_942_94" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_942_94" result="shape" />
              </filter>
              <linearGradient id="paint0_linear_942_94" x1="12.5789" y1="2" x2="12.5789" y2="15.1579"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#57B2F5" />
                <stop offset="1" stop-color="#044D83" />
              </linearGradient>
              <linearGradient id="paint1_linear_942_94" x1="29.4211" y1="2" x2="29.4211" y2="15.1579"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#57B2F5" />
                <stop offset="1" stop-color="#044D83" />
              </linearGradient>
              <linearGradient id="paint2_linear_942_94" x1="12.5789" y1="18.8423" x2="12.5789" y2="32.0002"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#57B2F5" />
                <stop offset="1" stop-color="#044D83" />
              </linearGradient>
              <linearGradient id="paint3_linear_942_94" x1="29.4211" y1="18.8423" x2="29.4211" y2="32.0002"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#57B2F5" />
                <stop offset="1" stop-color="#044D83" />
              </linearGradient>
            </defs>
          </svg>
          <svg v-else width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_930_80)">
              <rect x="6" y="2" width="13.1579" height="13.1579" rx="2" fill="white" />
              <rect x="22.8422" y="2" width="13.1579" height="13.1579" rx="2" fill="white" />
              <rect x="6" y="18.8423" width="13.1579" height="13.1579" rx="2" fill="white" />
              <rect x="22.8422" y="18.8423" width="13.1579" height="13.1579" rx="6.57895" fill="white" />
            </g>
            <defs>
              <filter id="filter0_d_930_80" x="0" y="0" width="42" height="42" filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="3" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_930_80" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_930_80" result="shape" />
              </filter>
            </defs>
          </svg>

          <p style="margin-top: -8px !important; margin-bottom: 0; font-size: 10px;"
            :style="{ color: $router.history.current.fullPath == '/mycommunities?tab=communities' ? '#00aef0' : '#e5e5e5' }">
            Community
          </p>
        </div>



        <div v-show="userData" class=" button-gloating text-center button-effect"
          style="margin-top: 9px; cursor: pointer" @click="goToButton('chat')">
          <img style="width: 35px; object-fit: contain;" v-if="$route.path == '/friends'"
            src="@/assets/img/button-float/chat-active.png" alt="">
          <img style="width: 35px; object-fit: contain;" v-else src="@/assets/img/button-float/chat.png" alt="">

          <p style=" font-size: 10px;"
            :style="{ margin: 0, color: $router.history.current.fullPath == '/friends' ? '#00aef0' : '#e5e5e5' }">
            Chat
          </p>
        </div>


      </template>
    </div>
  </v-footer>
</template>

<script>
/* Vuex Store */
import { mapActions, mapGetters, mapState } from "vuex";
import fire from '../assets/img/svg/fires.svg'
import collage from "../assets/img/collage.png";

import CardImpact from "./cards/CardImpact";

export default {
  props: {
    margin: Number,
  },
  components: {},
  head() {
    return {
      title: "Home",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Shareity Web App",
        },
        {
          name: "keywords",
          content: "home, snap, raise, shareity",
        },
      ],
    };
  },
  layout(context) {
    return "App";
  },
  data() {
    return {
      selectedTab: 1,
      fire,
      collage

    };
  },
  computed: {
    ...mapState("phoneSize", ["windowLeftT"]),
    ...mapGetters("content", ["getContentView"]),
    ...mapState("user", ["userData"]),
  },
  methods: {
    ...mapActions("content", ["changeContentView"]),

    goToButton(route) {
      console.log('this.$route', this.$route)
      console.log('this.$router', this.$router)

      switch (route) {
        case 'Home':
          this.$router.push({ path: `/` });
          this.changeContentView(2)
          break;
        case 'Impacts':
          this.$router.push({ path: `/impacts` });
          this.changeContentView(1)
          break;
        case 'community':
          this.$router.push({
            path: "/mycommunities",
            query: { tab: "communities" },
          });
          this.changeContentView(3)
          break;
        case 'search':
          this.$router.push({ path: "/search" });
          this.changeContentView(4)
          break;
        case 'chat':
          this.$router.push({
            path: "/friends"
          });
          break;
        default:
          break;
      }

    },
  },
  watch: {
    $router(to, from) {
      console.log('Route Change:', to, from)
    }
  },
};
</script>

<style scoped>
.button-effect {
  cursor: pointer;
  outline: none;
  color: #fff;
  border: none;
  border-radius: 15px;
}

.button-effect:active {
  transform: translateY(7px);
  color: rgba(0, 0, 0, 0.295);
}

.containerButtonsFloat {
  position: absolute;
  top: -350px;
  /*  background: rgb(0 0 0 / 48%); */
  width: 75px;
  /*   border-radius: 0 10px 10px 0; */
  font-size: 14px;
  padding: 5px 0;
  height: fit-content;
  border-radius: 10px;
  background: #0000006b;
  box-shadow: 0px 2px 11px 2px #0000004d;
  font-weight: 700;
}

.button-gloating {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.bg-active::before {
  background: linear-gradient(90deg,
      rgba(41, 46, 50, 0) 49%,
      rgba(255, 255, 255, 0.40379901960784315) 100%) !important;
  border-radius: 22px !important;
  opacity: 1 !important;
}

@media (max-width:640px) {
  .containerButtonsFloat {
    position: absolute;
    right: 0 !important;
    bottom: 0;
  }
}
</style>
