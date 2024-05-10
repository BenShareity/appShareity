<template>
  <v-container>
    <v-row
      dense
      class="container__items"
      :style="{
        left: 4 + 'px', width: windowWidthT + 'px'
      }"
    >
      <v-col v-for="(item, i) in items" :key="i" cols="6">
        <v-row>
          <img :src="item.steve">
          <h1>{{ item.title }}</h1>
          <img :src="item.icon">
        </v-row>
      </v-col>
      <v-btn
        class="mx-2"
        fab
        dark
        color="#686868"
        style="position: fixed; top: 85vh"
        @click="$router.push('/')"
      >
        <v-icon dark> mdi-arrow-left </v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  layout(context) {
    return "App";
  },
  data: () => ({
    items: [
      {
        steve: require("~/assets/img/png/channel/nwsteve/1.png"),
        title: "FREQUENTLY ASKED QUESTIONS",
        icon: require("~/assets/img/png/channel/bgicons/1.png")
      },
    ],
  }),
  computed: {
    ...mapState("phoneSize", ["windowWidthT", "windowLeftT"]),
  },
  methods: {
    actionMenu(go) {},
    ...mapActions("quizIdeas", ["fetchQuizList"]),
  },
  created() {
    const data = {
      idUsr: "14180",
    };
    this.fetchQuizList(data);
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 50px 20px;
}
.row--dense > .col,
.row--dense > [class*="col-"] {
  text-align: -webkit-center;
}
.v-application .text-h5 {
  line-height: 1.6rem;
  font-size: 20px !important;
  letter-spacing: normal !important;
  font-family: "Gotham", sans-serif !important;
  word-break: normal;
  font-weight: 600;
  width: 92%;
  text-transform: uppercase;
}
.v-sheet.v-card {
  border-radius: 15px;
  width: 150px;
  height: 200px;
}
.channel1-icon {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 75%;
}
.content-flex {
  max-height: 53%;
  height: 53%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  text-align: center;
}
.container__items {
  position: absolute;
  background: white;
  height: auto;
  top: 5px;
  z-index: 5;
}
</style>