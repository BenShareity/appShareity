<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      hide-overlay
      transition="dialog-bottom-transition"
      :width="windowWidthT + 15"
      :content-class="`${
        toListenWidth > 1264 && toListenWidth < 1904 ? 'margin_desptop' : ''
      }`"
    >
      <div class="edit-modal">
        <v-container>
          <v-row
          justify="center"
          align="center"
          class="cstitle d-flex flex-column"
          >
            Chat With Steve
            <v-img
            class="mt-4"
            height="147"
            width="128"
            :src="require('~/assets/img/png/channel/chat-steve.png')"
            ></v-img>
          </v-row>

          <v-row
          class="coment-text"
          >
          We didn’t just create a platform to share charity, we created a platform
          for the people - where everyone who participates owns a piece of the
          project.
          </v-row>

          <v-col
            class="pt-5"
          >
            <v-text-field
              label="WHAT'S ON YOUR MIND?"
              solo
            ></v-text-field>
            <v-row 
            justify="center"
            class="post-abs"
            >
              <v-btn
                fab
                dark
                large
                color="#c8c7cc"
              >
                SEND
              </v-btn>
            </v-row>
          </v-col>

        </v-container>
        <v-btn
            class="mx-2"
            fab
            dark
            color="#686868"
            style="position: fixed; top: 78vh; z-index: 4;"
            @click="show = false"
        >
            <v-icon dark> mdi-arrow-left </v-icon>
        </v-btn>
      </div>
    </v-dialog>
  </v-row>
</template> 

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data(){
    return {
      show: false,
    }
  },
  layout (context) {
    return 'App'
  },
  methods: {
    toListenWidth(){
      return window.innerWidth
    },
  },
  computed: {
    ...mapState("phoneSize", ["windowWidthT"]),
    ...mapGetters("login", ["$cookies.get('username')"]),
  },
  created(){
      this.$nuxt.$on("cws", (option) => {
      this.show = option
    });
  }
}
</script>
<style lang="scss" scoped>
.edit-modal{
  background: #2384f2; 
  height: 100vh;
}
.container {
  padding: 60px 20px;
  font-family: 'robotobold_condensed'!important;
  color: white;
}
.cstitle{
font-size:14px; 
text-transform: uppercase;
}
.coment-text {
  font-size: 18px;
  margin-top: 8%;
  text-align: center;
  line-height: 1.4;
  padding: 10px 50px 0px;
}
.v-text-field.v-text-field--solo .v-input__control {
  min-height: 120px;
  max-width: 90%;
  padding: 0;
  margin:auto
}
.v-input__slot {
  align-items: flex-start;
}
.v-input {
  text-align: center;
}
.v-text-field__details {
  display: none;
}
.v-text-field.v-text-field--solo .v-label {
  top: calc(50% - 7px);
  left: 0!important;
  right: 0!important;
}
.v-text-field fieldset, .v-text-field .v-input__control, .v-text-field .v-input__slot {
  border-radius: 10px;
}
.v-text-field .v-label {
  max-width: 100%;
}
.v-btn--fab.v-size--large {
    height: 80px;
    width: 80px;
}
.v-btn--is-elevated.v-btn--fab {
    box-shadow: none!important;
}
.v-btn.v-size--large {
    font-size: 1rem;
}
.post-abs{
  margin-top: -46px;
}
</style>