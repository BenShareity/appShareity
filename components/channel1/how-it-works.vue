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
        <v-carousel height="100vh" hide-delimiter-background>
          <template v-slot:prev="{ on, attrs }">
            <span v-bind="attrs" v-on="on" class="hiw-pagination">PREV</span>
          </template>
          <template v-slot:next="{ on, attrs }">
            <span v-bind="attrs" v-on="on" class="hiw-pagination">NEXT</span>
          </template>
          <v-carousel-item v-for="(item, i) in items" :key="i">
            <v-sheet color="#00a4e5" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div
                  class="text-h2 text-center"
                  style="width: -webkit-fill-available"
                >
                  <v-img class="hiw-sl-img" :src="item.src"> </v-img>
                  <span class="spanhiw" v-html="item.text"></span>
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
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
  layout(context) {
    return "App";
  },
  data: () => ({
    show: false,
    items: [
      {
        text: "Select a Challenge you want <br> to participate in <br> (Search by challenge or by trending)",
        src: require("~/assets/img/png/channel/hiw/hiw_1.png"),
      },
      {
        text: "Take a pic, video or selfie <br> doing the challenge and <br> raise money from a sponsor",
        src: require("~/assets/img/png/channel/hiw/hiw_2.png"),
      },
      {
        text: "Share with friends and family <br> so the campaign reaches its <br> money raising goal",
        src: require("~/assets/img/png/channel/hiw/hiw_3.png"),
      },
      {
        text: "Participate in your new community <br> (you can like other people and chat)",
        src: require("~/assets/img/png/channel/hiw/hiw_4.png"),
      },
      {
        text: "Get rewards for your impact. <br> Share to raise more and get rewarded",
        src: require("~/assets/img/png/channel/hiw/hiw_5.png"),
      },
    ],
  }),
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
      this.$nuxt.$on("hiw", (option) => {
      this.show = option
    });
  }
};
</script>
<style lang="scss" scoped>
.edit-modal {
  background: #00a4e5;
  height: 100%;
}
.text-h2 {
  z-index: 10;
}
.spanhiw {
  font-family: "gotham_htfmedium";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 24%;
  background-color: transparent;
  color: white;
  font-size: 20px;
  line-height: 1.2;
}
.hiw-pagination {
  font-family: "robotoregular";
  color: rgba(255, 255, 255, 0.74);
  font-size: 0.8em;
  z-index: 9;
}

.hiw-sl-img {
  position: relative;
  top: -10px;
  width: 69%;
  text-align: center;
  object-fit: cover;
  margin: auto;
}
.v-carousel__controls {
  bottom: 50px !important;
  z-index: 0;
}
.v-window__prev,
.v-window__next {
  top: calc(93% - 50px) !important;
  background-color: transparent !important;
}
.v-application--is-ltr .v-window__prev {
  left: 50px;
}
.v-application--is-ltr .v-window__next {
  right: 50px;
}
</style>
