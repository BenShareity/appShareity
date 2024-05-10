<template>
  <v-dialog
    v-model="dialog"
    hide-overlay
    transition="dialog-bottom-transition"
    :width="windowWidthT"
    :content-class="` 'scrollNoneEdit' ${
      toListenWidth > 1264 && toListenWidth < 1904 ? 'margin_desptop' : ''
    }`"
  >
    <v-card style="background: #f0ffff">
      <v-toolbar height="50" class="header_editToolbar" color="#afafaf87">
        <v-toolbar-title class="edit_title-tooblar"
          >Design Your Badge</v-toolbar-title
        >
        <v-spacer></v-spacer>
      </v-toolbar>
      <div class="edit_content_COLORS">
        <div class="c_e_">
          <v-col cols="6" class="c_e_">
            <v-card
              :style="{ background: `${this.colorBackground}` }"
              class="mx-auto"
              max-width="344"
            >
              <v-card-text class="box_cardEdit" style="padding: 50px">
                <div
                  class="edit_title_cardBack"
                  :style="{ color: `${this.colorText}` }"
                >
                  {{ title }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </div>
        <div class="text-center c_e_between">
          <v-menu
            :close-on-content-click="closeOnClick"
            bottom
            origin="center center"
            transition="scale-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn :color="colorText" v-bind="attrs" v-on="on"> Text </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-color-picker
                  dot-size="22"
                  show-swatches
                  swatches-max-height="100"
                  v-model="colorText"
                ></v-color-picker>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-menu
            :close-on-content-click="closeOnClick"
            transition="scale-transition"
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn :color="colorBackground" dark v-bind="attrs" v-on="on">
                Background
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-color-picker
                  dot-size="22"
                  hide-mode-switch
                  show-swatches
                  swatches-max-height="100"
                  v-model="colorBackground"
                ></v-color-picker>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="c_e_left">
          <v-icon @click="backDialog()" size="50">
            mdi-arrow-left-circle
          </v-icon>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>


<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      closeOnClick: false,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      colorText: "",
      colorBackground: "",
      show: false,
      title: "",
    };
  },

  methods: {
    toListenWidth() {
      return window.innerWidth
    },
    backDialog() {
      this.$emit("textColor", this.colorText);
      this.$emit("backgroundColor", this.colorBackground);
      this.dialog = false;
    },
  },

  created() {
    this.$nuxt.$on("openModalColor", (option) => {
      this.dialog = option[0];
      this.title = option[1];
    });
  },
  computed: {
    ...mapState("phoneSize", ["windowWidthT"]),
  },
};
</script>

<style>
.edit_title_cardBack {
  font-weight: 700;
  font-size: xx-large;
  line-height: normal;
}

.edit_content_COLORS {
  width: 100%;
  height: 100vh;

  display: grid;
}

.header_editToolbar {
  display: flex;
  justify-content: center;
}

.edit_title-tooblar {
  color: white;
  font-size: x-large;
  font-weight: normal;
}

.c_e_ {
  display: flex;
  align-items: center;
  justify-content: center;
}
.c_e_left {
  display: flex;
  padding: 20px;
  justify-content: left;
}

.c_e_between {
  display: flex;
  justify-content: space-evenly;
}
.scrollNoneEdit {
  overflow-y: hidden !important;
}
/* .v-dialog--fullscreen {
  overflow-y: hidden !important;
} */
</style>