<template>
  <div class="noActiveBag sway-header">
    <div
      v-for="(item, i) in items"
      :key="i"
      :class="
        'sway-header-btn ' +
        (item.url == location ? 'activeBag' : 'noActiveBag')
      "
    >
      <div @click="openButton(item.url)">
        <template v-if="item.url == location">
          <div class="btn">
            <img class="icon-size" :src="item.icon" />
          </div>
          <span class="sway-title-selected">{{ item.title }}</span>
        </template>
        <template v-else>
          <v-card class="btn btn-unselected">
            <img class="icon-size" :src="item.iconWhite" />
          </v-card>
          <span class="sway-title">{{ item.title }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: "Raised",
        icon: require("~/assets/img/png/raised-icon.png"),
        iconWhite: require("~/assets/img/png/raised-icon-white.png"),
        url: "/swayscores/raised",
      },
      {
        title: "Points",
        icon: require("~/assets/img/png/points-icon.png"),
        iconWhite: require("~/assets/img/png/points-icon-white.png"),
        url: "/swayscores/points",
      },
      {
        title: "Total",
        icon: require("~/assets/img/png/total-icon.png"),
        iconWhite: require("~/assets/img/png/total-icon-white.png"),
        url: "/swayscores/total",
      },
      {
        title: "Loves",
        icon: require("~/assets/img/png/loves-icon.png"),
        iconWhite: require("~/assets/img/png/loves-icon-white.png"),
        url: "/swayscores/loves",
      },
      {
        title: "Influenced",
        icon: require("~/assets/img/png/influenced-icon.png"),
        iconWhite: require("~/assets/img/png/influenced-icon-white.png"),
        url: "/swayscores/influenced",
      },
    ],
    money: null,
    object: null,
    location: "",
    mostrar: null,
  }),
  created() {
    if (process.client) this.location = window.location.pathname;
  },
  methods: {
    openButton(url) {
      if (url == "/swayscores/total") {
        this.$router.push({ path: url, query: { first: false } });
      } else {
        this.$router.push({ path: url });
      }
    },
  },
};
</script>

<style>
.sway-header {
  display: flex;
  justify-content: space-around !important;
  align-items: center;
}
.sway-header-btn {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.activeBag {
  padding: 5px;
  background-color: white;
  transition: ease-in 1s all;
  box-shadow: inset 2px 7px 13px -5px #000000b3;
  padding: 12px;
  margin: 0;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
}

.noActiveBag {
  margin: 0 1%;
  background: linear-gradient(
    90deg,
    rgba(71, 164, 231, 1) 100%,
    rgba(47, 75, 117, 1) 100%
  );
}
.btn-unselected {
  border-radius: 10px !important;
  background-color: #01386e !important;
}
.btn {
  position: relative;
  display: flex;
  padding: 7px;
  justify-content: center;
  align-items: center;
  margin-bottom: 6px;
  padding-bottom: 6px;
}
.icon-size {
  display: block;
  top: 7.5p;
  left: 7.5px;
  width: 40px;
}
.sway-title {
  font-size: 12px !important;
  color: #fff !important;
  font-weight: 500;
}
.sway-title-selected {
  font-size: 15px !important;
  color: #01386e !important;
  font-weight: 500;
}
</style>
