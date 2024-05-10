<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      hide-overlay
      transition="dialog-bottom-transition"
      content-class='modal-termins'
    >
      <v-card>
        <v-toolbar dark color="#33a9f2" height="80">
          <v-btn icon dark @click="show = false; pauseVideo()">
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
            
            <iframe
              v-if="show"
              width="125%"
              height="315"
              src="https://www.youtube.com/embed/3hOyYPZTmTI"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              id="iframe"
            ></iframe>
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
    this.$nuxt.$on("UseTermsVideo", (option) => {
      this.show = option;
    });

  },
  methods: {
    toListenWidth(){
      return window.innerWidth
    },
    pauseVideo(){
      let iframe = document.getElementById('iframe')
    }
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
    height: 100%;
    overflow: hidden;
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
  padding: 10px 20px;
  background: black;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.container_IMG {
  display: flex;
  justify-content: center;
  align-items: center;
}
.T_img {
  width: 36px;
  height: 41px;
}
</style>