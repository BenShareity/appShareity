<template>
  <v-row justify="center">
    <v-dialog v-model="show" hide-overlay transition="dialog-bottom-transition" content-class='modal-termins'>
      <v-card>
        <v-toolbar dark color="#33a9f2" height="80">
          <v-btn icon dark @click="show = false">
            <v-icon size="30"> mdi-arrow-left-circle </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <div class="container_IMG">
              <img class="T_img" :src="image" />
            </div>
          </v-toolbar-items>
        </v-toolbar>

        <div class="center">
          <div class="content">
            <img src="@/assets/img/coin-pivotal.gif" width="150px">
            <h2>
              Take credit for your challenge as Shareity creates your very own
              Totally Shareable Token (TST) - track your impact and help raise
              more money/awareness by sharing it!
            </h2>
            <v-btn style="color: white; border-radius: 8px !important;     font-size: 0.875rem; font-weight: 600;"
              class="rounded-lg py-4 mt-6 mb-6 text-capitalize" color="#33a9f2" @click="$nuxt.$emit('UseTerms2', true)">
              TERM OF USE
            </v-btn>
            <v-icon color="#33a9f2" @click="$nuxt.$emit('UseTermsVideo', true)" x-large> mdi-play-circle </v-icon>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
const imgLink = require("@/assets/img/png/footer/icoLogo.png");
import { mapState } from "vuex";
export default {
  data() {
    return {
      show: false,
      image: imgLink,
    };
  },
  created() {
    this.$nuxt.$on("UseTerms1", (option) => {
      this.show = option;
    });
  },
  methods: {
    toListenWidth() {
      return window.innerWidth
    },
  },
  computed: {
    ...mapState("phoneSize", ["windowWidthT"]),
  },
};
</script>
<style>
.modal-termins {
  width: 400px !important;
}
@media(max-width:600px) {
  .modal-termins {
    width: 100% !important;
    margin: 0px !important;
  }
}
</style>
<style scoped>
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  text-align: center;
  padding: 5px 20px;

}



.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 80px;
  gap: 20px;
}

.container_IMG {
  display: flex;
  justify-content: center;
  align-items: center;
}

.theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: #33a9f2 !important;
  opacity: 0.5 !important;
  font-size: 12pt;
  color: white !important;
}

.v-application .primary {
  background-color: #33a9f2 !important;
  opacity: 1 !important;
  font-size: 12pt;
  color: white !important;
}

.T_img {
  width: 36px;
  height: 41px;
}


</style>