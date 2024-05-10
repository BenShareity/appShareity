<template>
  <!-- <v-img class="img__spalsh" v-if="ready" :src="url_splash"></v-img> -->
  <div class="container-spinner">
    <div class="loading-spinner">
      <div class="contend-logo">
        <img :src="logo" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: (vm) => ({
    ready: false,
    url_splash: require("~/assets/img/jpg/splash_screen_unique.jpg"),
    logo: require("~/assets/img/svg/sway/logo1.svg"),
  }),
  components: {},
  methods: {
    loadSplashScreen() {
      let vm = this,
        params = {
          action: "init_open_app",
        };
      /*axios["post"](
        process.env.api_url + "apps",
        params,
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      )*/
      this.$axios
        .$post("apps")
        .then((response) => {
          vm.url_splash =
            process.env.api_assets_url +
            response.data.data.splashScreenInitData.Recourse;
          vm.ready = true;
          setTimeout(() => {
            vm.$emit("showSplash", false);
          }, 2000);
        })
        .catch((error) => {
          vm.ready = true;
          setTimeout(() => {
            vm.$emit("showSplash", false);
          }, 2000);
        });
    },
  },
  created() {
    let vm = this;
    let mode = this.checkDataUrl();
    vm.loadSplashScreen(mode);
  },
};
</script>

<style lang="scss" scoped>
.v-image {
  z-index: 999999999 !important;
}

.img__spalsh {
  height: 100vh !important;
}

.container-spinner {
  position: fixed;
  background: #f3f4f6;
  z-index: 500;
  width: 400px;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  transform: translate(-50%, -50%) translateZ(0);
  animation: spinning-c7ca3834 1.5s infinite ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-spinner img {
  width: 100%;
  height: auto;
  object-fit: cover;
  padding-top: 45px;
}

.contend-logo {
  width: 70px;
  height: 200px;
  position: absolute;
}

.loading-spinner:after {
  content: "";
  position: absolute;
  width: 220px;
  height: 220px;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 100%;
  margin: -15px;
  box-shadow: 0 4px 0 0 #009dff;
  transition: all 1s linear;
  animation: lds-eclipse 1s linear infinite;
}

@keyframes spinning {
  0% {
    transform: translate(-50%, -50%) scale(1) translateZ(0);
  }

  50% {
    transform: translate(-50%, -50%) scale(1.1) translateZ(0);
  }

  100% {
    transform: translate(-50%, -50%) scale(1) translateZ(0);
  }
}

@keyframes lds-eclipse {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@media (max-width: 680px) {
  .container-spinner {
    width: 100%;
  }
}
</style>
