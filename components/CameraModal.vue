<template>
  <div class="text-center">
    <v-bottom-sheet
      persistent
      inset
      v-model="show"
      width="404"
      :content-class="`${
        toListenWidth > 1264 && toListenWidth < 1904 ? 'margin_desptop' : ''
      }`"
    >
      <v-sheet class="text-center" height="180px">
        <v-toolbar dark color="#33A9F2" height="50">
          <div class="icontent-sherity">
            <v-icon
              size="35"
              class="ico_closet"
              @click="(show = !show), scrollState()"
            >
              mdi-arrow-left-circle
            </v-icon>
            <v-toolbar-title class="toolbar-img-shareity">
              <v-img
                max-height="50"
                max-width="150"
                :src="require('~/assets/img/png/login/shareity_white.png')"
              ></v-img>
            </v-toolbar-title>
          </div>

          <v-spacer></v-spacer>
        </v-toolbar>

        <div class="center_steve" style="background: azure">
          <v-btn
            height="35"
            color="#33A9F2"
            elevation="3"
            small
            style="color: white"
            @click="changeContentView(3), (show = false), scrollState()"
            >Search <br />
            Challenges
          </v-btn>

          <div>
            <v-img
              class="mx-auto"
              width="135px"
              :src="require('~/assets/img/png/steve_camera.png')"
            ></v-img>
          </div>

          <!-- <v-btn
            height="35"
            @click="createChallenge()"
            color="#33A9F2"
            style="color: white"
            elevation="3"
            small
          >
            Create <br />
            Challenge
          </v-btn> -->
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      show: false,
    };
  },
  computed: {
    ...mapState("phoneSize", ["windowWidthT"]),
  },
  methods: {
    ...mapActions("content", ["changeContentView"]),
    scrollState() {
      this.$nuxt.$emit("scrollState", "scroll");
    },
    toListenWidth() {
      return window.innerWidth;
    },
    createChallenge() {
      this.$nuxt.$emit("openModalCreateChanllenge", true);
      this.$nuxt.$emit("openModalCamera", false);
    },
  },
  created() {
    this.$nuxt.$off("openModalCamera");
    this.$nuxt.$on("openModalCamera", (option) => {
      // if(!process.client){
      this.show = option;
      // }
    });
  },
};
</script>

<style>
.div_button_closset {
  width: 100%;
  height: 20%;
  text-align: initial;
  display: flex;
  justify-content: stretch;
}

.ico_closet {
  padding: 20px;
}

.center_steve {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.icontent-sherity {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
}

.toolbar-img-shareity {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-size-sherity {
  display: flex;
  align-items: center;
  width: 200px;
}
</style>
