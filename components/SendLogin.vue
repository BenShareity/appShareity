<template>
  <v-row justify="center">
    <v-dialog v-model="show" hide-overlay transition="dialog-bottom-transition" :width="windowWidthT + 10"
      :content-class="`${toListenWidth > 1264 && toListenWidth < 1904 ? 'margin_desptop' : ''
      }`">
      <v-card>
        <v-toolbar dark class="header_" color="primary" height="80">
          <v-btn icon dark @click="show = false">
            <v-icon size="30"> mdi-arrow-left-circle </v-icon>
          </v-btn>
          <v-toolbar-title class="v-toolbar__title_Edit">Shareity</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">
              <v-icon> mdi-hand-back-left </v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <div class="div_2">
          <div class="div_0">
            <span class="p-titleCss">YOU HAVE NOT COMPLETED ANY CHALLENGES YET,</span>
            <span class="p-titleCss-1">Find one you want to do <br />
              and Snap To Unlock</span>
            <div class="b-LgoinCss">
              <v-btn style="width: 50%" @click="openLogin()" depressed color="primary">
                Sign In
              </v-btn>
            </div>
            <div class="container_IMG_">
              <img class="T_img_" :src="img" />
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
const imgVista = require("../assets/img/png/footer/vista1.png");
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      show: false,
      img: imgVista,
    };
  },

  methods: {
    ...mapActions("login", ["openModalSendLogin"]),
    toListenWidth(){
      return window.innerWidth
    },
    openLogin() {
      this.show =false
      this.openModalSendLogin(false)
    }
  },



  created() {
    this.$nuxt.$on("openModalSendLogin", (option) => {
      this.show = option;
    });
  },
  computed: {
    ...mapState("phoneSize", ["windowWidthT"]),
    ...mapState("login", ["shownModalSendLogin"]),
  },
};
</script>

<style>
.div_2 {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.div_0 {
  display: grid;
  margin-top: -97px;
  padding: 21px;
  padding-top: 206px;
}

.p-titleCss {
  font-size: 27px;
  font-weight: 800;
  text-align: center;
}

.p-titleCss-1 {
  font-size: 20px;
  font-weight: 800;
  text-align: center;
  padding-top: 20px;
}

.b-LgoinCss {
  width: 100%;
  justify-content: center;
  display: flex;
  padding-top: 60px;
  padding-bottom: 50px;
}

.header_ {
  background: chartreuse !important;
}

/* .v-toolbar__content {
  height: 76px !important;
} */
.v-toolbar__title_Edit {
  font-size: 1.8rem !important;
  letter-spacing: 4px !important;
}

.container_IMG_ {
  display: flex;
  justify-content: center;
  align-items: center;
}

.T_img_ {
  width: 170px;
  height: 131px;
}
</style>