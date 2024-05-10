<template>
  <v-container :style="{ width: windowWidthT + 'px' }" class="containerFather">
      <v-card>
        <v-toolbar dark class="header_" color="primary" height="80">
          <v-btn icon dark to="/profile">
            <v-icon size="30"> mdi-arrow-left-circle </v-icon>
          </v-btn>
          <v-toolbar-title class="v-toolbar__title_Edit"
            >Shareity</v-toolbar-title
          >
          <v-spacer></v-spacer>
        </v-toolbar>

        <div class="div_2">
          <div class="div_0">
            <span class="p-titleCss"
              >CREATE YOUR WALLET</span
            >
            <div class="b-LgoinCss">
              <v-btn
                style="width: 50%; background-color: #1976d2; color: white"
                depressed
                @click="$router.push('/wallet/create')"
              >
                Create Wallet
              </v-btn>
            </div>
            <div class="container_IMG_">
              <img class="T_img_" :src="img" />
            </div>
          </div>
        </div>
      </v-card>
</v-container>

</template>


<script>
const imgVista = require("../../assets/img/png/footer/vista1.png");
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      img: imgVista,
    };
  },

  created() {},
  computed: {
    ...mapState("phoneSize", ["windowWidthT"]),
  },
  methods: {
    toListenWidth() {
      return window.innerWidth
    }
  }
};
</script>

<style scoped>
.div_2 {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.div_0 {
  display: flex;
  margin-top: -97px;
  padding: 21px;
  padding-top: 206px;
  flex-direction: column;
  align-items: center;
}
.p-titleCss {
  font-size: 27px;
  font-weight: 500;
  text-align: center;
  font-family: "poppinsbold";
  width: 70%;
}
.p-titleCss-1 {
  font-size: 20px;
  font-weight: 800;
  text-align: center;
  padding-top: 20px;
  font-family: "poppinsregular";
}
.b-LgoinCss {
  width: 100%;
  justify-content: center;
  display: flex;
  padding-top: 60px;
  padding-bottom: 50px;
  font-family: "poppinsbold";
}

.header_ {
  background: #1976d2 !important;
}
/* .v-toolbar__content {
  height: 76px !important;
} */
.v-toolbar__title_Edit {
  font-size: 1.6rem !important;
  letter-spacing: 1px !important;
  font-family: "poppinsbold";
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