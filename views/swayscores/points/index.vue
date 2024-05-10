<template>
  <div :class="mostrar && 'container_out'" class="body">
    <SwayscoresHeader />

    <div class="padre-points_item1">
      <template v-if="loading">
        <div class="sway-header">
          <v-skeleton-loader max-height="80px" class="sways-card" max-width="80px" :elevation="5"
            type="card"></v-skeleton-loader>
        </div>
        <div class="sway-header__list">
          <v-skeleton-loader class="list-item" color="secondary" :elevation="5" type="paragraph"></v-skeleton-loader>
          <v-skeleton-loader class="list-item" color="secondary" :elevation="5" type="paragraph"></v-skeleton-loader>
        </div>
        <div class="sway-header">
          <v-skeleton-loader max-height="300px" class="sways-card" max-width="90%" :elevation="5"
            type="card"></v-skeleton-loader>
        </div>
      </template>
      <template v-else>
        <div class="padre-points_item1-center">
          <div class="padre-points_item1-box">
            <span class="padre-points_item1-box_title">{{ points }}</span>
          </div>
        </div>
        <div>
          <div class="padre-pooints_item2">
            <div class="padre-pooints_item2-center">
              <img class="padre-pooints_item2-center_img" :src="require('~/assets/img/points-star.png')" alt="" />
            </div>
            <div class="padre-pooints_item2_text1">Total Points</div>
            <div class="padre-pooints_item2_text2">{{ points }}</div>
          </div>
        </div>
        <div style="background-color: #f8f8f8; margin-top: 20px">
          <img style="height: 300px; object-fit: contain; width: 100%" :src="require('~/assets/img/Coin-FINAL.gif')"
            alt="" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  created() {
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehaviorY = 'none';
    this.loading = true;
    if (process.client) {
      this.location = window.location.pathname;
      localStorage.setItem("effect-Modal", true);
    }
    this.nicknameAction().then((session) => {
      this.swayScoreAction({
        id: session.id,
      }).then((r) => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);

        this.points = r.points;
      });
    });
  },

  layout(context) {
    return "App";
  },
  data: () => ({
    points: null,
    effectModal: null,
    mostrar: null,
    loading: false,
  }),
  computed: {
    ...mapGetters("header", ["getHeaderType"]),
  },
  watch: {
    getHeaderType(value) {
      if (value == 1) this.goBack();
    },
  },
  methods: {
    openButton(url) {
      if (url == "/swayscores/total") {
        this.$router.push({ path: url, query: { first: false } });
      } else {
        this.$router.push({ path: url });
      }
    },
    goBack() {
      document.documentElement.style.overflow = "initial";
      document.documentElement.style.overscrollBehaviorY = 'initial';
      this.mostrar = true;
      setTimeout(() => {
        this.$router.push("/");
        localStorage.setItem("effect-Modal", false);
      }, 180);
    },
    ...mapActions("user", ["swayScoreAction", "nicknameAction"]),
  },
};
</script>

<style lang="css" scoped>
.padre-points_item1 {
  height: 100%;
  background-color: #e9f1f8;
  padding: 20px;
}

.padre-points_item1-center {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
}

.padre-points_item1-box {
  width: 80px;
  box-shadow: 1px 2px 6px -2px #00000047;
  height: 80px;
  border: 2px solid #01386e;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.padre-points_item1-box_title {
  font-size: x-large;
  color: #01386e;
  font-weight: 500;
}

.padre-pooints_item2 {
  background-color: #fff;
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
  align-items: center;
  box-shadow: 1px 2px 6px -2px #00000047;
  border-radius: 10px;
}

.padre-pooints_item2-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.padre-pooints_item2-center_img {
  width: 70px;
  height: 70px;
  padding: 5px;
}

.padre-pooints_item2_text1 {
  font-size: x-large;
  color: #01386e;
  font-weight: 500;
}

.padre-pooints_item2_text2 {
  font-size: x-large;
  color: #c7c7c7;
  font-weight: 500;
}

.section-2 {
  padding: 20px 20px;
}

.section-3 {
  padding: 0px 20px;
}

.section-2-title {
  font-size: 25px;
  font-family: roboto;
  color: white;
  font-weight: 500;
}

.section-2-title__grafica {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
}

.section-2-title__grafica-linear {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 10px;
  margin-top: 20px;
}

.section-2-title__grafica-linear-title {
  white-space: nowrap;
  padding-top: 9px;
  font-size: 10px;
  color: rgb(47, 75, 117);
  font-weight: 500;
}

.section-2-title__grafica-linear-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.group-card {
  width: 70px;
  height: 70px;
  box-shadow: none !important;
  border-width: 2px;
  border-style: solid;
  border-color: #01386e;
}

.group-title {
  color: #01386e;
  font-size: 20px;
  padding-left: 10px;
}

.v-space {
  display: flex;
  justify-content: center !important;
  contain: inline-size;
  padding-top: 50px;
}

.v-title-impressions {
  color: white;
  padding-left: 20px;
  font-size: 20px;
}

/* .v-title-card {
    color: white;
    position: absolute;
    padding-top: 55px;
    padding-left: 5px;
} */

.v-col {
  justify-content: center;
  padding: 0px !important;
}


.header {
  position: relative;
  z-index: 150;
  background: rgb(71, 164, 231);
  background: linear-gradient(90deg,
      rgba(71, 164, 231, 1) 100%,
      rgba(47, 75, 117, 1) 100%);
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
}

.v-row {
  padding-top: 15px;
  padding-left: 20px;
}

.body {
  position: relative;
  z-index: 150;
  background: rgb(71, 164, 231);
  background: linear-gradient(90deg,
      rgba(71, 164, 231, 1) 100%,
      rgba(47, 75, 117, 1) 100%);
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  padding: 15% 0px 0px 0px !important;
}

.button-close {
  margin-left: 20px;
  display: block;
  position: fixed;
  bottom: 2%;
  z-index: 200;
}

.container_out {
  overflow: hidden;
  animation: out_cold 0.3s forwards;
}

@keyframes out_cold {
  from {
    height: 100dvh;
  }

  to {
    height: 0;
    opacity: 0;
  }
}

.sway-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sways-card {
  border-radius: 10px;
  width: 100%;
}

.sway-header__list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.list-item {
  height: 64px;
}
</style>
