<template>
  <div class="container"
    :class="(effectModal == 'false' || !effectModal) && [mostrar ? 'container_in' : 'container_out']">
    <div style="display: flex; justify-content: space-between; align-items: center">
      <template>
        <div v-for="(item, i) in items"
          :style="item.url == location ? { backgroundColor: '#fff', boxShadow: 'inset #0000008f -1px 5px 12px -5px', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' } : {}"
          :key="i" style="
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 5px;
            padding: 12px;
            width: 100%;
           
          ">
          <div class="card-icon" @click="openButton(item.url)">
            <div class="v-card" v-if="item.url == location" style="
              
                display: flex;
                padding: 7px;
                justify-content: center;
                align-items: center;
              ">
              <img class="icon-size" :src="item.icon" />
            </div>
            <div class="v-card" v-else style="
                background-color: #01386e;
                display: flex;
                padding: 7px;
                justify-content: center;
                align-items: center;
              ">
              <img class="icon-size" :src="item.iconWhite" />
            </div>
          </div>
          <div>
            <span v-if="item.url == location" style="
                font-size: 15px !important;
                color: #2F4B75 !important;
                font-weight: 500;
              ">
              {{ item.title }}
            </span>
            <span v-else style="
                font-size: 15px !important;
                color: #ffffff99 !important;
                font-weight: 500;
              ">{{ item.title }}</span>
          </div>
        </div>
      </template>
    </div>

    <div class="padre-overflow">
      <template v-if="loading">
        <div class="sway-header">
          <v-skeleton-loader max-height="230px" class="sways-card" :elevation="5"
            type="card-avatar"></v-skeleton-loader>
          <v-skeleton-loader max-height="50px" class="sways-card-1" :elevation="5"
            type="card-avatar"></v-skeleton-loader>
          <v-skeleton-loader max-height="50px" class="sways-card-2" :elevation="5"
            type="card-avatar"></v-skeleton-loader>
          <v-skeleton-loader max-height="400px" class="sways-card-3" :elevation="5"
            type="card-avatar"></v-skeleton-loader>
        </div>
      </template>
      <template v-else>
        <div class="card">
          <div class="percent">
            <svg>
              <circle cx="180" cy="130" r="110"></circle>
              <circle cx="180" cy="130" r="110" ref="circle"></circle>
            </svg>
            <div class="card-img number">
              <h3>
                Sway <br>
                {{ power?.value }} <br />
              </h3>
              <!-- <img v-if="power?.level?.url" :src="urlBucket + power?.level?.url" /> -->
            </div>
          </div>
        </div>
        <!-- <div class="number">
          <p>{{ power?.level?.name }}</p>
          <div>
            <h3>{{ power?.value }} </h3>
            <h3>Sway</h3>
          </div>

        </div> -->

        <div class="section-2" v-if="listo">
          <div class="section-2-title">Impressions</div>
          <div class="card">
            <div class="percent">
              <svg>
                <circle cx="180" cy="130" r="110"></circle>
                <circle cx="180" cy="130" r="110" ref="circle1"></circle>
              </svg>
              <div class="card-img number">
                <h3>
                  Total<br />
                  {{ totalImpressions }}

                </h3>
                <!-- <img v-if="power?.level?.url" :src="urlBucket + power?.level?.url" /> -->
              </div>
            </div>
          </div>
          <div class="line-chart-custom">
            <p>This Week</p>
            <div class="line-point">
              <div class="line-point_contend">
                <div class="line-point_text">Week 2</div>
              </div>
            </div>
            <p>Last week</p>
          </div>
        </div>
        <div class="section-2" v-if="listo">
          <div class="section-2-title">My Network Effect</div>
          <div class="card">
            <div class="percent">
              <svg>
                <circle cx="180" cy="130" r="110"></circle>
                <circle cx="180" cy="130" r="110" ref="circle2"></circle>
              </svg>
              <div class="card-img number">
                <h3>
                  People <br> Influenced<br />
                  {{ totalInfluenceds }}

                </h3>
              </div>
            </div>
          </div>
          <div class="line-chart-custom">
            <p>This Week</p>
            <div class="line-point">
              <div class="line-point_contend">
                <div class="line-point_text">Week 5</div>
              </div>
            </div>
            <p>Last week</p>
          </div>
        </div>
        <div class="section-3">
          <div class="section-2-title">Engagement Rates</div>
          <div class="redes-contend">
            <img :src="Whatsapp" alt="" @click="openPopup(true, 'whatsapp')" />
            <img :src="instagram" alt="" @click="openPopup(true, 'instagram')" />
            <img :src="facebook" alt="" @click="openPopup(true, 'facebook')" />
            <img :src="twitter" alt="" @click="openPopup(true, 'twitter')" />
            <img :src="tiktok" alt="" @click="openPopup(true, 'tiktok')" />
            <img :src="pinterest" alt="" @click="openPopup(true, 'pinterest')" />
          </div>
        </div>
      </template>
    </div>

    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-inner">
            <div class="modal-title">{{ socialName }}</div>
            <div class="modal-text">
              <div class="modal-body">
                <div class="modal-body_icon">
                  <img src="../../../assets/img/svg/Share.svg" alt="">
                  <p> Total Shares: </p>
                  <p v-if="totalShares"> {{ totalShares }} </p>
                  <p v-else>0</p>

                </div>
                <div class="modal-body_icon">
                  <img src="../../../assets/img/svg/Views.svg" alt="">
                  <p> Total Views: </p>
                  <p v-if="totalViews"> {{ totalViews }} </p>
                  <p v-else>0</p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-buttons">
            <button class="modal-button" @click="openPopup(false)">OK</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("header", ["getHeaderType"]),
    urlBucket() {
      return process.env.api_assets_url;
    },
  },
  watch: {
    power(value) {
      setTimeout(() => {
        this.$refs.circle.style.cssText = ` --percent: ${value.value}`;
        this.$refs.circle1.style.cssText = ` --percent: ${this.totalInfluenceds}`;
        this.$refs.circle2.style.cssText = ` --percent: ${this.totalImpressions}`;
      }, 100);
    },
    getHeaderType(value) {
      if (value == 1) this.goBack();
    },
  },
  created() {


    this.loading = true;
    if (process.client) {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.overscrollBehaviorY = 'none';
      this.location = window.location.pathname;
      this.effectModal = localStorage.getItem("effect-Modal");
      this.nicknameAction().then((session) => {
        if (session) {
          try {
            this.swayScoreAction({
              id: session.id,
            }).then((r) => {
              this.info = r.social;
              this.totalInfluenceds = 0;
              this.totalImpressions = 0;
              for (let index = 0; index < 31; index++) {
                const element = index + 1;
                if (r.influenced[element.toString()] != undefined) {
                  this.influencedData.labels.push(element.toString());
                  this.influencedData.datasets[0].data.push(
                    r.influenced[element.toString()]
                  );
                  this.totalInfluenceds += r.influenced[element.toString()];
                }
                if (r.engagament[element.toString()] != undefined) {
                  this.impressionsData.labels.push(element.toString());
                  this.impressionsData.datasets[0].data.push(
                    r.engagament[element.toString()]
                  );
                  this.totalImpressions += r.engagament[element.toString()];
                }
                if (index == 30) {
                  this.listo = true;
                }
              }
            });
            setTimeout(() => {
              this.loading = false;
              this.power = JSON.parse(localStorage.getItem("points"));
            }, 2000);
          } catch (error) {
            setTimeout(() => {
              this.loading = false;
              this.power = JSON.parse(localStorage.getItem("points"));
            }, 2000);
            console.log("error swayScoreAction", error);
          }
        }
      });
    }



    this.changeHeaderType(2);
  },

  layout(context) {
    return "App";
  },
  data: () => ({
    loading: null,
    power: null,
    Whatsapp: require("~/assets/img/png/social/whatsapp.png"),
    facebook: require("~/assets/img/png/social/facebook.png"),
    twitter: require("~/assets/img/png/social/x.png"),
    pinterest: require("~/assets/img/png/social/pinterest.png"),
    instagram: require("~/assets/img/png/social/instagram.png"),
    linkedin: require("~/assets/img/svg/sway/LinkedinIcon.svg"),
    tiktok: require("~/assets/img/png/social/tiktok.png"),
    items: [
      {
        title: "Raised",
        icon: require("~/assets/img/png/raised-icon.png"),
        iconWhite: require("~/assets/img/png/raised-icon-white.png"),
        url: "/swayscores/raised",
      },
      {
        title: "Points",
        icon: require("~/assets/img/png/points-icon.png"),
        iconWhite: require("~/assets/img/png/points-icon-white.png"),
        url: "/swayscores/points",
      },
      {
        title: "Total",
        icon: require("~/assets/img/png/total-icon.png"),
        iconWhite: require("~/assets/img/png/total-icon-white.png"),
        url: "/swayscores/total",
      },
      {
        title: "Loves",
        icon: require("~/assets/img/png/loves-icon.png"),
        iconWhite: require("~/assets/img/png/loves-icon-white.png"),
        url: "/swayscores/loves",
      },
      {
        title: "Influenced",
        icon: require("~/assets/img/png/influenced-icon.png"),
        iconWhite: require("~/assets/img/png/influenced-icon-white.png"),
        url: "/swayscores/influenced",
      },
    ],
    totalInfluenceds: null,
    totalImpressions: null,
    location: "",
    listo: false,
    info: null,
    socialName: null,
    totalViews: null,
    totalShares: null,
    show: false,
    effectModal: null,
    mostrar: true,
    impressions: 0,
    impressionsData: {
      labels: [],
      datasets: [
        {
          data: [],
          label: "",
          borderColor: "#4CD4FF",
          backgroundColor: "#CCFFFF",
        },
      ],
    },
    influencedData: {
      labels: [],
      datasets: [
        {
          data: [],
          label: "",
          borderColor: "#4CD4FF",
          backgroundColor: "#CCFFFF",
          fill: false,
        },
      ],
    },
  }),

  methods: {
    ...mapActions("user", ["swayScoreAction", "nicknameAction"]),
    ...mapActions("header", ["changeHeaderType"]),

    openButton(url) {
      this.$router.push({ path: url });
    },
    goBack() {
      this.effectModal = false;
      this.mostrar = false;

      setTimeout(() => {
        document.documentElement.style.overflow = "initial";
        document.documentElement.style.overscrollBehaviorY = 'initial';
        this.$router.push("/");
        localStorage.setItem("effect-Modal", false);
      }, 150);
    },

    openPopup(show, social) {
      this.show = show;
      console.log('show', show)
      console.log('social', this.info)
      switch (social) {
        case "instagram":
          this.socialName = "Instagram";
          this.totalShares = this.info?.instagram?.shares;
          this.totalViews = this.info?.instagram?.views;
          break;
        case "facebook":
          this.socialName = "Facebook";
          this.totalShares = this.info?.facebook?.shares;
          this.totalViews = this.info?.facebook?.views;
          break;
        case "linkedin":
          this.socialName = "Linkedin";
          this.totalShares = this.info?.linkedin?.shares;
          this.totalViews = this.info?.linkedin?.views;
          break;
        case "twitter":
          this.socialName = "Twitter";
          this.totalShares = this.info?.twitter?.shares;
          this.totalViews = this.info?.twitter?.views;
          break;
        case "whatsapp":
          this.socialName = "Whatsapp";
          this.totalShares = this.info?.whatsapp?.shares;
          this.totalViews = this.info?.whatsapp?.views;
          break;
        case "pinterest":
          this.socialName = "Pinterest";
          this.totalShares = this.info?.pinterest?.shares;
          this.totalViews = this.info?.pinterest?.views;
          break;
        case "tiktok":
          this.socialName = "Tiktok";
          this.totalShares = this.info?.tiktok?.shares;
          this.totalViews = this.info?.tiktok?.views;
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="css" scoped>
.line-chart-custom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  gap: 10px;
  margin-top: 40px;
}

.line-point::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: #2F4B75;
  right: 0;
  top: -4px;
  box-shadow: 0px 0px 4px 0px black;
  z-index: 100;
}

.line-point {
  position: relative;
}

.line-point_text {
  position: absolute;
  top: -30px;
  right: -15px;
  font-size: 12px;
  color: #2F4B75;
  white-space: pre;
}

.line-point::before {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: #2F4B75;
  left: 0;
  top: -4px;
  box-shadow: 0px 0px 4px 0px black;
  z-index: 100;
}

.line-chart-custom p {
  color: #2F4B75;
  font-weight: 800;
  font-size: 12px;
  margin: 0;
  padding: 0;
  white-space: pre;
}

.line-chart-custom .line-point {
  width: 100%;
  height: 3px;
  background-color: #2F4B75
}

.line-point_contend {
  width: 50%;
  height: 100%;
  background-color: #E0E1E1;
  position: relative;
}

.line-point_contend::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 100%;
  background-color: #E0E1E1;
  right: 0;
  top: -5px;
  box-shadow: 0px 0px 4px 0px black;
}

