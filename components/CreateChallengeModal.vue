<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet" persistent :width="windowWidthT + 10" :content-class="`${toListenWidth > 1264 && toListenWidth < 1904 ? 'margin_desptop' : ''
    }`">
      <v-sheet class="text-center" style="background: azure" height="100vh">
        <v-row class="c-enterCreate">
          <span class="text_create_challenge"> Create your challenge! </span>

          <v-col cols="12" class="center-justy_btn">
            <div>
              <input ref="fileInput" style="display: none" type="file" @change="onFileSelect" accept="image/*" />
              <v-btn width="60" height="60" type="file" @click="$refs.fileInput.click()" class="mx-2" fab dark
                color="#12a8e0 ">
                <v-icon size="30" dark> mdi-camera </v-icon>
              </v-btn>
            </div>

            <div>
              <input ref="fileVideo" style="display: none" type="file" @change="onFileSelect" accept="video/*" />
              <v-btn width="60" height="60" class="mx-2" @click="$refs.fileVideo.click()" fab dark large
                color="#12a8e0 ">
                <v-icon size="30" dark> mdi-video </v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12">
            <v-img class="mx-auto" width=" 50px " :src="require('~/assets/img/png/icon_shareity_channel.png')"></v-img>
          </v-col>
          <v-col cols="12">
            <v-img class="mx-auto" width="300px " :src="require('~/assets/img/png/steve-create_challenge.png')"></v-img>
          </v-col>
          <v-col cols="12" class="c-enter-global">
            <v-btn class="mx-2" fab dark color="#33a9f2b3" @click="sheet = !sheet">
              <v-icon dark> mdi-arrow-left </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
/* import Loading from "./Loading.vue"; */
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      sheet: false,
      selectFiles: "",
      img: "",
      loading: false,
      file: ""

    };
  },
  computed: {
    ...mapState("phoneSize", ["windowLeftT", "windowWidthT"]),
  },

  methods: {
    ...mapActions("createUserChallenge", ["createUserChallengeAction"]),
    toListenWidth(){
      return window.innerWidth
    },
    onFileSelect(e) {
      const file = e.target.files[0];
      this.img = URL.createObjectURL(file);
      this.$nuxt.$emit("openLoading", true);
      setTimeout(function () {
        this.$nuxt.$emit("openModalCreateChanllenge", false);
        this.$nuxt.$emit("openLoading", false);
      }, 8000);
      this.$nuxt.$emit("CreatingModalChallenge", [true, this.img, file]);
    },
  },
  created() {
    this.$nuxt.$on("openModalCreateChanllenge", (option) => {
      this.sheet = option;
    });
  },
};
</script>

<style>
.c-enterCreate {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.input-file-opcati {
  position: absolute;
  width: 81px;
  height: 66px;
  z-index: 55;
  opacity: 0;
}

.center-justy_btn {
  display: flex;
  justify-content: space-around;
}

.c-enter-global {
  display: flex;
  justify-content: left;
}

.text_create_challenge {
  font-size: 1.75rem;
  font-weight: inherit;
  letter-spacing: 3px;
  color: #00000096;
}
</style>