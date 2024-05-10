<template>
  <v-container class="container edit-modal">
    <v-carousel height="100dvh" hide-delimiter-background>
      <template v-slot:prev="{ on, attrs }">
        <span v-bind="attrs" v-on="on" class="hiw-pagination">
          <v-btn class="mx-2 flex-direct-left font-arrow" width="39px" height="39px" fab dark color="#33a9f2b3"
          >
            <v-icon size="25px" dark> mdi-arrow-left </v-icon>
          </v-btn>
        </span>
      </template>
      <template v-slot:next="{ on, attrs }">
        <span v-bind="attrs" v-on="on" class="hiw-pagination">
          <v-btn class="mx-2 flex-direct-right font-arrow" width="39px" height="39px" fab dark color="#33a9f2b3"
            >
            <v-icon size="25px" dark> mdi-arrow-right </v-icon>
          </v-btn>
        </span>
      </template>
      <v-carousel-item v-for="(item, i) in items" :key="i" >
        <v-sheet color="#00a4e5" height="100%" style="
        background-color:#2384f2 !important;;
        ">
          <v-row class="fill-height" align="center" justify="center">
            <div class="text-h2 text-center" style="width: -webkit-fill-available" >
              <v-img class="hiw-sl-img" :src="item.src"> </v-img>
              <span class="spanhiw" v-html="item.text"></span>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-btn class="mx-2 button-close" width="45px" height="45px" fab dark color="#33a9f2b3"
      @click="$router.push('/channel')">
      <v-icon size="25px" dark> mdi-arrow-left </v-icon>
    </v-btn>
  </v-container>
</template> 

<script>
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
};
</script>
<style lang="scss" scoped>
.edit-modal {
  background: #2384f2 !important;;
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

.button-close {
  position: fixed;
  bottom: 2%;
  z-index: 200;
}
.flex-direct-left{
  position: absolute;
  z-index: 200;
  right: -36px;
}

.flex-direct-right{
  position: absolute;
    z-index: 200;
    right: -18px;
}
.font-arrow i {
  font-size: 20px !important;
}
.container {
  position: relative;
  z-index: 150;
  width: 100%;
  height: 100dvh;
  overflow: hidden;

}
</style>