.card-img {
  width: 100%;
  text-align: center;
  color: #2F4B75;
  font-size: 25px;
}

.card-img img {
  object-fit: contain;
  height: 50px;
}

.card-img p {
  font-size: 25px;
  font-family: roboto;
  color: white;
  font-weight: 500;
}

.redes-contend {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  align-items: center;
  padding: 20px 25px;
  white-space: pre;
  overflow: auto;
}

/* width */
.redes-contend::-webkit-scrollbar {
  width: 10px;
  height: 5px;
}

/* Track */
.redes-contend::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.redes-contend::-webkit-scrollbar-thumb {
  background: #2F4B75;
}

/* Handle on hover */
.redes-contend::-webkit-scrollbar-thumb:hover {
  background: #2F4B75;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal-body_icon {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-content: center;
  place-items: center;
  gap: 10px;
}

.modal-body_icon p {

  font-size: 20px;
  font-weight: 600;
  margin: 0;
  white-space: pre;
}

.modal-body_icon p:nth-child(2) {
  color: #2F4B75;
  width: 100%;
}

.modal-body_icon p:last-child {
  color: #449AD9;
  width: 100%;
  text-align: left;
}

.redes-contend img {
  width: 50px;
  height: 50px;
  border-bottom: 10px;
  object-fit: contain;
  box-shadow: rgb(0 0 0 / 15%) 0px 3px 8px 2px;
  border-radius: 8px;
}

