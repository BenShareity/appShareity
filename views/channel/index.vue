<template>
  <v-container class="container">
    <div class="container-flex">
      <div v-for="(item, i) in items" :key="i">
        <div class="item-channel" @click="openOptions(item.url)">
          <img class="icon-steve" :src="item.steve" />
          <span class="text-channel">{{ item.title }}</span>
          <img class="icon-channel" :src="item.icon" />
        </div>
      </div>
    </div>

    <div class="logo-channel">
      <img :src="logo" />
    </div>
    <div class="button-close" @click="$router.push('/')">
      <img style="width: 35px; border-radius: 100%; object-fit: contain; box-shadow: 0px 4px 4px 0px #00000040;"
        src="@/assets/img/button-float/backwhite.png" alt="">
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  layout(context) {
    return "App";
  },
  data: () => ({
    logo: require("~/assets/img/png/footer/icoLogo.png"),
    items: [
      // {
      //   steve: require("~/assets/img/png/channel/nwsteve/3.png"),
      //   title: "NEW CHALLENGE IDEAS",
      //   icon: require("~/assets/img/png/channel/bgicons/3.png"),
      //   url: "/challengeideas"
      // },
      {
        steve: require("~/assets/img/png/channel/nwsteve/5.png"),
        title: "CHAT WITH STEVE",
        icon: require("~/assets/img/png/channel/bgicons/5.png"),
        url: "/chatwithsteve",
      },
      {
        steve: require("~/assets/img/png/channel/nwsteve/1.png"),
        title: "FREQUENTLY ASKED QUESTIONS",
        icon: require("~/assets/img/png/channel/bgicons/1.png"),
        url: "/faq",
      },
      {
        steve: require("~/assets/img/png/channel/nwsteve/4.png"),
        title: "HOW IT WORKS",
        icon: require("~/assets/img/png/channel/bgicons/4.png"),
        url: "/howitworks",
      },
      {
        steve: require("~/assets/img/png/channel/nwsteve/2.png"),
        title: "TERMS OF USE",
        icon: require("~/assets/img/png/channel/bgicons/2.png"),
        url: "/termsofuse",
      },
    ],
  }),
  computed: {
    ...mapState("phoneSize", ["windowWidthT", "windowLeftT"]),
  },
  methods: {
    actionMenu(go) { },
    ...mapActions("quizIdeas", ["fetchQuizList"]),

    openOptions(url) {
      this.$router.push({ path: "/channel" + url });
    },
  },
  created() {
    const data = {
      idUsr: "14180",
    };

    // this.fetchQuizList(data);
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 60px 20px;
  color: white;
  position: relative;
  z-index: 150;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  background: #2498E8;
}

.container-flex {
  display: flex;
  flex-direction: column;
}

.item-channel {
  display: flex;
  align-items: center;
  position: relative;
  background-color: #01386e;
  color: white;
  border-radius: 50px;
  padding: 7px;
  margin: 15px 0;
  width: 100%;
}

.icon-steve {
  display: block;
  width: 65px;
  height: 65px;
  margin-right: 10px;
  border-radius: 50px;
  border: 3px solid #33A9F2
}

.text-channel {
  font-size: 16px !important;
  font-weight: 600;
  text-transform: uppercase;
}

.icon-channel {
  position: absolute;
  right: 10px;
  width: 50px;
  height: 50px;
}

.logo-channel {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
}

.logo-channel img {
  opacity: .5;
  width: 30px;
  display: block;
  margin: 0 auto 30px;
}

.button-close {
  position: fixed;
  bottom: 2%;
  z-index: 200;
}
</style>
