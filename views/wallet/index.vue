<template>
  <v-container :style="{ width: windowWidthT + 'px' }" class="containerFather" v-if="id && getUserData.wallet">
    <v-row class="container-profilee" style="height: 52px">
      <v-btn icon x-large @click="$router.go(-1)">
        <v-icon size="50" color="black" style="position: absolute">
          mdi-chevron-left
        </v-icon>
      </v-btn>
      <v-col cols="9" xs="2"></v-col>
      <div align="center" justify="center" class="fonttype">
        Wallet
      </div>
      </v-col>
    </v-row>
    <v-row class="container-profilee linea">
      <v-col class="d-flex justify-center">
        <div class="container-profile-phot">
          <v-avatar size="95" class="avatar-profile">
            <v-img class="mx-auto"
              :src="!userData.imagen ? require('~/assets/img/png/profile/user_profile_blue.png') : urlBucket + userData.imagen"
              type="file">
            </v-img>
          </v-avatar>
        </div>
      </v-col>
    </v-row>
    <v-row class="container-profilee linea">
      <v-col class="fonttype contact" align="left" cols="12"><span>Wallet info</span>
      </v-col>
      <div style="width:100%">
        <v-col class="d-flex" width="100%">
          <v-text-field outlined dense label="Direction" :value="direction" class="ml-5 mr-2" ref="direction"
            v-on:focus="$event.target.select()" readonly></v-text-field>
          <elements-buttons-buttonsprofile @click="copy(1), (sheet = !sheet)" text="Copy" class="mt-2" />
        </v-col>
      </div>
      <div style="width:100%">
        <v-col class="d-flex" width="100%">
          <v-text-field outlined dense label="Key" :value="key" class="ml-5 mr-2" ref="key"
            v-on:focus="$event.target.select()" readonly></v-text-field>
          <elements-buttons-buttonsprofile @click="copy(2), (sheet = !sheet)" text="Copy" class="mt-2" />
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  layout(context) {
    return "Modal";
  },
  data: (vm) => ({
    direction: "https://my.shareity.com/1",
    key: "https://my.shareity.com/2",
    userData: "",
    id: ""
  }),
  computed: {
    ...mapState("phoneSize", ["windowWidthT", "windowLeftT"]),
    ...mapGetters("user", ["getUserData"]),
    urlBucket() {
      return process.env.api_assets_url;
    },
  },

  methods: {
    ...mapActions("user", ["userDataAction"]),
    copy(inputCopy) {
      if (inputCopy === 1) {
        this.$refs.direction.focus();
        document.execCommand('copy');
      } else {
        this.$refs.key.focus();
        document.execCommand('copy');
      }
    },
  },
  created() {
    if (process.client) {
      this.userDataAction(localStorage.getItem('username'))
        .then(() => {
          if (!this.getUserData.wallet) {
            this.$router.push('/wallet/havenot')
          }
          this.userData = this.getUserData
        })
      this.id = localStorage.getItem('username')
    }
  },
};
</script>
<style lang="scss" scoped>
.containerFather {
  background: rgb(41, 46, 50);
  background: linear-gradient(180deg,
      rgba(41, 46, 50, 0) 50%,
      rgba(154, 154, 154, 0.404) 100%) !important;
  height: 100vh;
}

.container {
  padding: 0 !important;
}

.v-input__control {
  color: rgb(0, 0, 0) !important;
  caret-color: rgb(2, 0, 0) !important;
}

.v-text-field--outlined>>>fieldset {
  border-color: black;
}

.v-label--active>>>fieldset {
  border-color: black !important;
}

.v-label>>>fieldset {
  border-color: black !important;
}

.v-label--active {
  border-color: black !important;
}

.v-label {
  border-color: black !important;
}

.contact {
  margin-left: 10px;
  padding-bottom: 0;
  margin-top: 10px;
}

.profileur {
  margin-top: 10px;
}

.formtextatex {
  border-bottom: 2px solid #b5b6b757 !important;
  width: 100%;
  height: 80px;
  color: black !important;
}

.treepoint {
  padding-left: 0 !important;
  margin-right: -7px;
}

.col-3 {
  flex: 0 0 25%;
  max-width: 25%;
  line-height: 31px;
  padding: 8px;
  text-align: left;
  padding-left: 23px;
  padding-right: 0;
}

.fonttype {
  font-family: "gotham_htfmedium" !important;
  color: black;
  font-size: 14px;
  font-weight: bold;
}

.data-for {
  border: none;
  color: white;
  font-size: 15px;
  width: 100%;
  background-color: transparent;
  outline: none;
}

.data-option {
  border-bottom: 2px solid #b5b6b757 !important;
  width: 95%;
  height: 30px;
  color: black !important;
}

.container-profilee {
  text-align: center;
  margin: auto;
  background: linear-gradient(90deg,
      rgba(41, 46, 50, 0) 49%,
      rgba(255, 255, 255, 0.40379901960784315) 100%) !important;
  display: flex;
  align-items: center;
}

.btn-saveprofile {
  text-align: left;
  margin: 0px 0px 0px;
}

.btn-copy {
  margin-left: -17px;
  margin-top: 12px;
}

.avatar-profile {
  border: 2px solid gray;
  margin-bottom: 5px;
}

.container-profile-phot {
  margin-bottom: 9px;
  margin-top: 9px;
}

.linea {
  border-top: 1px solid lightgray;
  width: 100%;
}

.fondo {
  background-color: #04355f;
}

.typefontt {
  font-family: "Lemon/Milk";
  font-size: 0.93em;
  color: white !important;
  text-align: justify;
  padding-top: 31px;
  margin-left: -39px;
}

.steven {
  width: 35%;
  padding-left: 79px;
  padding-block: revert;
}
</style>