.sway-header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
}

.sways-card {
  width: 200px;
  height: 200px;
}

.sways-card-1 {
  width: 50px;
  height: 20px;
}

.sways-card-2 {
  width: 50px;
  height: 50px;
}

.sways-card-3 {
  width: 90%;
  height: 400px;
}

.card {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card .percent {
  position: relative;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 260px
}

.card svg {
  position: relative;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.card svg circle {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: #9ED6FF;
  stroke-width: 15;
  stroke-linecap: round;
}

.card svg circle:last-of-type {
  stroke-dasharray: 660px;
  stroke-dashoffset: calc(650px - (650px * var(--percent)) / 100);
  stroke: #3498db;
}

.card .number {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.number {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.number div {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.number div h3 {
  font-weight: 700;
  font-size: 2rem;
  color: white;
}

.number p {
  font-weight: 700;
  font-size: 2rem;
  color: white;
  margin-bottom: 0px !important;
}

.card .number h3 span {
  font-size: 2rem;
}

.card .title h2 {
  margin: 25px 0 0;
}

.card:nth-child(1) svg circle:last-of-type {
  stroke: #2F4B75;
}

.card:nth-child(2) svg circle:last-of-type {
  stroke: #2F4B75;
}

.v-card {
  border-radius: 10px;
}

.section-2 {
  padding: 20px 20px;
}

.section-3 {
  padding: 0px 20px;
}

.section-2-title {
  font-size: 25px;
  font-family: roboto;
  color: #2F4B75;
  font-weight: 500;
}

.section-2-title__grafica {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 0px;
}

.section-2-title__grafica-linear {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  padding-top: 20px;
}

.section-2-title__grafica-linear-title {
  font-size: 10px;
  white-space: nowrap;
  color: white;
  padding-top: 9px;
}

.section-2-title__grafica-linear-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.section-2-title__grafica-titleRounde {
  font-size: 15px;
  text-align: center;
  font-weight: 800;
  color: #01386e;
}

.section-2-title__grafica-titleNumber {
  font-size: 15px;
  color: white;
  font-family: roboto;
  font-weight: 500;
  padding: 0 0 0 10px;
}

.group-card {
  width: 70px;
  height: 70px;
  box-shadow: none !important;
  border-width: 2px;
  border-style: solid;
  border-color: #01386e;
}

.group-title {
  color: #01386e;
  font-size: 20px;
  padding-left: 10px;
}

.v-space {
  display: flex;
  justify-content: center !important;
  contain: inline-size;
  padding-top: 50px;
}

.padre-overflow {
  height: calc(100dvh - 100px);
  padding-bottom: 80px;
  overflow: auto;
  background-color: #fff;
}

.v-title-impressions {
  color: white;
  padding-left: 20px;
  font-size: 20px;
}

.icon-size {
  top: 7.5p;
  left: 7.5px;
  height: 40px;
  width: 40px;
}

.v-col {
  justify-content: center;
  padding: 0px !important;
}

.activeBag {
  background-color: white;
}

.noActiveBag {
  background: linear-gradient(90deg,
      rgba(71, 164, 231, 1) 100%,
      rgba(47, 75, 117, 1) 100%);
}

.header {
  position: relative;
  z-index: 150;
  background: rgb(71, 164, 231);
  background: linear-gradient(90deg,
      rgba(71, 164, 231, 1) 100%,
      rgba(47, 75, 117, 1) 100%);
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
}

.v-row {
  padding-top: 15px;
  padding-left: 20px;
}

.body {
  position: relative;
  z-index: 150;
  background: white;
  width: 100%;
  height: 100%;
  top: 50px;
}

.container {
  position: relative;
  z-index: 180;
  background: linear-gradient(181deg, #020024 0%, #47a4e7 0%, #0b7294 50%, #1c80ab 80%, #00c0e7 106%);
  width: 100%;
  /*   height: 0; */
  padding: 15% 0px 0px 0px !important;
  overflow: hidden;
  /*  animation: cold 0.3s forwards; */
}

.container_in {
  overflow: hidden;
  animation: cold 0.3s forwards;
}

@keyframes cold {
  from {
    height: 0;
    opacity: 0;
  }

  to {
    height: 100dvh;
    opacity: 1;
  }
}

.container_out {
  overflow: hidden;
  animation: out_cold 0.3s forwards;
}

@keyframes out_cold {
  from {
    height: 100dvh;
  }

  to {
    height: 0;
    opacity: 0;
  }
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-buttons {
  --swiper-theme-color: white;
  --swiper-navigation-size: 44px;
  font-family: -apple-system, SF UI Text, Helvetica Neue, Helvetica, Arial,
    sans-serif;
  font-size: 14px;
  line-height: 1.4;
  -webkit-text-size-adjust: 100%;
  text-align: center;
  color: #000;
  -webkit-tap-highlight-color: transparent;
  height: 44px;
  position: relative;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
}

.modal-title {
  line-height: 1.4;
  color: #000;
  -webkit-tap-highlight-color: transparent;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  font-family: gotham_htfmedium;
  padding: 0px 0px 20px 0px;
}

.modal-text {
  --swiper-theme-color: white;
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
  font-family: din_lightregular !important;
  margin-top: 5px;
}

.cols-50 {
  --swiper-theme-color: white;
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
  font-family: din_lightregular !important;
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
  width: 50%;
}

.no-gutter {
  --swiper-theme-color: white;
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
  font-family: din_lightregular !important;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  flex-wrap: wrap;
  -webkit-box-align: start;
  align-items: flex-start;
}

.modal-button {
  --swiper-theme-color: white;
  --swiper-navigation-size: 44px;
  -webkit-tap-highlight-color: transparent;
  width: 100%;
  padding: 0 5px;
  height: 44px;
  font-size: 17px;
  line-height: 44px;
  text-align: center;
  color: #007aff;
  display: block;
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  background: rgba(255, 255, 255, 0.95);
  font-family: gotham_htfmedium !important;
  font-weight: 500;
  border-radius: 0 0 13px 13px;
}

.modal-inner {
  --swiper-theme-color: white;
  font-family: -apple-system, SF UI Text, Helvetica Neue, Helvetica, Arial,
    sans-serif;
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
  border-radius: 13px 13px 0 0;
  position: relative;
  background: rgba(255, 255, 255, 0.95);
}

.button-close {
  margin-left: 20px;
  display: block;
  position: fixed;
  bottom: 2%;
  z-index: 200;
}
</style>
