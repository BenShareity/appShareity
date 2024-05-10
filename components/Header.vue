<template>
  <v-app-bar fixed elevation="0" style="z-index: 200" color="transparent" class="control-css-header">
    <div align="center" class="containerBackground">
      <div style="position: relative; z-index: 200">
        <img v-if="getHeaderType == 1" style=" padding-right: 10px; object-fit: contain; width: 35px; height: 35px; "
          @click="openShareityChannel()" :src="imgLogo"></img>
        <div v-else @click="changeHeader()" style="padding-bottom: 8px;">
          <v-icon size="25px" dark> mdi-close </v-icon>
        </div>
      </div>
      <div v-if="userData" class=" custom-sway-point button-effect" @click="openModalGrafits()"
        style="cursor: pointer">
        <div v-show="userData" class="shell">
          <div class="text-caption">
            <p>Sway Level</p>
            <p>{{ power?.value }}</p>
          </div>
          <div v-if="power" class="bar" :style="{ width: power?.value + '%' }"></div>
        </div>
      </div>
      <div v-if="!userData" class="text-center" style="position: relative; z-index: 200">
        <div>
          <img style="width: 70%; height: fit-content; object-fit: contain;" :src="imgLetter" alt="">
        </div>

      </div>
      <div class="text-center" style="position: relative; z-index: 200">
        <!--  <v-icon v-show="userData" class="mx-auto button-effect" large @click="ver">
          mdi-account-circle-outline
        </v-icon> -->
        <img style=" object-fit: contain; width: 35px; height: 35px; " v-show="userData" class="" @click="ver"
          :src="imgNoLogin" />
        <!--   <v-icon v-show="!userData" class="mr-3 button-effect" large @click="openModalLogin()">mdi-login-variant</v-icon> -->
        <img style=" object-fit: contain; width: 35px; height: 35px; " v-show="!userData" class=""
          @click="openModalLogin()" :src="imgLogin" />
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data: () => ({
    value: 20,
    power: null,
    imgLogo: require("~/assets/img/png/logo2.png"),
    imgLogin: require("~/assets/img/png/account-login.png"),
    imgNoLogin: require("~/assets/img/png/account-no-login.png"),
    imgLetter: require("~/assets/img/svg/letter-shareity.svg"),
    /*  imgLogo: require("~/assets/img/png/icon_shareity_channel.png") */
  }),
  methods: {
    ...mapActions("login", ["openCloseLogin"]),
    ...mapActions("user", ["userDataAction", "nicknameAction"]),
    ...mapActions("header", ["changeHeaderType"]),
    openShareityChannel() {
      this.$router.push({ path: "/channel" });
    },
    openModalGrafits() {
      this.$router.push({ path: "/swayscores/total", query: { first: true } });
    },
    openModalLogin() {

      this.$nuxt.$emit("openLogin", [true]);
    },
    changeHeader() {
      this.changeHeaderType(1);
    },
    ver() {
      this.$router.push(`/profile/${this.userData.username}`)
    }
  },
  computed: {
    ...mapState("phoneSize", ["windowLeftT", "windowWidthT"]),
    ...mapGetters("login", ["$cookies.get('username')"]),
    ...mapState("user", ["userData"]),
    ...mapGetters("header", ["getHeaderType"]),
  },
  created() {
    this.nicknameAction().then((user) => {
      this.$axios.$get("/user/sway-score/" + user.id)
        .then((res) => {
          console.log('res', res)
          this.power = res
          localStorage.setItem("points", JSON.stringify({ level: res.level, value: res.value }));
        })
    })
  }
};
</script>

<style lang="scss" scoped>
.button-effect {
  cursor: pointer !important;
  outline: none;
  color: #fff;
  border: none;
  border-radius: 15px;
  transition: all 0.5s ease-out;
}

.button-effect:active {
  transform: translateY(10px);
  color: rgba(0, 0, 0, 0.295);
}

.custom-sway-point {
  width: 100%;
  padding-right: 8px;
}

.shell {
  height: 26px;
  width: 100%;
  box-shadow: 0px 0px 8px -5px #4f4f4f;
  border-radius: 4px;
  background: #fff;
  position: relative;
  margin-bottom: 7px;
}

.control-css-header {
  width: 400px;
  margin: 0 auto;
}

.bar {
  background: linear-gradient(to right, #0A84E8, #13c6de);
  height: 26px;
  width: 15px;
  position: absolute;
  top: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.bar span {
  float: right;
  color: #fff;
  font-size: 0.7em;
}

.text-caption {
  color: #4D4D4D;
  font-weight: 700;
  display: flex;
  justify-content: center;
  gap: 6px;
  width: 100%;
  height: 100%;
}

.text-caption p {
  margin-top: 3px !important;
}

.containerBackground {
  height: 100%;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  gap: 10px;
  /*   background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgb(0 0 0 / 24%) 70%); */
}

.bg {
  background: linear-gradient(90deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(196, 196, 196, 1) 100%);
}

@media (max-width: 640px) {
  .control-css-header {
    width: 100%;
  }
}
</style>
