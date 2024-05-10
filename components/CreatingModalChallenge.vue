<template>
  <div>
    <v-dialog v-model="dialog" hide-overlay transition="dialog-bottom-transition" :width="windowWidthT + 10"
      style="height: 100vh" :content-class="`${toListenWidth > 1264 && toListenWidth < 1904 ? 'margin_desptop' : ''
      }`">
      <v-card style="height: 100vh">
        <v-toolbar height="50" dark color="primary">
          <v-btn icon dark @click="openAlert()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Create Challenge</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div>
          <v-alert :value="alert" color="#f0ffff" border="top" transition="scale-transition">
            <div class="question_edit">
              <span class="edit_text-alert">
                Are you sure do you want to cancel your challenge ?
              </span>
            </div>

            <div class="e-thow-button mb-4">
              <v-btn color="primary" @click="closetModal()"> Yes </v-btn>
              <v-btn color="error" @click="alert = !alert"> No </v-btn>
            </div>
          </v-alert>
        </div>

        <v-divider></v-divider>

        <!-- PASO 1 ------------------->
        <v-stepper class="noShadow" v-model="e1">
          <v-stepper-items class="h-100">
            <v-stepper-content class="azure_BackColor" step="1">
              <div class="grillla__">
                <v-img contain max-height="200" max-width="500" :src="this.url"></v-img>

                <v-col cols="12">
                  <v-form v-model="valid" ref="form">
                    <v-text-field label="Title Challenge" v-model="title" :rules="inputRules" required solo>
                    </v-text-field>
                  </v-form>
                </v-col>
                <v-col cols="12" style="margin-top: 50px">
                  <div class="button_divive">
                    <v-btn width="50" height="50" class="mx-2" fab dark large color="#686868" @click="next()">
                      <v-icon dark> mdi-arrow-right-circle </v-icon>
                    </v-btn>
                  </div>
                </v-col>
              </div>
            </v-stepper-content>
            <!-- PASO 2 ------------------------------------------>
            <v-stepper-content class="azure_BackColor" step="2">
              <div class="title_c-enter">
                <span style="padding-botton: 5px">Title Challenge:<span class="title_col-or">
                    {{ title }}
                  </span>
                </span>
              </div>
              <v-img contain max-height="200" max-width="500" :src="this.url"></v-img>
              <v-col cols="12">
                <v-textarea height="50px" outlined v-model="descriptions" :rules="rulesDescriptions" shaped
                  name="input-7-4" label="Chanllenge Description"></v-textarea>
              </v-col>
              <v-col cols="12" style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                ">
                <v-card @click="openModalColor()" :style="{ background: `${this.backgroundColor}` }" class="mx-auto"
                  max-width="344">
                  <v-card-text class="box_cardEdit" style="padding: 50px">
                    <div class="edit_title_cardBack" :style="{ color: `${this.titleColor}` }">
                      {{ title }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12">
                <div class="button_divive_two">
                  <v-btn width="50" height="50" class="mx-2" fab dark large color="#686868" @click="e1 = 1">
                    <v-icon dark> mdi-arrow-left-circle </v-icon>
                  </v-btn>

                  <v-btn width="50" height="50" class="mx-2" fab dark large color="#686868" @click="next2()">
                    <v-icon dark> mdi-arrow-right-circle </v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-stepper-content>
            <!-- PASOOOO 3-------------------------------------------------- -->
            <v-stepper-content class="azure_BackColor" step="3">
              <div class="g-ridCenter">
                <v-col cols="12 c-global ">
                  <div>
                    <div class="img-Cuase">
                      <v-img width="30px" :src="
                        require('~/assets/img/png/icon_shareity_channel.png')
                      "></v-img>
                    </div>
                    <div>
                      <span class="css_cause"> Link a cause </span>
                    </div>
                  </div>
                </v-col>

                <v-col cols="12">
                  <div class="c-global">
                    <v-autocomplete chips clearable solo solo-inverted label="Search " :items="valueSearch"
                      item-text="email" item-value="id" id="search">
                    </v-autocomplete>
                  </div>
                </v-col>

                <v-col cols="12">
                  <div class="button_divive_two">
                    <v-btn width="90" height="30" color="primary" @click="skip()">
                      Skip
                    </v-btn>

                    <v-btn width="92" height="30" color="primary" @click="sendChalleng()">
                      Create
                    </v-btn>
                  </div>
                </v-col>
                <v-col cols="12 c-global ">
                  <div>
                    <div>
                      <v-img width="230px" :src="
                        require('~/assets/img/png/steve-select-cause.png')
                      "></v-img>
                    </div>
                    <div></div>
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="button_divive_two">
                    <v-btn width="50" height="50" class="mx-2" fab dark large color="#686868" @click="e1 = 2">
                      <v-icon dark> mdi-arrow-left-circle </v-icon>
                    </v-btn>
                  </div>
                </v-col>
              </div>
            </v-stepper-content>
          </v-stepper-items>
          <v-alert :value="alertValidate" color="white" border="top" transition="scale-transition"
            class="alert-edit-position" style="
              border: none !important;
              background-color: #b30e0e00 !important;
            ">
            <div class="editShadow">
              <div class="button_closet-alert">
                <v-btn width="10px" height="27" min-width="5" color="error" @click="alertValidate = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
              <div class="center-alert_png">
                <div>
                  <v-img class="mx-auto" width=" 50px " :src="require('~/assets/img/png/steve_buy_usd.png')"></v-img>
                </div>
                <div class="question_edit_2">
                  <span class="edit_text-alert">
                    Enter the challenge
                    {{ this.titleAlert ? "Title" : "" }}
                    {{ this.descriptionAlert ? "description" : "" }}
                  </span>
                </div>
              </div>
            </div>
          </v-alert>
        </v-stepper>
      </v-card>
      <ModalColor @textColor="titleColor = $event" @backgroundColor="backgroundColor = $event" />
    </v-dialog>
    <LoadingChallenge :active="active" />
  </div>
</template>

<script>
import ModalColor from "./ModalColor.vue";
import axios from "axios";
import { mapState, mapGetters, mapActions } from "vuex";
import LoadingChallenge from "@/components/LoadingChallenge.vue";
export default {
  components: {
    ModalColor,
    LoadingChallenge,
  },
  data() {
    return {
      e1: 1,
      dialog: false,
      url: "",
      alert: false,
      alertValidate: false,
      title: "",
      titleAlert: false,
      descriptionAlert: false,
      descriptions: "",
      valid: true,
      titleColor: "",
      backgroundColor: "",
      inputRules: [(v) => !!v || "Debes Ingresar un titulo"],
      rulesDescriptions: [(v) => !!v || "Debes Agregar Una descriptions"],
      search: null,
      valueSearch: [],
      file: "",
      active: false,
    };
  },

  watch: {
    title: function (value) {
      if (value !== "") {
        this.alertValidate = false;
        this.titleAlert = false;
      }
    },
    descriptions: function (value) {
      if (value !== "") {
        this.alertValidate = false;
        this.descriptionAlert = false;
      }
    },
  },
  computed: {
    ...mapState("phoneSize", ["windowWidthT"]),
  },

  methods: {
    ...mapActions("login", ["openModalSendLogin"]),
    toListenWidth(){
      return window.innerWidth
    },
    sendChalleng() {
     

      if (localStorage.getItem("username")) {
      } else {
        this.$nuxt.$emit("openModalSendLogin", true);
        this.dialog = false;
      }
    },
    openModalColor() {
      /*  this.modalColor = true */
      this.$nuxt.$emit("openModalColor", [true, this.title]);
    },

    openAlert() {
      this.alert = true;
    },
    closetModal() {
      this.dialog = false;
      this.alert = false;
      this.e1 = 1;
      this.url = "";
      (this.titleColor = ""), (this.backgroundColor = ""), (this.title = "");
      this.search = null;
    },

    next(e) {
      if (this.title === "") {
        this.inputRules;
        this.alertValidate = true;
        this.titleAlert = true;
      } else {
        /*  this.alertValidate = false; */
        this.e1 = 2;
      }
    },
    next2(e) {
      if (this.descriptions === "") {
        this.inputRules;
        this.alertValidate = true;
        this.descriptionAlert = true;
      } else {
        this.e1 = 3;
      }
    },

    back() {
      this.e1 = 1;
    },
    ...mapActions("uploadChallenge", ["createChallengeAction"]),
    skip() {
      if ( localStorage.getItem("username")) {
        this.dialog = false;
        this.active = true;
        this.createChallengeAction({
          file: this.file,
          desc: this.descriptions,
          name: this.title,
          ImgBgCamp: this.backgroundColor ? this.backgroundColor : "#FFFFFFFF",
          ImgCamp: this.titleColor ? this.titleColor : "#303030FF",
        }).then(() => {
          this.active = false;
        });
      } else {
        this.$nuxt.$emit("openModalSendLogin", true);
        this.dialog = false;
      }
    },
  },

  created() {
    this.$nuxt.$on("CreatingModalChallenge", (option) => {
      this.file = option[2];
      this.dialog = option[0];
      this.url = option[1];
    });
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      this.valueSearch = res.data;
    });
  },
};
</script>

<style>
.button_divive {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.azure_BackColor {
  background: azure !important;
  height: 100%;
}

.box_cssCrad {
  box-shadow: 4px 3px 11px 0px #2e2e2e8c !important;
  margin: 20px;
}

.box_cardEdit {
  box-shadow: 4px 3px 11px 0px rgb(46 46 46 / 55%) !important;
}

.v-stepper {
  height: 100% !important;
}

.alert-edit-position {
  position: absolute !important;
  bottom: 66px !important;
  width: 100% !important;
  margin: 0px !important;
}

.img_logoCenter {
  display: flex;
  justify-content: center;
}

.button_divive_two {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.grillla__ {
  display: grid !important;
  height: 100%;
}

.g-ridCenter {
  padding-left: 60px;
  padding-right: 60px;
  justify-content: space-evenly;
}

.center-alert_png {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.button_closet-alert {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.question_edit {
  padding-bottom: 27px;
  text-align: center;
  font-weight: 300;
  font-size: larger;
  color: #33a9f2b3;
}

.editShadow {
  box-shadow: 1px 0px 12px 3px #00000063 !important;
  padding: 20px !important;
  background: azure;
}

.question_edit_2 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-Cuase {
  display: grid;
  justify-content: center;
}

.title_col-or {
  color: "black";
  font-weight: 900;
  text-transform: uppercase;
}

.v-alert__border:not(.v-alert__border--has-color) {
  display: none;
}

/* .v-stepper__wrapper {
   display: grid;
}
 */
.e-thow-button {
  display: flex;
  justify-content: space-around;
}

.edit_text-alert {
  font-size: 1.2rem;
  font-weight: 500;
}

.title_c-enter {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.css_cause {
  font-size: 22px;
  font-weight: 500;
}

.v-stepper__wrapper {
  height: 100%;
}

.v-stepper__items {
  height: 100%;
  overflow: auto;
}

.noShadow {
  box-shadow: none !important;
}

.e-alertccs {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: azure !important;
}

.c-global {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>